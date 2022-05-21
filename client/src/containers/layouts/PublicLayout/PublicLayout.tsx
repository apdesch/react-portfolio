import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const App = styled.div`
  display: flex;
  height: 100%;
  background-color: var(--color-primary-dark);
  color: var(--color-primary-light);
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: calc(0.35vw + 0.5em);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    background: var(--color-primary-dark);
  }

  &::-webkit-scrollbar-thumb {
    border: 4px solid var(--color-primary-dark);
    border-radius: 10px;
    background-color: hsla(53, 23%, 79%, 0.4);
  }
`;

const PublicLayout: React.FC = (): JSX.Element => (
  <App>
    <Outlet />
  </App>
);

export default PublicLayout;
