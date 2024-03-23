import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

import Livechat from "./livechat/livechat";

import "./chatApp.css";

const socket = io("http://localhost:5000");

const ChatApp = () => {
  const [roomData, setRoomData] = useState([]);

  const navigate = useNavigate();
  let username, room, _id;
  const fetchRoomId = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("http://localhost:5000/chatRoom", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);
        setRoomData(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    fetchRoomId();
  }, []);

  console.log("roomData", roomData);

  return (
    <div>
      <div className="chatUser-header">
        <div className="titleHeader">Customer Service</div>
        <div
          className="homeHeader"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </div>
      </div>
      {roomData?.map((data, i) => {
        console.log("socket", socket, data.username, data.room);

        return (
          <div className="chatUser-body" key={i}>
            <div className="roomBody">
              <div className="cusRoom">USER ROOM</div>
              <div className="roomId">
                <div className="cusIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-emoji-smile"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
                  </svg>
                </div>
                <div className="userDetail">
                  <div className="userRoom">{data.username}</div>
                  <div className="idRoom">{data._id}</div>
                </div>
              </div>
            </div>
            <div className="joinRoom">
              <div className="cusChat">
                <Livechat
                  socket={socket}
                  username={data.username}
                  room={data.room}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ChatApp;
