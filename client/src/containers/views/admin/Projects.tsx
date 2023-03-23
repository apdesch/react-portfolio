import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams, Link as Anchor } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { getDateFormat, projectFields } from "utils";
// types
import type { RouteProps } from "components/Head";
import type { Project } from "reducers/types";
// components
import Head from "components/Head";
import FormField, { FormRow } from "components/FormField";
import EditorNav from "components/EditorNav";
// contexts
import { AppContext } from "contexts/App.context";

const Projects = ({ title, description }: RouteProps) => {
  const { state, dispatch } = useContext(AppContext);
  const { id } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [project, setProject] = useState({} as Project | any);
  const [heading, setHeading] = useState("");
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get<Project[]>("/api/projects/");
        dispatch({ type: "PROJECT_SUCCESS", payload: data });
        if (id && data) {
          const proj = data.find((project) => project.id === id);
          setProject(proj as Project);
          setHeading(`Project: ${proj?.title}`);
        } else {
          editor?.commands.clearContent();
          if (formRef.current) formRef.current.reset();
          setProject({});
          setHeading("New Project");
        }
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    if (project) {
      editor?.commands.setContent(project.body ? project?.body : "<p></p>");
    }
  }, [project]);

  const editor = useEditor({
    extensions: [StarterKit, Image, Link, Underline, TextAlign],
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("body", editor?.getHTML() as string);
    try {
      const opts = Object.fromEntries(formData.entries()) as any;
      Object.assign(opts, {
        skills: opts?.skills.split(", ") || [],
        tags: opts?.tags.split(", ") || [],
      });
      const method = id ? "put" : "post";
      const { data } = await axios[method](
        `/api/projects/${id ? id : ""}`,
        opts,
      );
      if (data.message) setSubmitted(true);
    } catch (error) {
      setErrorMessage(axios.isAxiosError(error) ? error.response?.data : error);
    }
  };

  return (
    <>
      <Head title={title} description={description} />
      <div style={{ display: "flex" }}>
        <main>
          <h2 style={{ marginBottom: 10 }}>{heading}</h2>
          <form onSubmit={handleSubmit} ref={formRef}>
            {projectFields.map((field) => {
              const date =
                project?.date && field.name === "date"
                  ? getDateFormat(project.date)
                  : "";

              const defaultValue =
                date ||
                (field.name === "tags" &&
                  project?.tags?.length &&
                  project?.tags.join(", ")) ||
                (field.name === "skills" &&
                  project?.skills?.length &&
                  project?.skills.join(", ")) ||
                (project ? project![field.name as keyof typeof project] : "");

              if (field.type === "editor") {
                return (
                  <FormRow key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <div>
                      <EditorNav editor={editor} />
                      <EditorContent editor={editor} />
                    </div>
                  </FormRow>
                );
              }

              return (
                <FormField
                  key={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  label={field.label}
                  options={field.options}
                  defaultValue={defaultValue}
                />
              );
            })}
            <button type="submit">Add Project</button>
          </form>

          {!errorMessage && submitted && "Project Created"}
          {errorMessage && <p>{errorMessage}</p>}
        </main>
        <aside style={{ padding: "0 16px" }}>
          <div style={{ marginBottom: 10 }}>
            <Anchor to="/admin/projects">New Project +</Anchor>
          </div>
          {state.project.projects?.map((project) => {
            return (
              <div key={`link-${project.id}`} style={{ marginBottom: 10 }}>
                <Anchor to={`/admin/projects/${project.id}`}>
                  {project.title}
                </Anchor>
              </div>
            );
          })}
        </aside>
      </div>
    </>
  );
};

export default Projects;
