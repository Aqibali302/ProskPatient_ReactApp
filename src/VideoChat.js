import React, { useState, useCallback,useEffect } from 'react';
import Lobby from './Lobby';
import Room from './Room';
import Medicine from "./images/doctor.jpeg";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  Grid,
  IconButton,
  Typography,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
const VideoChat = () => {
  const [username, setUsername] = useState('haseeb123');
  const [roomName, setRoomName] = useState('room_2061');
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);
  useEffect(() => {
    console.log("called");
    handleSubmit();
  });

  const handleLogout = useCallback(event => {
    setToken(null);window.location = "#/MenuPage/";
  }, []);
  const handleSubmit = useCallback(
    async event => {
     // event.preventDefault();
      const data = await fetch('http://192.168.30.106:3001/video/token', {
        method: 'POST',
        body: JSON.stringify({
          identity: username,
          room: roomName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      console.log(data);
      setToken(data.token);
    },
    [roomName, username]
  );

  let render;
  if (token) {
    render = (<Card style={{ width: "98%" ,height:"50%"}}> <Room roomName={roomName} token={token} handleLogout={handleLogout} /></Card>
     
    );
  } else {
    render = (
      <Card style={{ width: "98%" }}>
          <img src={Medicine} height="720px" width="1600" />
          <AppBar
        position="fixed"
        style={{ top: "auto", bottom: 0 }}
        color="default"
      >
        <Toolbar variant="dense">
        <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ fontSize:"15px",fontWeight:"700"}}
            >
            Note:Thank You for Completing the Survey.
            </Typography>
        </Toolbar>
      </AppBar>
        </Card>
    );
  }
  return render;
};

export default VideoChat;
