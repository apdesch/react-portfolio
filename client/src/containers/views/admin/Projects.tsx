import React from "react";
import { useContext } from "react";
import type { RouteProps } from "components/Head";
import Head from "components/Head";
import { AppContext } from "contexts/App.context";

const Projects = ({ title, description }: RouteProps) => {
  const { state } = useContext(AppContext);

  return (
    <>
      <Head title={title} description={description} />
      <h4>Projects by {state.auth.user.username}</h4>
    </>
  );
};

export default Projects;
