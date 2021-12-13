import React from "react";
import { Link } from "react-router-dom";

interface NavProps {
  path: string;
  label: string;
}

interface HeaderProps {
  title: string;
  to: string;
  nav?: NavProps[];
}

const GlobalHeader: React.FC<HeaderProps> = ({
  title,
  to,
  nav,
}): JSX.Element => (
  <header>
    <Link to={to}>{title}</Link>
    {nav &&
      nav.map(({ path, label }: NavProps) => (
        <Link style={{ float: "right" }} to={path}>
          {label}
        </Link>
      ))}
  </header>
);

export default GlobalHeader;
