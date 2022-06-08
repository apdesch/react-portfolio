import React, { FormEvent, useState, useEffect, useRef } from "react";
import type { RouteProps } from "components/Head";
import Head from "components/Head";
import axios from "axios";

interface Asset {
  filename: string;
  originalname: string;
  path: string;
  mimetype: string;
  ext: string;
  created: string;
  username: string;
  id: string;
}

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
    return async (event: FormEvent) => {
      event.preventDefault();
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
      <main>
        {fileList &&
          fileList.map(({ id, filename, originalname, ext, mimetype }) => {
            const thumbURL = `${filename}${ext === "pdf" ? ".png" : ""}`;
            return (
              <div
                key={`asset-${id}`}
                style={{ display: "block", marginTop: 10 }}
              >
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
                      mimetype.includes("image") || mimetype.includes("pdf")
                        ? `/uploads/thumb/${thumbURL}`
                        : "file.png"
                    }
                    className="thumb"
                  />{" "}
                  {originalname}
                </a>
                <button onClick={handleDelete(id)}>Delete File</button>
              </div>
            );
          })}
      </main>
    </>
  );
};

export default Assets;
