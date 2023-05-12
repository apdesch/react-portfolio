import styled from "styled-components";

const Page = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 4em 0;
  max-width: 64em;
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
`;

export default Page;
