import { Container, TextField, Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function Chat() {
    const [roomName, setRoomName] = React.useState("");
    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };
    return (
        <Container maxWidth="xs">
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Room Name"
                autoFocus
                value={roomName}
                onChange={handleRoomNameChange}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                component={Link}
                to={`/chat/${roomName}`}
            >
                join room
            </Button>
        </Container>
    );
}
