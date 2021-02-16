import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import ChatRoom from "./pages/ChatRoom";

export default function App() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setOpen(open);
    };
    return (
        <React.Fragment>
            <AppBar onMenuClick={toggleDrawer(true)} />
            <Drawer open={open} onClose={toggleDrawer(false)} />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/chat">
                    <Chat />
                </Route>
                <Route exact path="/chat/:roomId" component={ChatRoom}>
                    {/* <ChatRoom /> */}
                </Route>
            </Switch>
        </React.Fragment>
    );
}
