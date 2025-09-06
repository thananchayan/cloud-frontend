import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import user from "../assets/account-profile.png";
import Lock from "../assets/password-icon.jpg";
import logo from "../assets/logo.png";

const Login = () => {
  let navigate = useNavigate();
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleClick = async () => {
    if (!loginUserName || !loginPassword) {
      toast.error("Please provide both username and password.", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    try {
      // 🔹 Call user-service via API Gateway
      const response = await axios.post("https://localhost:8443/users/login", {
        email: loginUserName,
        password: loginPassword,
      });
      console.log(response.data);

      const { token, role } = response.data.data;

      // 🔹 Save JWT & role to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "ADMIN") {
        toast.success("Logged in as Admin!", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
          onClose: () => navigate("/Admin/Admin"),
        });
      } else {
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
          onClose: () => navigate("/home"),
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-navy ">
        <a className="navbar-brand" href="../assets/logo.png">
          <img src={logo} alt="" width="80" height="80" />
        </a>
        <div style={{ marginLeft: "10px" }}>
          <h1 style={{ margin: 0 }}>
            <span style={{ color: "#FFD700", fontSize: "2em", fontFamily: "Times New Roman" }}>Cric</span>
            <span style={{ color: "#FFFFFF", fontSize: "1.2em", fontFamily: "Times New Roman" }}>
              TicketHub
            </span>
          </h1>
        </div>
        <div className="ml-auto">
          <Link className="btn btn-outline-light m-2" to="/Signup">
            Sign Up
          </Link>
        </div>
      </nav>

      <div className="login-background">
        <div className="logincontainer">
          <div className="header">
            <div className="text">Log In</div>
            <div className="underline"></div>
          </div>

          <div className="inputs">
            <div className="input">
              <img src={user} alt="" />
              <input
                type="text"
                placeholder="Email"
                value={loginUserName}
                onChange={(e) => setLoginUserName(e.target.value)}
              />
            </div>

            <div className="input">
              <img src={Lock} alt="" />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="forgot-password" style={{ color: "black" }}>
            If you don't have an account?{" "}
            <span>
              <Link to="/signup">Create</Link>
            </span>
          </div>

          <div className="submit-container" style={{ marginLeft: "210px" }}>
            <button className="btn btn-primary" onClick={handleClick}>
              Log In
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
