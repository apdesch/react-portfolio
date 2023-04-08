import React, { useEffect, useState, useContext } from "react";
import type { RouteProps } from "components/Head";
import type { Project } from "reducers/types";
import Head from "components/Head";
import GlobalHeader from "components/GlobalHeader";
import ButtonLink from "components/ButtonLink";
import { AppContext } from "contexts/App.context";
import ProjectsList from "./ProjectsList";
import axios from "axios";

const Portfolio: React.FC<RouteProps> = ({ title, description }) => {
  const { state, dispatch } = useContext(AppContext);
  const [error, setError] = useState("");
  const navLinks = [
    { path: "/portfolio", label: "Portfolio" },
    { path: "/resume", label: "Resume" },
    { path: "/about", label: "About" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<Project[]>("/api/projects");
        dispatch({ type: "PROJECT_SUCCESS", payload: data });
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      }
    };
    fetchData();
  }, []);

  console.log(state.project.projects);

  return (
    <>
      <Head title={title} description={description} />
      <GlobalHeader title="Adam Deschamp" to="/" admin={false} nav={navLinks} />
      <aside>
        <h2>Work</h2>
        <p>
          Software engineering work over the past decade. Currently available
          for hire.
        </p>
      </aside>
      <main>
        {!error && state.project.projects && (
          <ProjectsList projects={state.project.projects} />
        )}
        {error && <div>{error}</div>}
        <ButtonLink to="/resume">View Full Resume</ButtonLink>
      </main>
    </>
  );
};

export default Portfolio;
