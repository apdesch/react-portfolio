import styled from "styled-components";

const Page = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 4em 0;
  max-width: 58em;
  > article {
    margin-bottom: 3em;
    > h1 {
      text-transform: uppercase;
    }
    > section {
      display: flex;
      flex-direction: column;
      margin-bottom: 3em;
    }
  }
  .project-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: end;
    gap: 1em;
    direction: rtl;
    section {
      direction: ltr;
    }
    h2 {
      font-size: 3em;
    }
    h4 {
      font-size: 1.1em;
      margin-bottom: 1em;
    }
    @media screen and (max-width: 54em) {
      grid-template-columns: none;
    }
  }
  .skills {
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 0.9em;
    text-transform: uppercase;
    > li {
      display: inline-block;
      padding: 0 2px;
      margin-bottom: 0.5em;
      margin-right: 0.5em;
      border-radius: 2px;
      background-color: var(--color-text);
      color: var(--color-bg);
    }
  }
  .body {
    margin-bottom: 3em;
    > p {
      max-width: none;
    }
  }
`;

export default Page;
