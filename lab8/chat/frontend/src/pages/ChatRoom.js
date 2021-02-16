import {
    Typography,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    IconButton,
    Paper,
} from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import useChat from "../useChat";

export default function ChatRoom({ match }) {
    const { roomId } = match.params;
    const { messages, sendMessage } = useChat(roomId);
    const [newMessage, setNewMessage] = React.useState("");
    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };
    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage("");
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                margin: 20,
            }}
        >
            <div
                style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {messages.map((message) => (
                    <Paper
                        style={{
                            padding: 5,
                            width: "min-content",
                            marginBottom: 10,
                            alignSelf: message.ownedByCurrentUser
                                ? "flex-end"
                                : "flex-start",
                        }}
                    >
                        <Typography variant="body1">{message.body}</Typography>
                    </Paper>
                ))}
            </div>
            <div style={{ display: "flex" }}>
                <TextField
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    required
                    fullWidth
                    placeholder="New Message"
                    variant="outlined"
                />
                <IconButton color="primary" onClick={handleSendMessage}>
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    );
}
