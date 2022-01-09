import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "contexts/App.context";
import SignIn from "views/admin/SignIn";

const PrivateRoutes: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { auth, user },
      } = await axios.get("/api/user");
      setLoading(false);
      if (auth && Object.entries(user).length) {
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      }
    };
    fetchData();
  }, [dispatch]);

  if (loading) return <>Loading...</>;
  if (!loading && !state.auth.loggedIn) return <SignIn title="Sign In" />;
  return <Outlet />;
};

export default PrivateRoutes;
