import styled from "styled-components";

const GlobalNav = styled.nav`
  display: flex;
  width: 100%;
  padding-top: 3em;
  padding-bottom: 2em;
  transition: all 1s ease-in-out;
  justify-content: space-evenly;
  a {
    color: var(--color-text);
    display: block;
    font-size: 1.8em;
    margin: 0 1em;
    text-transform: uppercase;
  }
`;

export default GlobalNav;
