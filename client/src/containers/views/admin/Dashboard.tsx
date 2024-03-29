import React from "react";
import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import type { RouteProps } from "components/Head";
import Head from "components/Head";
import { AppContext } from "contexts/App.context";

const Dashboard = ({ title, description }: RouteProps) => {
  const { state, dispatch } = useContext(AppContext);

  const logoutHandler = async () => {
    await axios.delete("/api/user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <Head title={title} description={description} />
      <h1>Dashboard</h1>
      <Link to="/admin/assets">Assets</Link>
      {" | "}
      <Link to="/admin/projects">Projects</Link>
      <h4>Welcome {state.auth.user ? state.auth.user.username : "User"}</h4>
      <button type="button" onClick={logoutHandler}>
        Sign Out
      </button>
    </>
  );
};

export default Dashboard;
