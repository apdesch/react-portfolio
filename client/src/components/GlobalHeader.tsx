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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2em;
  background-color: ${(props) => (props.admin ? "#5F5F5F" : "transparent")};
  .title {
    display: block;
    max-width: 120px;
    font-size: 1.8em;
    font-weight: 600;
    line-height: 1.2em;
    color: var(--color-primary-light);
  }
  .nav-links {
    a {
      color: inherit;
      font-size: 1.3em;
      padding: 0.5rem 1.5rem;
    }
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
    {nav && (
      <nav className="nav-links">
        {nav.map(({ path, label }: NavProps) => (
          <Link to={path} key={`nav-${path}`}>
            {label}
          </Link>
        ))}
      </nav>
    )}
  </Header>
);

export default GlobalHeader;
