import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 6em;
  font-weight: 600;
  text-shadow: 1.5px 0 2px rgba(255, 0, 0, 0.8),
    2px 0 2px rgba(255, 255, 0, 0.8), -2px 0 2px rgba(39, 125, 255, 0.6),
    -1.5px 0 2px rgba(0, 255, 255, 0.8);
  line-height: 1.3;
  margin: 0;
  padding: 0.4em 0;
  animation-duration: 500ms;
  > a {
    transform-origin: 100%;
    display: block;
    color: var(--color-text);
    animation: tilt 250ms ease-in 500ms forwards;
  }
`;

const Title: React.FC<{ title: string }> = ({ title }) => {
  return (
    <H1 className="peakUp">
      <Link to="/">{title}</Link>
    </H1>
  );
};

export default Title;
