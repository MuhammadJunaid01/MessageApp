import React, { useEffect, useState } from "react";
import "./login.css";
import { io } from "socket.io-client";
const socket = io("http://localhost:7000");
const Login = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [self, setSelf] = useState([]);
  const handleLogin = (e) => {
    e.preventDefault();
    socket.auth = { username: name };
    socket.connect();
  };
  useEffect(() => {
    socket.on("users", (data) => {
      console.log(data);
      setUsers([...users, data]);
    });
    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
      });
    });
  }, [name]);

  console.log("users", users);
  return (
    <div className="loginContainer">
      <div className="login_content">
        <h2>Please! Login</h2>
        <form onSubmit={handleLogin}>
          <input
            onBlur={(e) => setName(e.target.value)}
            className="login_input"
            type="text"
            placeholder="Enter Your Name:"
          />
          <input className="submit_btn" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
