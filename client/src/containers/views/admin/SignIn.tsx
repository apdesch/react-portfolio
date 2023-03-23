import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/App.context";
import type { RouteProps } from "components/Head";
import Head from "components/Head";
import axios, { AxiosError } from "axios";
import { User } from "reducers/types";
import FormField from "components/FormField";

interface AuthResponse {
  auth: boolean;
  user: User;
  error?: string;
}

const SignIn = ({ title, description }: RouteProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useContext(AppContext);

  if (state.auth.loggedIn) navigate("/admin", { replace: true });

  const loginHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const payload = { email, password };
      const { data } = await axios.post<AuthResponse>(
        "/api/user/login",
        payload,
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      navigate("/admin");
    } catch (error) {
      const errorMessage = axios.isAxiosError(error) ? error.response?.data : error;
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
    }
  };

  return (
    <>
      <Head title={title} description={description} />
      <h1>Sign In</h1>
      <FormField type="text" name="email" label="Email" onChange={setEmail} />
      <FormField
        type="password"
        name="password"
        label="Password"
        onChange={setPassword}
      />
      {state.auth.error && <strong>{state.auth.error}</strong>}
      <br />
      <button type="button" onClick={loginHandler}>
        Sign In
      </button>
    </>
  );
};

export default SignIn;
