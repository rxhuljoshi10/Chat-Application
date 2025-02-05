import React, { useState, useRef, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const ChatApp = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/chat"); // Backend WebSocket URL
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe("/topic/messages", (msg) => {
          setMessages((prevMessages) => [...prevMessages, JSON.parse(msg.body)]);
        });
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // Scroll to the bottom
    }
  }, [messages]);

  const sendMessage = () => {
    if (stompClient && stompClient.connected && username && message) {
      stompClient.publish({
        destination: "/app/sendMessage",
        body: JSON.stringify({ sender: username, content: message }),
      });
      setMessage("");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Simple Chat Application</h2>
      <div style={styles.chatBox} ref={chatBoxRef}>
        <ul style={styles.messageList}>
          {messages.map((msg, index) => (
            <li key={index} >
              <strong>{msg.sender}:</strong> {msg.content}
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  },
  chatBox: {
    width: "80%",
    maxWidth: "400px",
    height: "200px",
    overflowY: "auto",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    textAlign: 'left'
  },
  messageList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  message: {
    padding: "5px",
    borderBottom: "1px solid #ddd",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
  },
  input: {
    padding: "8px",
    width: "150px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ChatApp;
