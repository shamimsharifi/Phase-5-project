import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import ChatComponent from "./chats";
import Signup from "./Pages/Signup";
import Logout from "./Pages/Logout";
import GettingStarted from "./Pages/GettingStarted";
import Layout from "./Components/Layout";
import Profile from "./Pages/Profile";
import ListingDetail from "./Components/ListingDetails";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<GettingStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chatcomponent" element={<ChatComponent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/listing/:id" element={<ListingDetail />} />{" "}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
