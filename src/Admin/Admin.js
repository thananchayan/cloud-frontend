import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Admin.css";
import logo from "../assets/logo.png";

export default function Admin() {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://localhost:8443/matches", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Backend returns ContentResponse
      setMatches(response.data.data || []);
    } catch (error) {
      console.error("Failed to load matches:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/"); // redirect to login if unauthorized
      }
    }
  };

  const deleteMatch = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://localhost:8443/matches/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadMatches();
    } catch (error) {
      console.error("Failed to delete match:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-navy ">
        <a className="navbar-brand" href="/">
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
          <Link className="btn btn-outline-light btn-sm m-3" to="/Admin/addmatch">
            Add Matches
          </Link>
           <Link className="btn btn-outline-light btn-sm m-3" to="/Admin/alltickets">
            View Bookings
          </Link>
          <button className="btn btn-outline-light btn-sm m-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <table className="table shadow">
        <thead>
          <tr>
            <th>ID</th>
            <th>Match</th>
            <th>Format</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price</th>
            <th>Total Seats</th>
            <th>Available Seats</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <tr key={match.id}>
              <td>{match.id}</td>
              <td>{`${match.teamA} vs ${match.teamB}`}</td>
              <td>{match.format}</td>
              <td>{match.location}</td>
              <td>{new Date(match.matchDate).toLocaleDateString()}</td>
              <td>{match.time}</td>
              <td>{match.price}</td>
              <td>{match.totalSeats}</td>
              <td>{match.availableSeats}</td>
              <td>{match.description}</td>
              <td>
                <Link
                  className="btn btn-primary btn-sm mx-1"
                  to={`/Admin/viewmatch/${match.id}`}
                >
                  View
                </Link>
                <Link
                  className="btn btn-outline-primary btn-sm mx-1"
                  to={`/Admin/editmatch/${match.id}`}
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() => deleteMatch(match.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
