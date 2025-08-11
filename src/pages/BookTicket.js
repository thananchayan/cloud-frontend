import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./BookTicket.css";
import logo from "../assets/logo.png";

export default function BookTicket() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [seatNumber, setSeatNumber] = useState(1);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:8080/tickets/book",
        { matchId: parseInt(id), seatNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Ticket booked successfully!");
      navigate("/matches");
    } catch (err) {
      console.error("Booking failed:", err);
      setError("Booking failed. Please try again.");
    }
  };

  return (
    <div className="BookTicket-custom-background">
      <nav className="navbar navbar-expand-lg bg-navy">
        <a className="navbar-brand" href="../assets/logo.png">
          <img src={logo} alt="" width="80" height="80" />
        </a>
        <div style={{ marginLeft: "10px" }}>
          <h1 style={{ margin: 0 }}>
            <span style={{ color: "#FFD700", fontSize: "2em", fontFamily: "Times New Roman" }}>Cric</span>
            <span style={{ color: "#FFFFFF", fontSize: "1.2em", fontFamily: "Times New Roman" }}>TicketHub</span>
          </h1>
        </div>
        <div className="ml-auto">
          <Link className="btn btn-primary color-dark btn-sm m-3" to="/matches">Matches</Link>
          <Link className="btn btn-outline-light btn-sm m-3" to="/">Logout</Link>
        </div>
      </nav>

      <div className="book-background d-flex justify-content-center align-items-center">
        <div className="card pt-20 p-4 shadow-lg booking-form ">
          <h2 className="text-center mb-4">Book Your Ticket</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="seatNumber" className="form-label">
                Number of Seats
              </label>
              <input
                type="number"
                className="form-control"
                id="seatNumber"
                min="1"
                value={seatNumber}
                onChange={(e) => setSeatNumber(parseInt(e.target.value))}
                required
              />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <div className="d-grid">
              <button type="submit" className="btn btn-success">Confirm Booking</button>
            </div>

            <div className="mt-3 text-center">
              <Link className="btn btn-outline-secondary btn-sm" to="/matches">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
