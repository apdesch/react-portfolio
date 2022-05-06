import React from "react";
import { FaAngellist, FaGithub, FaLinkedin } from "react-icons/fa";
import type { RouteProps } from "components/Head";
import Head from "components/Head";
import ButtonLink from "components/ButtonLink";
import styled from "styled-components";

const cutout: string = require("../../static/images/cutout.svg");

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1080px;
  margin: auto;
  h1,
  h2 {
    text-transform: uppercase;
  }
  h1 {
    margin-left: -3px;
    font-size: 4.5em;
    font-weight: 600;
    line-height: 1.2em;
  }
  h2 {
    margin-bottom: 1.2em;
    font-size: 1.5em;
    font-weight: 400;
  }
  .col {
    width: 50%;
    padding: 1.5em;
  }
  .cutout {
    width: 100%;
  }
  .button {
    margin-bottom: 1.5rem;
    margin-right: 2rem;
  }
  .social {
    font-size: 2.2rem;
    a {
      color: var(--color-primary-darker);
    }
    a + a {
      margin-left: 1.5rem;
    }
  }
`;

const Home = ({ title, description }: RouteProps) => {
  const socialLinks = [
    {
      url: "https://github.com/apdesch",
      title: "Github",
      icon: <FaGithub />,
    },
    {
      url: "https://linkedin.com/in/apdesch",
      title: "LinkedIn",
      icon: <FaLinkedin />,
    },
    {
      url: "https://angel.co/apdesch",
      title: "AngelList",
      icon: <FaAngellist />,
    },
  ];
  return (
    <Body>
      <Head title={title} description={description} />
      <div className="col">
        <img src={cutout} alt="cutout" className="cutout" />
      </div>
      <div className="col">
        <h1>
          Adam
          <br />
          Deschamp
        </h1>
        <h2>
          Front End Software Engineer
          <br />
          in San Francisco
        </h2>
        <div className="nav">
          <ButtonLink className="button" to="/portfolio">
            Portfolio
          </ButtonLink>
          <ButtonLink className="button" to="/resume">
            Resume
          </ButtonLink>
        </div>
        <div className="social">
          {socialLinks.map(({ url, title, icon }) => (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              title={title}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </Body>
  );
};

export default Home;
