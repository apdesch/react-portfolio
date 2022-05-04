import React from "react";
import type { RouteProps } from "components/Head";
import Head from "components/Head";

const Home = ({ title, description }: RouteProps) => (
  <>
    <Head title={title} description={description} />
    <div>
      <h1>Adam Deschamp</h1>
    </div>
  </>
);

export default Home;
