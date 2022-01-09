import type { RouteProps } from "components/Head";
import Head from "components/Head";

const About = ({ title, description }: RouteProps) => (
  <>
    <Head title={title} description={description} />
    <h1>About</h1>
  </>
);

export default About;
