import React, { FormEvent, useState, useContext } from "react";
import axios, { AxiosError } from "axios";
import type { RouteProps } from "components/Head";
import Head from "components/Head";
import FormField from "components/FormField";
import { AppContext } from "contexts/App.context";
import { projectFields } from "utils";

const Projects = ({ title, description }: RouteProps) => {
  const { state } = useContext(AppContext);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/projects", {});
      if (data.message) setSubmitted(true);
    } catch (error) {
      setErrorMessage((error as AxiosError).response?.data?.error);
    }
  };

  return (
    <>
      <Head title={title} description={description} />
      <h4>Projects by {state.auth.user ? state.auth.user.username : "User"}</h4>

      <form onSubmit={handleSubmit}>
        {projectFields.map((field) => {
          return (
            <FormField
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              label={field.label}
              options={field.options}
            />
          );
        })}
        <button type="submit">Add Project</button>
      </form>

      {!errorMessage && submitted && "Project Created"}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default Projects;
