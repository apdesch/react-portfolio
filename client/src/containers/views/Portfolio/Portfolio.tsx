import React, { useEffect, useState, useContext } from "react";
import type { RouteProps } from "components/Head";
import type { Project } from "reducers/types";
import Head from "components/Head";
import Page from "components/Page";
import { AppContext } from "contexts/App.context";
import ProjectsList from "./ProjectsList";
import axios from "axios";
import styled from "styled-components";

const Description = styled.p`
  align-self: end;
  text-align: justify;
  margin-right: 1em;
  font-size: 1.1em;
`;

const Video = styled.div`
  width: 100%;
  padding-top: 56.25%;
  height: 0px;
  position: relative;
  > iframe,
  > video,
  > div {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--color-primary-dark);
  }
`;

const Grid = styled.div`
  column-gap: 1em;
  column-count: 2;
`;

const Post = styled.div`
  padding: 1.5em;

  h2 {
    position: relative;
  }

  @media screen and (prefers-color-scheme: dark) {
    background-color: hsla(var(--c-hue), var(--c-sat), var(--c-lum), 0.5);
    backdrop-filter: blur(40px);
    border: none;
  }
`;

const Portfolio: React.FC<RouteProps> = ({ title, description }) => {
  const { state, dispatch } = useContext(AppContext);
  const [error, setError] = useState("");

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

  return (
    <>
      <Head title={title} description={description} />
      <Page>
        <article>
          <Video>
            <video />
          </Video>
          <Description>
            The Palace of Fine Arts in San Francisco shot on an iPhone.
          </Description>
        </article>

        <article>
          <Video>
            <video />
          </Video>
          <Description>Footage of a local coffee roster.</Description>
        </article>

        <article>
          <Video>
            <video />
          </Video>
          <Description>A young girl creates a friend inside a box.</Description>
        </article>

        <article>
          <h1>Illustrations</h1>
          <Grid>
            <figure>{/* <img src={imgUrl} alt="image" /> */}</figure>
          </Grid>
        </article>

        <article>
          <h1>Photographs</h1>
          <Grid>
            <figure>{/* <img src={imgUrl} alt="image" /> */}</figure>
          </Grid>
        </article>

        {!error && state.project.projects && (
          <ProjectsList projects={state.project.projects} />
        )}
        {error && <div>{error}</div>}
      </Page>
    </>
  );
};

export default Portfolio;
