import React, { useState, useEffect } from 'react';
import { withStyles } from "@material-ui/styles";
import Medicine from "./images/thankyou.png";
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
//import Autocomplete from '@material-ui/lab/Autocomplete';
import * as moment from "moment";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import VideoChat from "./VideoChat";
import Button from "@material-ui/core/Button";
import Video from 'twilio-video';
import Participant from './Participant';
const useStyles = (theme) => ({
  downShift: {
    paddingTop: "18px !important",
  },
  textFieldCard: {
    paddingTop: "0px !important",
  },
  cardcontent: {
    paddingTop: "0px !important",
    paddingLeft: "4px",
    paddingRight: "4px",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  asdf: {
    margin: 1000,
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: "none",
  },

  sectionDesktop: {
    display: "none",
  },
  sectionMobile: {
    display: "flex",
  },

  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
  },
  formControl: {
    minWidth: 120,
    width: "100%",
  },
  container: {
    marginTop: "100px",
  },
});
const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

    Video.connect(token, {
      name: roomName
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function(trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

    
  return (
    <div className="room" >
      {/* <h2>Room: {roomName}</h2> */}

      <div className="remote-participants">{remoteParticipants}
      </div>
      <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />

        ) : (
          ''
        )}
      </div>
      {/* <h3>Remote Participants</h3> */}
      <AppBar
          position="fixed"
          style={{ top: "auto", bottom: 0 }}
          color="default"
        >
          <Toolbar variant="dense">
            <div className="grow" style={{flexGrow: 1}} />
            <Button type="submit" variant="contained" style={{backgroundColor:"red",color:"white"}}
              onClick={handleLogout}
            >
              Leave Meeting
              </Button>
          </Toolbar>
        </AppBar>
    </div>
  );
};

export default withStyles(useStyles)(Room);
