import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export type RouteProps = {
  title: string;
  description?: string;
};

const Head: React.FC<RouteProps> = ({ title, description }): JSX.Element => (
  <HelmetProvider>
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  </HelmetProvider>
);

export default Head;
