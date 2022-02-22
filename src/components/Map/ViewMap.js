import { useState } from "react";
import { Fab } from "@mui/material";
import TramIcon from "@mui/icons-material/Tram";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { Map, Overlay } from "pigeon-maps";
import { isMobile } from "react-device-detect";
import { maptiler } from "pigeon-maps/providers";
import CommuteIcon from "@mui/icons-material/Commute";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dropdown from "./Dropdown/Dropdown";
import "./ViewMap.css";
const maptilerProvider = maptiler("kfJKt4TfflQlEPFS4wos", "streets");

function ViewMap(props) {
  const [state, setState] = useState();
  const [showUserIcon, setShowUserIcon] = useState(false);
  const [latitude, setLatitude] = useState(54.372158);
  const [longitude, setLongitude] = useState(18.638306);
  const handleClick = (e) => {
    console.log(e.target.value);
    let foundMatch = props.vehicleData.find(function (vehicle) {
      if (vehicle.Line == e.target.value) return true;
    });
    setState(foundMatch);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setShowUserIcon(true);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }

  console.log(latitude, longitude);
  return (
    <div className='map'>
      <Map
        provider={maptilerProvider}
        defaultZoom={14}
        twoFingerDrag={isMobile ? true : false}
        center={[latitude, longitude]}>
        <Dropdown
          lineData={props.lineData}
          state={state}
          handleClick={handleClick}></Dropdown>
        {showUserIcon ? (
          <Overlay
            sx={{ position: "relative", zIndex: 3 }}
            position={[latitude, longitude]}>
            <div className='div'>
              <AccountCircleIcon
                fontSize='large'
                sx={{ color: "#2196f3" }}></AccountCircleIcon>
              <span className='lineNumber'>You</span>
            </div>
          </Overlay>
        ) : null}
        {state == undefined ? null : (
          <Fab
            color='primary'
            color='default'
            onClick={() => {
              setState(undefined);
            }}
            aria-label='add'
            sx={{ position: "absolute", bottom: 100, right: 16 }}>
            <CommuteIcon />
          </Fab>
        )}
        {state == undefined ? (
          props.vehicleData.map((item, index) => (
            <Overlay
              sx={{ position: "relative", zIndex: 2 }}
              key={index}
              position={[item.Lat, item.Lon]}>
              <div className='div'>
                {item.Line > 100 ? (
                  <DirectionsBusIcon
                    value={index}
                    color={props.iconColorizer(item.Delay)}
                    fontSize='large'
                    onClick={props.toggleDrawer(true, index, item.Line)}
                  />
                ) : (
                  <TramIcon
                    value={index}
                    color={props.iconColorizer(item.Delay)}
                    fontSize='large'
                    onClick={props.toggleDrawer(true, index, item.Line)}
                  />
                )}
                <span className='lineNumber'> {item.Line} </span>
              </div>
            </Overlay>
          ))
        ) : (
          <Overlay
            sx={{ position: "relative", zIndex: 2 }}
            color='red'
            position={[state.Lat, state.Lon]}>
            <div className='div'>
              {state.Line > 100 ? (
                <DirectionsBusIcon
                  color={props.iconColorizer(state.Delay)}
                  fontSize='large'
                />
              ) : (
                <TramIcon
                  color={props.iconColorizer(state.Delay)}
                  fontSize='large'
                />
              )}
              <span className='lineNumber'>{state.Line}</span>
            </div>
          </Overlay>
        )}
      </Map>
    </div>
  );
}

export default ViewMap;
