import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function AddMatches() {
  let navigate = useNavigate();

  const [matchData, setMatchData] = useState({
    teamA: "",
    teamB: "",
    format: "",
    location: "",
    matchDate: "",
    time: "",
    totalSeats: "",
    price: "",
    description: "",
    imageUrl:""
  });

  const { teamA, teamB, format, location, matchDate, time, totalSeats, price, description,imageUrl } =
    matchData;

  const onInputChange = (e) => {
    setMatchData({ ...matchData, [e.target.name]: e.target.value });
  };

const onSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    // Combine date and time into ISO 8601 format
    const combinedDateTime = `${matchDate}T${time}`; // example: "2024-07-15T14:30"

    const payload = {
      teamA,
      teamB,
      format,
      location,
      matchDate: combinedDateTime,
      time, // optional, you can remove this if your backend only uses matchDate
      totalSeats: parseInt(totalSeats),
      price: parseFloat(price) || 0,
      description,
      imageUrl
    };

    console.log("Sending payload:", payload);

    await axios.post("http://localhost:8080/matches", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    navigate("/Admin/Admin");
  } catch (error) {
    console.error("Failed to add match:", error);
    alert("Failed to add match. Please check your input or token.");
  }
};


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-navy ">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="" width="80" height="80" />
        </a>
        <div style={{ marginLeft: "10px" }}>
          <h1 style={{ margin: 0 }}>
            <span style={{ color: "#FFD700", fontSize: "2em", fontFamily: "Times New Roman" }}>
              Cric
            </span>
            <span style={{ color: "#FFFFFF", fontSize: "1.2em", fontFamily: "Times New Roman" }}>
              TicketHub
            </span>
          </h1>
        </div>
        <div className="ml-auto">
          <Link className="btn btn-outline-light m-3" to="/">
            Logout
          </Link>
        </div>
      </nav>

      <div className="form-background">
        <div className="col-md-6 offset-md-3 border rounded p-4 shadow custom-form">
          <h2 className="text-center m-4">Add Match</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Team A</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Team A"
                name="teamA"
                value={teamA}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Team B</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Team B"
                name="teamB"
                value={teamB}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Format</label>
              <input
                type="text"
                className="form-control"
                placeholder="ODI / T20 / Test"
                name="format"
                value={format}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the location"
                name="location"
                value={location}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Match Date</label>
              <input
                type="date"
                className="form-control"
                name="matchDate"
                value={matchDate}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                name="time"
                value={time}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Total Seats</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter total seats"
                name="totalSeats"
                value={totalSeats}
                onChange={onInputChange}
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Ticket Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter ticket price"
                name="price"
                value={price}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter match description"
                name="description"
                value={description}
                onChange={onInputChange}
              />
            </div>
                   <div className="mb-3">
              <label className="form-label">Enter Image Url</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Image Url"
                name="imageUrl"
                value={imageUrl}
                onChange={onInputChange}
              />
        
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/Admin/Admin">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
