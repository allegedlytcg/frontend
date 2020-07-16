import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
const URL = "http://localhost:5000/api/v1/chat/";

const SocketSetup = () => {
  const [response, setResponse] = useState("");

  const socket = io("http://localhost:5000/")

  let test = useRef(socket)
  useEffect(() => {


    const token = localStorage.getItem("token");
    axios
      .get(URL, { headers: { authorization: token } })
      
  }, []);
  
  // console.log(socket)
  socket.on('connect', (data) => {
    console.log(socket.id)
  })
  socket.on('user', (user) => {
    setResponse(user)
  })
  return <p>Response was {response}</p>;
};

export default SocketSetup;
