import styled from "styled-components";

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1080px;
  margin: auto;
  h1,
  h2 {
    text-transform: uppercase;
  }
  h1 {
    margin-left: -3px;
    font-size: 4.5em;
    font-weight: 600;
    line-height: 1.2em;
  }
  h2 {
    margin-bottom: 1.2em;
    font-size: 1.5em;
    font-weight: 400;
  }
  .col {
    width: 50%;
    padding: 1.5em;
  }
  .cutout {
    width: 100%;
  }
  .button {
    margin-bottom: 1.5rem;
    margin-right: 2rem;
  }
  .social {
    font-size: 2.2rem;
    a {
      color: var(--color-primary-darker);
    }
    a + a {
      margin-left: 1.5rem;
    }
  }
`;

export default Body;
