import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChatIcon from "@material-ui/icons/Chat";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
});

export default function TemporaryDrawer({ open, onClose }) {
    const classes = useStyles();

    return (
        <Drawer open={open} onClose={onClose}>
            <div
                className={classes.list}
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
            >
                <List>
                    <ListItem button key="Home" component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button key="Chat" component={Link} to="/chat">
                        <ListItemIcon>
                            <ChatIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chat" />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
}
