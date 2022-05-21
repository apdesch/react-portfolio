import React from "react";

interface LinkProps {
  url: string;
  title: string;
  icon: React.ReactNode;
}

interface SocialLinksProps {
  links: LinkProps[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="social">
      {links.map(({ url, title, icon }) => (
        <a
          key={title}
          href={url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          title={title}
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
