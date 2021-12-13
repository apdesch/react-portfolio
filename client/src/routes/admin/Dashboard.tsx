import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetch from "utils/http";

interface MessageResponse {
  message: string;
}

const Dashboard: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/admin/login");
    }
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const data: MessageResponse = await fetch.get("/api/user", config);
        console.log(data.message);
      } catch (error) {
        localStorage.removeItem("authToken");
        navigate("/admin/login");
      }
    };
    fetchData();
  });

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/admin/login");
  };

  return (
    <>
      <h1>Dashboard</h1>
      <button type="button" onClick={logoutHandler}>
        Sign Out
      </button>
    </>
  );
};

export default Dashboard;
