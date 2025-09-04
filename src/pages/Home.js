import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

import logo from "../assets/logo.png";

export default function Home() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:8080/matches", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMatches(result.data.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-navy ">
        <a className="navbar-brand" href="../assets/logo.png">
          <img src={logo} alt="" width="80" height="80" />
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

        <div className="ml-auto">
          <Link className="btn btn-primary color-dark btn-sm m-3" to="/matches">
            Matches
          </Link>
          <Link className="btn btn-success btn-sm m-3" to="/mytickets">
            My Tickets
          </Link>
          <Link className="btn btn-outline-light btn-sm m-3" to="/">
            Logout
          </Link>
        </div>
      </nav>

      <div className="Home-custom-background d-flex flex-wrap justify-content-center">
        {matches.map((match) => (
          <div
            className="card m-3"
            key={match.id}
            style={{ width: "18rem", height: "32rem" }}
          >
            <img
              className="card-img-top"
              src={match.imageUrl}
              alt={`${match.teamA} vs ${match.teamB}`}
              style={{ height: "180px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">
                {match.teamA} vs {match.teamB}
              </h5>
              <p className="card-text">{match.description}</p>
              <p className="card-text">
                <strong>Format:</strong> {match.format}
              </p>
              <p className="card-text">
                <strong>Location:</strong> {match.location}
              </p>
              <p className="card-text">
                <strong>Date:</strong>{" "}
                {new Date(match.matchDate).toLocaleDateString()} {match.time}
              </p>
              <p className="card-text">
                <strong>Price:</strong> LKR {match.price}
              </p>
              <Link to={`/booking/${match.id}`} className="btn btn-primary">
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
