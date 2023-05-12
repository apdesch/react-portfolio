import React, { FormEvent, useState, useEffect, useRef } from "react";
import { FaCopy, FaTrash } from "react-icons/fa";
import type { RouteProps } from "components/Head";
import type { Asset } from "reducers/types";
import Head from "components/Head";
import axios from "axios";

enum UploadStatus {
  NONE = "no file",
  START = "started",
  UPLOADING = "uploading",
  FAIL = "failed",
  DONE = "complete",
}

const Assets = ({ title, description }: RouteProps) => {
  const [files, setFiles] = useState<FileList | null>();
  const [fileList, setFileList] = useState<Asset[]>();
  const [uploadStatus, setUploadStatus] = useState(UploadStatus.NONE);
  const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleFileChange = (event: FormEvent) => {
    event.preventDefault();
    setFiles((event.target as HTMLInputElement).files);
  };

  const handleUpload = (event: FormEvent) => {
    event.preventDefault();
    setUploadStatus(UploadStatus.START);
    if (files) {
      setUploadStatus(UploadStatus.UPLOADING);
      const filesArray = Array.from(files);
      const uploads = filesArray.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        try {
          const { data } = await axios.post("/api/assets", formData);
          return data;
        } catch (error) {
          console.error(error);
        }
      });
      axios
        .all(uploads)
        .then(() => {
          setUploadStatus(UploadStatus.DONE);
          Object.assign(fileRef?.current, { value: "" });
        })
        .catch((error) => {
          console.error(error);
          setUploadStatus(UploadStatus.FAIL);
        });
    }
  };

  const handleDelete = (id: string) => {
    return async (event: FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const confirmDeletion = confirm(
        "Are you sure you want to delete this file?\n\nThis action cannot be undone.",
      );
      if (!confirmDeletion) return;
      try {
        const { data } = await axios.delete<{ message: string }>(
          `/api/assets/${id}`,
        );
        if (data.message) {
          setFileList(fileList?.filter((file) => file.id !== id));
        }
      } catch (error) {
        console.error(error);
      }
    };
  };

  const handleCategoryChange = (id: string) => {
    return async (event: FormEvent<HTMLSelectElement>) => {
      const value = event.currentTarget.value;
      try {
        const { data } = await axios.put<{ message: string }>(
          `/api/assets/${id}`,
          { category: value },
        );
        if (data.message) {
          console.log(id, "updated category to", value);
        }
      } catch (error) {
        console.error(error);
      }
    };
  };

  const handleCopyToClipboard = (text: string) => {
    return async (event: FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.currentTarget.textContent = "Copied!";
      event.currentTarget.classList.add("copied");
      await navigator.clipboard.writeText(text);
    };
  };

  useEffect(() => {
    if (
      uploadStatus === UploadStatus.NONE ||
      uploadStatus === UploadStatus.DONE
    ) {
      const fetchData = async () => {
        const { data } = await axios.get<Asset[]>("/api/assets");
        setFileList(data);
      };
      fetchData();
    }
  }, [uploadStatus]);

  return (
    <>
      <Head title={title} description={description} />
      <h1>Assets</h1>
      <form
        onSubmit={handleUpload}
        action="/api/assets"
        method="POST"
        encType="multipart/form-data"
      >
        <input ref={fileRef} type="file" multiple onChange={handleFileChange} />
        <button type="submit">Upload File(s)</button>
        {uploadStatus === UploadStatus.UPLOADING && <div className="loader" />}
      </form>
      <main style={{ columnGap: "1em", columnCount: 6 }}>
        {fileList &&
          fileList.map(
            ({ id, filename, originalname, ext, mimetype, category }) => {
              // regex for files which have thumbnails
              const thumbnailMimetypeRegex = new RegExp("^(image|video|pdf)");
              let thumbName = filename;
              if (ext === "pdf") thumbName += ".png";
              else if (mimetype.includes("video/")) {
                thumbName = thumbName.replace(`.${ext}`, ".jpg");
              }
              return (
                <figure key={`asset-${id}`}>
                  <a
                    href={
                      mimetype.includes("image/")
                        ? `/uploads/small/${filename}`
                        : `/uploads/${filename}`
                    }
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <img
                      src={
                        thumbnailMimetypeRegex.test(mimetype)
                          ? `/uploads/thumb/${thumbName}`
                          : "file.png"
                      }
                      className="thumb"
                    />{" "}
                  </a>
                  {originalname} Cat: {category}
                  <div style={{ display: "flex" }}>
                    <div>
                      <button
                        className="icon-button"
                        onClick={handleCopyToClipboard(filename)}
                      >
                        <FaCopy />
                      </button>
                      <button
                        className="icon-button"
                        onClick={handleDelete(id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <div>
                      <select
                        name={`category-asset-${id}`}
                        value={category}
                        onChange={handleCategoryChange(id)}
                      >
                        {[
                          { value: "" },
                          { value: "illustration" },
                          { value: "photography" },
                          { value: "design" },
                        ].map((cat) => (
                          <option
                            key={`category-asset-${id}-${cat.value || "none"}`}
                            value={cat.value}
                          >
                            {cat.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </figure>
              );
            },
          )}
      </main>
    </>
  );
};

export default Assets;
