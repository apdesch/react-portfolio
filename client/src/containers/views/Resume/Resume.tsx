import React from "react";
import type { RouteProps } from "components/Head";
import Head from "components/Head";
import Page from "components/Page";
import styled from "styled-components";

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
  return (
    <>
      <Head title={title} description={description} />
      <Page>
        <article>
          <h1>Engineering Resume</h1>
          <Post>
            <section>
              <h2>Kapwing</h2>
              <ul>
                <li>
                  Build core features for a web-based non-linear video editing
                  application, including an image editor, undo stack, and
                  automatic translations.
                </li>
                <li>
                  Create end-to-end tests for common and complex user flows and
                  interactions.
                </li>
                <li>
                  Help improve user experience and application stability and
                  reliability.
                </li>
              </ul>
            </section>
            <section>
              <h2>
                Total Brain <span className="exit">Acquired</span>
              </h2>
              <ul>
                <li>
                  Develop the flagship SaaS application for large scale
                  companies.
                </li>
                <li>
                  Create application features such as games, and video and audio
                  players.
                </li>
                <li>
                  Create component libraries, build systems, and unit tests.
                </li>
              </ul>
            </section>
            <section>
              <h2>Barn &amp; Willow</h2>
              <ul>
                <li>
                  Redesign e-commerce site, blog, customization tool, and sizing
                  calculator.
                </li>
                <li>
                  Optimize site-wide performance and increase conversions.
                </li>
                <li>8x increase in monthly revenue.</li>
              </ul>
            </section>
            <section>
              <h2>Elation Health</h2>
              <ul>
                <li>
                  Convert front end UI code to use a component based
                  architecture.
                </li>
                <li>
                  Develop and release multiple features for the flagship EHR
                  application.
                </li>
                <li>
                  Create complete wireframes and flows for future product
                  features.
                </li>
              </ul>
            </section>
            <section>
              <h2>
                Mya Systems <span className="exit">Acquired</span>
              </h2>
              <ul>
                <li>
                  Develop and launch a robust job search and ATS application.
                </li>
                <li>
                  Develop feature rich products using modern web technologies
                  and frameworks.
                </li>
                <li>
                  Create user flows and interactive wireframes for user
                  experience testing.
                </li>
              </ul>
            </section>
            <section>
              <h2>Hot Shot Media Inc</h2>
              <ul>
                <li>
                  Construct and develop functional designs for all products
                  including mobile web.
                </li>
                <li>
                  Design logo for flagship product and assist in user experience
                  and design.
                </li>
              </ul>
            </section>
          </Post>
        </article>
        {/* {error && <div>{error}</div>} */}
      </Page>
    </>
  );
};

export default Portfolio;
