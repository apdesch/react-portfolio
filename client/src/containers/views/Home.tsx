import React from "react";
import type { RouteProps } from "components/Head";
import Head from "components/Head";

const Home = ({ title, description }: RouteProps) => (
  <>
    <Head title={title} description={description} />
    <h1>Welcome</h1>
  </>
);

export default Home;
