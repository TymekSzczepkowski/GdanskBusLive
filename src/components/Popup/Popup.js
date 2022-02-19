import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material/";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import TramIcon from "@mui/icons-material/Tram";
import Tram from "@mui/icons-material/Tram";

export default function Popup() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Hi, welcome to Gdańsk Bus Live"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Check the exact locations of a given bus and tram in Gdańsk. The
            vehicle position is refreshed every 20 seconds.
          </DialogContentText>
          <br />
          <DialogContentText>
            There are two types of vehicles icons:
          </DialogContentText>
          <DialogContentText>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}>
              <TramIcon fontSize='large' color='success' />
              <span>TRAM</span>
              <DirectionsBusIcon fontSize='large' color='success' />
              <span>BUS</span>
            </div>
          </DialogContentText>
          <DialogContentText>
            Each icon has three types of colours which represent the degree of
            delay:
          </DialogContentText>
          <DialogContentText>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}>
              <DirectionsBusIcon fontSize='large' color='success' />
              <span>No delay</span>

              <DirectionsBusIcon fontSize='large' color='warning' />
              <span>More than 1 minute delay</span>
              <DirectionsBusIcon fontSize='large' color='error' />
              <span>More than 3 minute delay</span>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            CHECK IT OUT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
