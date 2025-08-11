import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Booking.css";

import logo from "../assets/logo.png";

export default function Booking() {
  
  const [orderedTickets, setOrderedTickets] = useState("");
  

  const [matches, setMatches] = useState({
    match: "",
    format: "",
    location: "",
    date: "",
    time: "",
    totalSeats: "",
    availableSeats: "",
    description: "",
  });
  const {
    match,
    format,
    location,
    date,
    time,
    totalSeats,
    availableSeats,
    description,
  } = matches;

  const { id } = useParams();

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    const result = await axios.get(`http://localhost:8080/match/${id}`);
    setMatches(result.data);
  };

  const handleInputChange = (e) => {
    setOrderedTickets(e.target.value);
  };
  const handleClick = async () => {
    if (orderedTickets > availableSeats) {
      toast.error("Sorry!. Only " + availableSeats + " seats are available", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    } else if (orderedTickets === "" || orderedTickets < 1) {
      toast.error("Please enter the correct no of tickets you want.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    } else {
      toast.success("You successfully booked " + orderedTickets + " Seats.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return true;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (handleClick()) {
      const newAvailableSeats = availableSeats - orderedTickets;
      try {
        const response = await axios.put(`http://localhost:8080/match/${id}`, {
          match:matches.match,
          format:matches.format,
          location:matches.location,
          date:matches.date,
          time:matches.time,
          totalSeats:matches.totalSeats,
          availableSeats: newAvailableSeats,
          description:matches.description
          
        });
        if (response.status === 200) {
          setMatches({ ...matches, availableSeats: newAvailableSeats });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-navy ">
        <a className="navbar-brand" href="../assets/logo.png">
          <img src={logo} alt="" width="80" height="80" />
        </a>
        <div
          style={{
            marginLeft: "10px",
          }}
        >
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

        <div className="ml-auto">
          <Link className="btn btn-primary color-dark btn-sm m-3" to="/matches">
            Matches
          </Link>
          <Link className="btn btn-outline-light btn-sm m-3" to="/">
            Logout
          </Link>
        </div>
      </nav>

      <div className="booking-background">
        <div className="view-user-container ">
          <div className="card shadow">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="card-header">
                <h2
                  className="text-center"
                  style={{ color: "white", fontFamily: "-moz-initial" }}
                >
                  Booking Details
                </h2>
              </div>

              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="detail-label">Match : </span>{" "}
                    {matches.match}
                  </li>
                  <li className="list-group-item">
                    <span className="detail-label">Format : </span>{" "}
                    {matches.format}
                  </li>
                  <li className="list-group-item">
                    <span className="detail-label">Location : </span>{" "}
                    {matches.location}
                  </li>
                  <li className="list-group-item">
                    <span className="detail-label">Date : </span> {matches.date}
                  </li>
                  <li className="list-group-item">
                    <span className="detail-label">Time : </span> {matches.time}
                  </li>
                  <li className="list-group-item">
                    <span className="detail-label">
                      No of tickets available :{" "}
                    </span>{" "}
                    {matches.availableSeats}
                  </li>
                  <li className="list-group-item">
                    <span className="detail-label">Description : </span>{" "}
                    {matches.description}
                  </li>
                </ul>

                <div className="input">
                  <label htmlFor="orderedTickets" className="input-label">
                    Count:
                  </label>
                  <input
                    type="number"
                    id="orderedTickets"
                    name="orderedTickets"
                    value={orderedTickets}
                    onChange={handleInputChange}
                    className="number-input"
                    placeholder="Enter the number of tickets"
                  />
                </div>
              </div>
              <div className="card-footer">
                <Link className="btn btn-primary mx-2" onClick={handleClick}>
                  Confirm
                </Link>
                <Link className="btn btn-danger" to={"/matches"}>
                  Back
                </Link>
                <ToastContainer
                  position="top-center"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
