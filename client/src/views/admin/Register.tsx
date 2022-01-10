import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Head, { RouteProps } from "components/Head";

const Register = ({ title }: RouteProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegistration = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/user", {
        email,
        username,
        password,
      });
      console.log(data);
      navigate("/admin");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const fields = [
    {
      label: "Email",
      type: "email",
      value: email,
      onchange: setEmail,
    },
    {
      label: "Username",
      type: "text",
      value: username,
      onchange: setUsername,
    },
    {
      label: "Password",
      type: "password",
      value: password,
      onchange: setPassword,
    },
  ];

  return (
    <>
      <Head title={title} />
      <h1>Create Account</h1>
      <form onSubmit={handleRegistration}>
        {fields.map((field, index) => (
          <>
            {!!index && <br />}
            <label>
              {field.label}{" "}
              <input
                type={field.type}
                value={field.value}
                onChange={(event) => field.onchange(event.target.value)}
              />
            </label>
          </>
        ))}
        {error && <div>{error}</div>}
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;