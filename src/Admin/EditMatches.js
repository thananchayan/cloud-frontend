import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./EditMatches.css";

import logo from "../assets/logo.png";

export default function EditMatches() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [matchData, setMatchData] = useState({
    teamA: "",
    teamB: "",
    location: "",
    matchDate: "",
    time: "",
    format: "",
    totalSeats: 0,
    description: "",
    price: 0
  });

  const { teamA, teamB, location, matchDate, time, format, totalSeats, description, price,imageUrl } = matchData;

  const onInputChange = (e) => {
    setMatchData({ ...matchData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadMatch();
  }, []);

const onSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    console.log("Submitting match data:", matchData);

    await axios.put(
      `http://localhost:8080/matches/${id}`,
      matchData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    navigate("/Admin/Admin");
  } catch (err) {
    console.error("Update failed:", err);
    alert("Unauthorized or token expired.");
  }
};
const loadMatch = async () => {
  const token = localStorage.getItem("token");
  const result = await axios.get(`http://localhost:8080/matches/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("match details:",result.data.data)
  setMatchData(result.data.data); // Adjust if ContentResponse structure is different
};


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-navy ">
        <a class="navbar-brand" href="../assets/logo.png">
          <img src={logo} alt="" width="80" height="80" />
        </a>
        <div className="buttons">
          <div style={{ marginLeft: "10px" }}>
            <h1 style={{ margin: 0 }}>
              <span style={{ color: "#FFD700", fontSize: "2em", fontFamily: "Times New Roman" }}>Cric</span>
              <span style={{ color: "#FFFFFF", fontSize: "1.2em", fontFamily: "Times New Roman" }}>TicketHub</span>
            </h1>
          </div>
        </div>
        <div className="ml-auto">
          <Link className="btn btn-primary color-dark m-3" to="/matches">Matches</Link>
          <Link className="btn btn-outline-light m-3" to="/">Logout</Link>
        </div>
      </nav>
      <div className="form-background">
        <div className="col-md-6 offset-md-3 border rounded p-4 shadow custom-form">
          <h2 className="text-center m-4">Edit Match</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label className="form-label">Team A</label>
              <input type="text" className="form-control" name="teamA" value={teamA} onChange={onInputChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Team B</label>
              <input type="text" className="form-control" name="teamB" value={teamB} onChange={onInputChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Format</label>
              <input type="text" className="form-control" name="format" value={format} onChange={onInputChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input type="text" className="form-control" name="location" value={location} onChange={onInputChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Match Date</label>
              <input type="datetime-local" className="form-control" name="matchDate" value={matchDate} onChange={onInputChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Time</label>
              <input type="text" className="form-control" name="time" value={time} onChange={onInputChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Total Seats</label>
              <input type="number" className="form-control" name="totalSeats" value={totalSeats} onChange={onInputChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <input type="text" className="form-control" name="description" value={description} onChange={onInputChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input type="number" className="form-control" name="price" value={price} onChange={onInputChange} />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input type="text" className="form-control" name="imageUrl" value={imageUrl} onChange={onInputChange} />
            </div>

            <button type="submit" className="btn btn-outline-primary">Submit</button>
            <Link className="btn btn-outline-danger mx-2" to="/Admin/Admin">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
