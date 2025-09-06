import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BookTicket.css";

import logo from "../assets/logo.png";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [matches, setMatches] = useState({});

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const ticketRes = await axios.get("https://localhost:8443/tickets/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const ticketList = ticketRes.data.data;

      const matchDetails = {};
      for (let ticket of ticketList) {
        if (!matchDetails[ticket.matchId]) {
          const matchRes = await axios.get(`https://localhost:8443/matches/${ticket.matchId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          matchDetails[ticket.matchId] = matchRes.data.data;
        }
      }
      setMatches(matchDetails);
      setTickets(ticketList);
    } catch (err) {
      console.error("Error loading tickets:", err);
    }
  };

  const exportToPDF = (ticketId) => {
    const element = document.getElementById(`ticket-${ticketId}`);
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`ticket-${ticketId}.pdf`);
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-navy">
        <a className="navbar-brand" href="../assets/logo.png">
          <img src={logo} alt="logo" width="80" height="80" />
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

      <div className="BookTicket-custom-background">
        <div className="container py-4">
          <h2 className="text-center text-dark mb-4">My Tickets</h2>
          {tickets.map((ticket) => {
            const match = matches[ticket.matchId];
            return (
              <div key={ticket.ticketId} className="card shadow mb-4" id={`ticket-${ticket.ticketId}`}>
                <div className="row g-0">
                  <div className="col-md-4">
                    {match?.imageUrl && (
                      <img
                        src={match.imageUrl}
                        alt="match"
                        className="img-fluid rounded-start h-100 w-100"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        {match?.teamA} vs {match?.teamB} ({match?.format})
                      </h5>
                      <p className="card-text mb-1"><strong>Location:</strong> {match?.location}</p>
                      <p className="card-text mb-1">
                        <strong>Date:</strong> {new Date(match?.matchDate).toLocaleDateString()} at {match?.time}
                      </p>
                      <p className="card-text mb-1"><strong>Booked by:</strong> {ticket.userEmail}</p>
                      <p className="card-text mb-1"><strong>Tickets:</strong> {ticket.seatNumber}</p>
                      <p className="card-text"><strong>Status:</strong> {ticket.status}</p>
                      <button
                        className="btn btn-success btn-sm mt-2"
                        onClick={() => exportToPDF(ticket.ticketId)}
                      >
                        Download Ticket (PDF)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
