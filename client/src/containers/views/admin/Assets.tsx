import React, { FormEvent, useState } from "react";
import type { RouteProps } from "components/Head";
import Head from "components/Head";
import axios from "axios";

const Assets = ({ title, description }: RouteProps) => {
  const [files, setFiles] = useState<FileList | null>();
  const handleFileChange = (event: FormEvent) => {
    event.preventDefault();
    setFiles((event.target as HTMLInputElement).files);
  };
  const handleUpload = (event: FormEvent) => {
    event.preventDefault();
    if (files) {
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
      axios.all(uploads).then(() => {
        console.log("uploads complete");
      });
    }
  };
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
        <input
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={handleFileChange}
        />
        <button type="submit">Upload File(s)</button>
      </form>
    </>
  );
};

export default Assets;
