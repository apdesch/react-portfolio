import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/App.context";
import type { RouteProps } from "../../components/Head";
import Head from "../../components/Head";
import axios from "axios";

interface AuthResponse {
  auth: boolean;
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
      dispatch({ type: "LOGIN_REQUEST", payload: { loggedIn: data.auth } });
      navigate("/admin");
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <>
      <Head title={title} description={description} />
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
