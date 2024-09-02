import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


function ChatRoom({ roomName }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = new WebSocket(`ws://localhost:8002/ws/chat/${roomName}/`);

        socketInstance.onmessage = (e) => {
            const data = JSON.parse(e.data);
            // TODO: add the ability to unload old chat messages after page reload
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };

        socketInstance.onclose = () => {
            console.error('Chat socket closed unexpectedly');
        };

        setSocket(socketInstance);

        return () => {
            socketInstance.close();
        };
    }, [roomName]);

    const sendMessage = () => {
        if (message.trim() === "" || !socket) return;

        socket.send(JSON.stringify({
            'message': message
        }));
        setMessage("");
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatRoom;
