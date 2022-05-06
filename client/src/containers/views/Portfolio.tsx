import React from "react";

interface PortfolioProps {
  title: string;
}

const Portfolio = ({ title }: PortfolioProps) => {
  return <div>{title}</div>;
};

export default Portfolio;
