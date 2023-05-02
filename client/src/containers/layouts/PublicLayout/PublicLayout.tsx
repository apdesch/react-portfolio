import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaAngellist, FaGithub, FaInstagram } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Title from "components/Title";
import GlobalNav from "components/GlobalNav";
import SocialLinks from "components/SocialLinks";

const App = styled.div<{ home: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: var(--color-text);
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: calc(0.35vw + 0.5em);
  width: 100%;
  animation: fadeIn 1s ease-out forwards;

  &::-webkit-scrollbar {
    background: var(--color-primary-dark);
  }

  &::-webkit-scrollbar-thumb {
    border: 4px solid var(--color-primary-dark);
    border-radius: 10px;
    background-color: hsla(53, 23%, 79%, 0.4);
  }

  p {
    max-width: 24em;
  }

  @media screen and (max-width: 54em) {
    flex-direction: column;
    p {
      max-width: none;
      margin-left: 1em;
      margin-right: 1em;
    }
  }

  @media screen and (prefers-color-scheme: dark) {
    background-color: hsla(0, 0%, 5%, 0.6);
    /* backdrop-filter: blur(40px); */
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Blurb = styled.div`
  position: relative;
  max-width: 24em;
  font-size: 1.1em;
  align-self: center;
  text-align: justify;
  animation-duration: 1.2s;
  animation-delay: 200ms;
  p {
    margin-top: 1em;
    margin-bottom: 1em;
  }
`;

const PublicLayout: React.FC = (): JSX.Element => {
  const location = useLocation();
  const [home, setHome] = useState(true);

  useEffect(() => {
    if (location.pathname !== "/") {
      setHome(false);
    } else {
      setHome(true);
    }
  }, [location]);

  const socialLinks = [
    {
      url: "https://github.com/apdesch",
      title: "Github",
      icon: <FaGithub />,
    },
    {
      url: "https://angel.co/apdesch",
      title: "AngelList",
      icon: <FaAngellist />,
    },
    {
      url: "https://www.instagram.com/myroommatetotoro_/",
      title: "Instagram",
      icon: <FaInstagram />,
    },
  ];

  return (
    <App home={home}>
      <Header>
        <Title title="apdesch" />
        <GlobalNav>
          {[
            // { path: "/", label: "Home" },
            // { path: "/blog", label: "Blog" },
            { path: "/resume", label: "Resume" },
            { path: "/about", label: "About" },
          ].map((props, index) => {
            return (
              <Link
                className="peakDown"
                to={props.path}
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
              >
                {props.label}
              </Link>
            );
          })}
        </GlobalNav>
        {home && (
          <Blurb className="wipeLeft">
            <p>
              Welcome to my portfolio showcasing personal projects as well as
              some software engineering work from previous companies.
            </p>
            <p>
              I'm currently on hiatus from engineering to pursue a career in
              video production, but I'm open to engineering opportunities if you
              wish to reach out.
            </p>
          </Blurb>
        )}
        <SocialLinks links={socialLinks} />
      </Header>
      <Outlet />
    </App>
  );
};

export default PublicLayout;
