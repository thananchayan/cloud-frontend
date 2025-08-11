import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ViewMatch.css";

import logo from "../assets/logo.png";

export default function ViewMatch() {
  const [match, setMatch] = useState(null);
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

  if (!match) return <div>Loading...</div>;

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-navy ">
        <a className="navbar-brand" href="../assets/logo.png">
          <img src={logo} alt="" width="80" height="80" />
        </a>
        <div style={{ marginLeft: "10px" }}>
          <h1 style={{ margin: 0 }}>
            <span
              style={{ color: "#FFD700", fontSize: "2em", fontFamily: "Times New Roman" }}
            >
              Cric
            </span>
            <span
              style={{ color: "#FFFFFF", fontSize: "1.2em", fontFamily: "Times New Roman" }}
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

      <div className="Viewmatch-custom-background ">
        <div className="view-user-container ">
          <div className="card shadow">
            <img
              className="card-img-top"
              src={match.imageUrl}
              alt={`${match.teamA} vs ${match.teamB}`}
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
            <div className="card-header">
              <h2 className="text-center" style={{ color: "white" }}>Match Details</h2>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="detail-label">Match : </span> {match.teamA} vs {match.teamB}
                </li>
                <li className="list-group-item">
                  <span className="detail-label">Format : </span> {match.format}
                </li>
                <li className="list-group-item">
                  <span className="detail-label">Location : </span> {match.location}
                </li>
                <li className="list-group-item">
                  <span className="detail-label">Date : </span> {new Date(match.matchDate).toLocaleString()}
                </li>
                <li className="list-group-item">
                  <span className="detail-label">Time : </span> {match.time}
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
              </ul>
            </div>
            <div className="card-footer text-center">
              <Link
                className="btn btn-outline-primary btn-sm mx-2"
                to={`/booking/${match.id}`}
              >
                Book Now
              </Link>
              <Link className="btn btn-primary btn-sm" to="/matches">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
