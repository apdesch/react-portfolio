import React, { useEffect, useState, useContext } from "react";
import { Gallery } from "react-grid-gallery";
import type { RouteProps } from "components/Head";
import type { Project, Asset } from "reducers/types";
import { GroupedItems, assetUrl, groupArrayItemsByKey } from "utils";
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
    border: none;
  }
`;

const Portfolio: React.FC<RouteProps> = ({ title, description }) => {
  const { state, dispatch } = useContext(AppContext);
  const [error, setError] = useState("");
  const [imageGroup, setImageGroups] = useState<GroupedItems>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const image = await axios.get<Asset[]>("/api/assets/image");
        const project = await axios.get<Project[]>("/api/projects");
        if (project.data) {
          dispatch({ type: "PROJECT_SUCCESS", payload: project.data });
        }
        if (image.data) {
          const groupedImages = groupArrayItemsByKey(image.data, "category");
          console.log(groupedImages);
          setImageGroups(groupedImages);
          dispatch({ type: "IMAGES_SUCCESS", payload: image.data });
        }
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
        {error && <div>{error}</div>}
        <article>
          <h1>Videos</h1>
          <section>
            <Video>
              <iframe
                src="https://www.youtube-nocookie.com/embed/4-ZZnb3-eOA"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </Video>
            <Description>
              B-roll footage for coffee roaster spec ad.
            </Description>
          </section>
          <section>
            <Video>
              <iframe
                src="https://www.youtube-nocookie.com/embed/_ksmHf2Zd7Y"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </Video>
            <Description>
              The Palace of Fine Arts in San Francisco shot on an iPhone.
            </Description>
          </section>
        </article>

        {!error && !!state?.asset?.images?.length && (
          <>
            {imageGroup &&
              !!Object.keys(imageGroup).length &&
              Object.keys(imageGroup).map((key) => (
                <article>
                  <h1>{key}</h1>
                  <Gallery
                    images={imageGroup[key].map((image) => {
                      return {
                        src: assetUrl(image.filename, "small"),
                        alt: image.alt,
                        width: image.size.small[0] || 0,
                        height: image.size.small[1] || 0,
                      };
                    })}
                  />
                </article>
              ))}
          </>
        )}
        {/* {!error && !!state.project.projects && (
          <ProjectsList projects={state.project.projects} />
        )} */}
      </Page>
    </>
  );
};

export default Portfolio;
