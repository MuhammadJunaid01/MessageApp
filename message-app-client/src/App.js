import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./components/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/message" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
