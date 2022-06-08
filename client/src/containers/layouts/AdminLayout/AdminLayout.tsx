import React from "react";
import { Outlet, Link } from "react-router-dom";
import GlobalHeader from "components/GlobalHeader";
import styled from "styled-components";

const Layout = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: #121212;
  input,
  select {
    border: none;
    border-radius: 4px;
    width: 100%;
    max-width: 500px;
    height: 36px;
  }
`;

const AdminLayout: React.FC = (): JSX.Element => (
  <Layout>
    <GlobalHeader to="/admin" title="Admin" admin />
    <Link to="/">Home</Link>
    <Outlet />
  </Layout>
);

export default AdminLayout;
