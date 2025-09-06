import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import logo from "../assets/logo.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = form;

  const onInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.", { position: "top-center" });
      return false;
    }
    // super basic email check
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email.", { position: "top-center" });
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", { position: "top-center" });
      return false;
    }
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters.", {
        position: "top-center",
      });
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("https://localhost:8443/users/register", {
        email,
        password,
      });

      toast.success("Account created successfully.", {
        position: "top-center",
        autoClose: 1500,
        onClose: () => navigate("/"),
      });
    } catch (err) {
      // try to surface server message if present
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Registration failed. Please try again.";
      toast.error(msg, { position: "top-center" });
      console.error("Register error:", err);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-navy">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="logo" width="80" height="80" />
        </a>

        <div style={{ marginLeft: "10px" }}>
          <h1 style={{ margin: 0 }}>
            <span
              style={{
                color: "#FFD700",
                fontSize: "2em",
                fontFamily: "Times New Roman",
              }}
            >
              Cric
            </span>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: "1.2em",
                fontFamily: "Times New Roman",
              }}
            >
              TicketHub
            </span>
          </h1>
        </div>

        <div className="ms-auto">
          <Link className="btn btn-outline-light m-2" to="/">
            Log In
          </Link>
        </div>
      </nav>

      <div className="custom-background-for-signup">
        <div className="signupcontainer">
          <form onSubmit={onSubmit}>
            <div className="header">
              <div className="text">Sign Up</div>
              <div className="underline"></div>
            </div>

            <div className="inputs">
              <div className="input">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  autoComplete="email"
                />
              </div>

              <div className="input">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  autoComplete="new-password"
                />
              </div>

              <div className="input">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onInputChange}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="submit-container">
              <button type="submit" className="btn btn-outline-primary">
                Sign Up
              </button>
              <ToastContainer theme="colored" />
              <Link className="btn btn-primary" to="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
