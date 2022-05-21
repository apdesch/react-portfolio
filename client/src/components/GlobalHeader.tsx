import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface NavProps {
  path: string;
  label: string;
}

interface HeaderProps {
  title: string;
  to: string;
  nav?: NavProps[];
  admin: boolean;
}

const Header = styled.header<{ admin: boolean }>`
  padding: 1.2em;
  background-color: ${(props) =>
    props.admin ? "#5F5F5F" : "var(--color-primary-dark)"};
  backdrop-filter: blur(10px);
  .title {
    display: block;
    max-width: 120px;
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 1.2em;
    color: var(--color-primary-light);
  }
`;

const GlobalHeader: React.FC<HeaderProps> = ({
  title,
  to,
  nav,
  admin,
}): JSX.Element => (
  <Header admin={admin}>
    <Link className="title" to={to}>
      {title}
    </Link>
    {nav &&
      nav.map(({ path, label }: NavProps) => (
        <Link style={{ float: "right" }} to={path} key={`nav-${path}`}>
          {label}
        </Link>
      ))}
  </Header>
);

export default GlobalHeader;
