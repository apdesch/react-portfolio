import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const GlobalHeader: React.FC<HeaderProps> = ({ title }): JSX.Element => (
  <header>
    <Link to="/">{title}</Link>
  </header>
);

export default GlobalHeader;
