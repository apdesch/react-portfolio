import React from "react";
import { FaAngellist, FaGithub, FaLinkedin } from "react-icons/fa";
import type { RouteProps } from "components/Head";
import Head from "components/Head";
import Body from "./Body";
import Title from "./Title";
import Nav from "./Nav";
import SocialLinks from "./SocialLinks";

const cutout: string = require("static/images/cutout.svg");

const Home: React.FC<RouteProps> = ({ title, description }) => {
  const navLinks = [
    { url: "/portfolio", label: "Portfolio" },
    { url: "/resume", label: "Resume" },
  ];
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
        <Title />
        <Nav links={navLinks} />
        <SocialLinks links={socialLinks} />
      </div>
    </Body>
  );
};

export default Home;
