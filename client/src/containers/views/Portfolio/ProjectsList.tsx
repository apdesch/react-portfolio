import React from "react";
import type { Project } from "reducers/types";
import { getImageURL } from "utils";

interface ProjectProps {
  projects: Project[];
}

const ProjectsList: React.FC<ProjectProps> = ({ projects }) => (
  <>
    {projects.map(({ id, title, description, image, alt, skills }) => {
      return (
        <article key={id}>
          <img
            className="thumbnail"
            src={getImageURL(image)}
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
        </article>
      );
    })}
  </>
);

export default ProjectsList;
