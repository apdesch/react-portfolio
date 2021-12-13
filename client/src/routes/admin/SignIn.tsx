import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetch from "utils/http";

interface TokenResponse {
  token: string;
}

const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/admin");
    }
  }, []);

  const loginHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const payload = { email, password };
      const data: TokenResponse = await fetch.post(
        "/api/user/login",
        payload,
        config,
      );
      localStorage.setItem("authToken", data.token);
      navigate("/admin");
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <>
      <h1>Sign In</h1>
      <div>
        <label>
          Email:{" "}
          <input
            type="email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          Password:{" "}
          <input
            type="password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <br />
      <button type="button" onClick={loginHandler}>
        Sign In
      </button>
    </>
  );
};

export default SignIn;
