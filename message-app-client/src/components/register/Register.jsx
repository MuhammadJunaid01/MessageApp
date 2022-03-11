import React, { useEffect, useState } from "react";
import "./register.css";
import { io } from "socket.io-client";
import { Container, Row, Col } from "react-bootstrap";
const socket = io("http://localhost:7000");

const Register = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [chat, setChat] = useState([]);
  const handleRegister = (e) => {
    e.preventDefault();
    socket.emit("message", { name: name, room: message });
  };
  useEffect(() => {
    socket.on("broadcast", ({ name, room, id, time }) => {
      setChat([...chat, { name: name, message: room, id: id, time: time }]);
    });
  }, [chat]);

  console.log("chat", chat);
  return (
    <Container fluid>
      <div className="registerContainer">
        <Row>
          <Col xs={12} md={5} lg={5}>
            <div className="register_content">
              <div className="register_title">
                <h1>Send Message</h1>
              </div>
              <form onSubmit={handleRegister}>
                <input
                  onBlur={(e) => setName(e.target.value)}
                  className="name_input"
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Your Name:"
                />
                <input
                  onBlur={(e) => setMessage(e.target.value)}
                  className="register_input"
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Your Message:"
                />

                {message && name ? (
                  <input
                    className="register_btn"
                    type="submit"
                    value="Send Message"
                  />
                ) : (
                  <input
                    disabled
                    className="register_btn"
                    type="submit"
                    value="Send Message"
                  />
                )}
              </form>
            </div>
          </Col>

          <Col xs={12} md={7} lg={7}>
            <div className="renderChat">
              {chat.map((chat, index) => (
                <div className="message_container " key={index}>
                  <div className="message">
                    <p>{chat.message}</p>
                  </div>
                  <div className="message_info">
                    <p>From: {chat.name}</p>
                    <i>{chat.time.slice(0, 16)}</i>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Register;
