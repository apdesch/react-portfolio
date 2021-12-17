import React from "react";
import { Helmet } from "react-helmet";

export type RouteProps = {
  title: string;
  description?: string;
};

const Head: React.FC<RouteProps> = ({ title, description }): JSX.Element => (
  <Helmet>
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
  </Helmet>
);

export default Head;
