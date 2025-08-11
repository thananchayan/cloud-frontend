
import {BrowserRouter as Router, Routes,Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./Admin/Admin";
import AddMatches from "./Admin/AddMatches";
import EditMatches from "./Admin/EditMatches";
import ViewMatches from "./Admin/ViewMatches";
import Matches from "./pages/Matches";
import ViewMatch from "./pages/ViewMatch";
import Booking from "./pages/Booking";
import BookTicket from "./pages/BookTicket";
import MyTickets from "./pages/MyTickets";
import AdminAllBookings from "./Admin/AdminAllBookings";


function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
          <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/Signup" element={<Signup />} />
            <Route exact path="/matches" element={<Matches />} />
            <Route exact path="/Admin/Admin" element={<Admin />} />
            <Route exact path="/Admin/addmatch" element={<AddMatches />} />
            <Route exact path="/Admin/editmatch/:id" element={<EditMatches/>} />
            <Route exact path="/Admin/viewmatch/:id" element={<ViewMatches/>} />
            <Route exact path="/viewmatch/:id" element={<ViewMatch />} />
            <Route exact path="/booking/:id" element={<BookTicket />} />
             <Route exact path="/mytickets" element={<MyTickets />} />
             <Route exact path="/Admin/alltickets" element={<AdminAllBookings />} />


          </Routes>
      </Router>

      
      
    </div>
  );
}

export default App;
