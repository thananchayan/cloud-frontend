import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './ViewMatches.css'

import logo from "../assets/logo.png";

export default function ViewMatches() {

  const [match, setMatch] = useState({
    teamA: "",
    teamB: "",
    location: "",
    matchDate: "",
    time: "",
    format: "",
    totalSeats: 0,
    availableSeats: 0,
    price: 0,
    description: ""
  });

  const { id } = useParams();

  useEffect(() => {
    loadMatch();
  }, []);

  const loadMatch = async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get(`http://localhost:8080/matches/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMatch(result.data.data);
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
          <Link className="btn btn-primary color-dark m-3" to="/matches">Matches</Link>
          <Link className="btn btn-outline-light m-3" to="/">Logout</Link>
        </div>
      </nav>
      <div className="card shadow">
        <div className="card-header">
          <h2 className="text-center">Match Details</h2>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="detail-label">Team A : </span> {match.teamA}
            </li>
            <li className="list-group-item">
              <span className="detail-label">Team B : </span> {match.teamB}
            </li>
            <li className="list-group-item">
              <span className="detail-label">Format : </span> {match.format}
            </li>
            <li className="list-group-item">
              <span className="detail-label">Location : </span> {match.location}
            </li>
            <li className="list-group-item">
              <span className="detail-label">Match Date : </span> {new Date(match.matchDate).toLocaleString()}
            </li>
            <li className="list-group-item">
              <span className="detail-label">Time : </span> {match.time}
            </li>
            <li className="list-group-item">
              <span className="detail-label">Total Seats : </span> {match.totalSeats}
            </li>
            <li className="list-group-item">
              <span className="detail-label">Available Seats : </span> {match.availableSeats}
            </li>
            <li className="list-group-item">
              <span className="detail-label">Price : </span> Rs. {match.price}
            </li>
            <li className="list-group-item">
              <span className="detail-label">Description : </span> {match.description}
            </li>
              <li className="list-group-item">
              <span className="detail-label">Image URL : </span> {match.imageUrl}
            </li>
          </ul>
        </div>
        <div className="card-footer text-center">
          <Link className="btn btn-primary" to={"/Admin/Admin"}>Back</Link>
        </div>
      </div>
    </div>
  );
} 
