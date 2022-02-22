import { useState } from "react";
import { Fab } from "@mui/material";
import TramIcon from "@mui/icons-material/Tram";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { Map, Overlay } from "pigeon-maps";
import { isMobile } from "react-device-detect";
import { maptiler } from "pigeon-maps/providers";
import CommuteIcon from "@mui/icons-material/Commute";
import Dropdown from "./Dropdown/Dropdown";
import "./ViewMap.css";
const maptilerProvider = maptiler("kfJKt4TfflQlEPFS4wos", "streets");

function ViewMap(props) {
  const [state, setState] = useState();
  const handleClick = (e) => {
    console.log(e.target.value);
    let foundMatch = props.vehicleData.find(function (vehicle) {
      if (vehicle.Line == e.target.value) return true;
    });
    setState(foundMatch);
  };

  return (
    <div className='map'>
      <Map
        provider={maptilerProvider}
        defaultZoom={11}
        twoFingerDrag={isMobile ? true : false}
        defaultCenter={[54.372158, 18.638306]}>
        <Dropdown
          lineData={props.lineData}
          state={state}
          handleClick={handleClick}></Dropdown>
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
              color='red'
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
