  import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Matches.css";

import logo from "../assets/logo.png";

export default function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get("http://localhost:8080/matches", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMatches(result.data.data);
    } catch (err) {
      console.error("Failed to load matches:", err);
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
            <span style={{ color: "#FFFFFF", fontSize: "1.2em", fontFamily: "Times New Roman" }}>TicketHub</span>
          </h1>
        </div>
        <div className="ml-auto">
          <Link className="btn btn-primary btn-sm color-dark m-3" to="/home">Home</Link>
          <Link className="btn btn-outline-light btn-sm m-3" to="/">Logout</Link>
        </div>
      </nav>

      <div className="Matches-custom-background">
        <div className="container">
          <table className="table custom-table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Match</th>
                <th scope="col">Format</th>
                <th scope="col">Location</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Available Tickets</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => (
                <tr key={match.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{match.teamA} vs {match.teamB}</td>
                  <td>{match.format}</td>
                  <td>{match.location}</td>
                  <td>{new Date(match.matchDate).toLocaleDateString()}</td>
                  <td>{match.time}</td>
                  <td>{match.availableSeats}</td>
                  <td>{match.description}</td>
                  <td>Rs. {match.price}</td>
                  <td>
                    <Link className="btn btn-primary btn-sm mx-2" to={`/viewmatch/${match.id}`}>View</Link>
                    <Link className="btn btn-outline-primary btn-sm mx-2" to={`/booking/${match.id}`}>Book Now</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
