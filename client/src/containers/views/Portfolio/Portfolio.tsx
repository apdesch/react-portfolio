import React, { useEffect, useContext } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<Project[]>("/api/projects");
      dispatch({ type: "PROJECT_SUCCESS", payload: data });
    };
    fetchData();
  }, []);

  console.log(state.project.projects);

  return (
    <div>
      <Head title={title} description={description} />
      <GlobalHeader title="Adam Deschamp" to="/" admin={false} />
      <aside>
        <h2>Work</h2>
        <p>
          Software engineering work over the past decade. Currently available
          for hire.
        </p>
      </aside>
      <main>
        {state.project.projects && (
          <ProjectsList projects={state.project.projects} />
        )}
        <ButtonLink to="/resume">View Full Resume</ButtonLink>
      </main>
    </div>
  );
};

export default Portfolio;
