import React from "react";
import ButtonLink from "components/ButtonLink";

interface LinkProps {
  url: string;
  label: string;
}

interface NavProps {
  links: LinkProps[];
}

const Nav: React.FC<NavProps> = ({ links }) => (
  <div className="nav">
    {links.map(({ url, label }) => (
      <ButtonLink key={label} className="button" to={url}>
        {label}
      </ButtonLink>
    ))}
  </div>
);

export default Nav;
