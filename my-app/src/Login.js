import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    let body = {
      email,
      password,
    };
    await axios.post("http://localhost:3002/login", body).then((response) => {
      const token = response?.data?.data;
      localStorage.setItem("secret_mission", token?.auth_token);
      localStorage.setItem("user_info", JSON.stringify(token));
      setEmail("");
      setPassword("");
    });
  };

  return (
    <>
      <div className="app">
        <div className="login-form">
          <div className="title">Sign In</div>
          <div className="form">
            <form onSubmit={login}>
              <div className="input-container">
                <label>Email </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="input-container">
                <label>Password </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button
                className="button-container"
                type="submit"
                style={{
                  padding: "4px",
                  display: "flex",
                  margin: "auto",
                  marginTop: "24px",
                  boxShadow: "22px",
                }}
              >
                Save Credentials
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
