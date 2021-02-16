import express from "express";
import socket from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

const port = 4000;

const server = app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        console.log("new message");
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        socket.leave(roomId);
    });
});
