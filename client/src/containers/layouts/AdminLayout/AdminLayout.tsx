import React from "react";
import { Outlet, Link } from "react-router-dom";
import GlobalHeader from "components/GlobalHeader";
import styled from "styled-components";

const Layout = styled.div`
  background-color: #6f6f6f;
  height: 100%;
  color: #ffffff;
  overflow: auto;
  input {
    background-color: #5f5f5f;
    border: none;
    border-radius: 4px;
    width: 100%;
    max-width: 500px;
    height: 36px;
    color: #ffffff;
    margin-bottom: 20px;
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
