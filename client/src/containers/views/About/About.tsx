import React from "react";
import type { RouteProps } from "components/Head";
import Head from "components/Head";
import Page from "components/Page";
import styled from "styled-components";
import portraitURL from "static/images/portrait.jpg";

const Post = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5em;

  h2 {
    position: relative;
  }

  p {
    text-align: justify;
  }

  section:first-of-type {
    align-self: end;
    margin-bottom: 4em;
  }

  .skills {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (prefers-color-scheme: dark) {
    background-color: hsla(var(--c-hue), var(--c-sat), var(--c-lum), 0.5);
    backdrop-filter: blur(40px);
    border: none;
  }
`;

const About: React.FC<RouteProps> = ({ title, description }) => {
  return (
    <>
      <Head title={title} description={description} />
      <Page>
        <article>
          <h1>About</h1>
          <Post>
            <img src={portraitURL} alt="portrait" />
            <section>
              <p>
                I'm a software engineer from San Francisco currently pursuing a
                career in video production. I graduated from The Art Institute
                of California - San Francisco with a degree in Web Design and
                Interactive Media.
              </p>
              <p>
                For over a decade I've developed applications ranging from
                social media, photography and content creation to e-commerce,
                healthcare, and gaming.
              </p>
              <p>
                I'm focused on a new career in film, but I'm open offers in
                tech.
              </p>
            </section>
            <section className="skills">
              <h2>Engineering Skills</h2>
              <ul>
                <li>Javascript</li>
                <li>Typescript</li>
                <li>React</li>
                <li>Redux</li>
                <li>Sass/Less</li>
                <li>Webpack</li>
                <li>Cypress</li>
                <li>FFMPEG</li>
                <li>Python</li>
              </ul>
              <h2>Video Production</h2>
              <ul>
                <li>Editing</li>
                <li>Cinematography</li>
                <li>Color Grading</li>
                <li>Sound Design</li>
              </ul>
            </section>
          </Post>
        </article>
      </Page>
    </>
  );
};

export default About;
