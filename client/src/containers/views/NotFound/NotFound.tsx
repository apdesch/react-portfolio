import Title from "components/Title";
import React from "react";
import styled from "styled-components";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  height: 100vh;
  color: var(--color-text);
  @media screen and (prefers-color-scheme: dark) {
    background-color: hsla(0, 0%, 5%, 0.6);
  }
`;

const NotFound = () => {
  return (
    <Body>
      <Title title="apdesch" />
      <p>The page your are looking for does not exist.</p>
    </Body>
  );
};

export default NotFound;
