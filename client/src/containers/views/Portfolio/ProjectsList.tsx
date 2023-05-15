import React from "react";
import { sanitize } from "dompurify";
import type { Project } from "reducers/types";
import { assetUrl } from "utils";

interface ProjectProps {
  projects: Project[];
}

const ProjectsList: React.FC<ProjectProps> = ({ projects }) => (
  <>
    {projects.map(({ id, title, description, image, alt, skills, body }) => {
      if (!image) return;
      return (
        <article key={`project-${id}`} className="project-info">
          <img
            className="thumbnail"
            src={assetUrl(image)}
            alt={alt}
            role="figure"
          />
          <section>
            <h2>{title}</h2>
            <h4>{description}</h4>
            <ul className="skills">
              {skills && skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </section>
          {!!body && (
            <section
              className="body"
              dangerouslySetInnerHTML={{ __html: sanitize(body) }}
            ></section>
          )}
        </article>
      );
    })}
  </>
);

export default ProjectsList;
