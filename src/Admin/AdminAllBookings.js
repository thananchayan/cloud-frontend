// Admin View All Bookings Page

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/BookTicket.css"; // You can reuse or create new styles

import logo from "../assets/logo.png";

export default function AdminAllBookings() {
  const [tickets, setTickets] = useState([]);
  const [matches, setMatches] = useState({});

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get("http://localhost:8080/tickets/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const ticketsData = result.data.data;
      console.log("ticket data ",ticketsData);
      setTickets(ticketsData);

      const matchPromises = ticketsData.map((ticket) =>
        axios.get(`http://localhost:8080/matches/${ticket.matchId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      const matchResponses = await Promise.all(matchPromises);
      const matchMap = {};
      matchResponses.forEach((res, idx) => {
        matchMap[ticketsData[idx].matchId] = res.data.data;
      });
      setMatches(matchMap);
    } catch (err) {
      console.error("Failed to load tickets or matches:", err);
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
          <Link className="btn btn-primary btn-sm m-3" to="/Admin/Admin">Dashboard</Link>
          <Link className="btn btn-outline-light btn-sm m-3" to="/">Logout</Link>
        </div>
      </nav>

      <div className="Matches-custom-background">
        <div className="container">
          <h2 className="text-center my-4 text-black">All Bookings</h2>
          <table className="table table-bordered table-striped bg-light">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>User Email</th>
                <th>Match</th>
                <th>Date</th>
                <th>Seats</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => {
                const match = matches[ticket.matchId];
                return (
                  <tr key={ticket.ticketId}>
                    <td>{index + 1}</td>
                    <td>{ticket.userEmail}</td>
                    <td>
                      {match
                        ? `${match.teamA} vs ${match.teamB} @ ${match.location}`
                        : "Loading..."}
                    </td>
                    <td>{match ? new Date(match.matchDate).toLocaleDateString() : "-"}</td>
                    <td>{ticket.seatNumber}</td>
                    <td>{ticket.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
