import React from "react";
import { Outlet, Link } from "react-router-dom";
import GlobalHeader from "components/GlobalHeader";
import styled from "styled-components";

const Layout = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: var(--color-primary-light);
  input,
  select {
    border: none;
    border-radius: 4px;
    width: 100%;
    max-width: 500px;
    height: 36px;
  }
`;

const Body = styled.div`
  padding: 1rem;
`;

const AdminLayout: React.FC = (): JSX.Element => (
  <Layout>
    <GlobalHeader to="/admin" title="Admin" admin />
    <Body>
      <Link to="/">Home</Link>
      <Outlet />
    </Body>
  </Layout>
);

export default AdminLayout;
