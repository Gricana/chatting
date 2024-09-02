import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ChatRoom from "./chatRoom";

// const root = ReactDOM.createRoot(document.getElementById('chat-root'));
const roomName = document.getElementById('room-name').textContent;
const root = ReactDOM.createRoot(document.getElementById('chat-root'));
root.render(
    <ChatRoom roomName={roomName} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
