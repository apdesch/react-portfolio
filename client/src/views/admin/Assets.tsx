import type { RouteProps } from "components/Head";
import Head from "components/Head";

const Assets = ({ title, description }: RouteProps) => (
  <>
    <Head title={title} description={description} />
    <h1>Assets</h1>
  </>
);

export default Assets;
