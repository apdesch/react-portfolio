import React from "react";
import { FaAngellist, FaGithub, FaLinkedin } from "react-icons/fa";
import type { RouteProps } from "components/Head";
import Head from "components/Head";
import Body from "./Body";
import GlobalHeader from "components/GlobalHeader";
import Title from "./Title";
import Nav from "./Nav";
import SocialLinks from "./SocialLinks";
import cutout from "static/images/cutout.svg";

const Home: React.FC<RouteProps> = ({ title, description }) => {
  const navLinks = [
    { path: "/portfolio", label: "Portfolio" },
    { path: "/resume", label: "Resume" },
    { path: "/about", label: "About" },
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
      <GlobalHeader title="Adam Deschamp" to="/" admin={false} nav={navLinks} />
      {/* <div className="col">
        <Title />
        <Nav links={navLinks} />
        <SocialLinks links={socialLinks} />
      </div> */}
    </Body>
  );
};

export default Home;
