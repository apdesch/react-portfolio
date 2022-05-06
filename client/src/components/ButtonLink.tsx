import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonLink = styled(Link)`
  display: inline-block;
  padding: 0.4rem 1.4rem;
  background-color: var(--color-primary-light);
  color: var(--color-primary-darker);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  min-width: 160px;
  font-size: 1.5em;
  text-transform: uppercase;
  text-align: center;
`;

export default ButtonLink;
