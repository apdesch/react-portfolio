import React from "react";

const loggedIn = false;

const Admin: React.FC = (): JSX.Element => {
  if (loggedIn) return <h1>Admin</h1>;
  return <h1>Sign In</h1>;
};

export default Admin;
