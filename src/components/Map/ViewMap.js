import { useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  MenuList,
  Fab,
} from "@mui/material";
import TramIcon from "@mui/icons-material/Tram";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { Map, Overlay } from "pigeon-maps";
import { isMobile } from "react-device-detect";
import { maptiler } from "pigeon-maps/providers";

import CommuteIcon from "@mui/icons-material/Commute";
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
        <Paper
          sx={{
            m: 2,
            borderRadius: 2,
            position: "absolute",
            zIndex: 5,
            right: 0,
            left: 0,
          }}>
          <FormControl sx={{ borderRadius: 2 }} variant='filled' fullWidth>
            <InputLabel>
              {state == undefined
                ? "Search for route You want to track"
                : state.Line}
            </InputLabel>
            <Select>
              <MenuList sx={{ height: 150 }}>
                {props.lineData.map((line, index) => (
                  <MenuItem
                    value={line.routeShortName}
                    key={index}
                    onClick={(e) => {
                      handleClick(e);
                    }}>
                    {line.routeShortName} - {line.routeLongName}
                  </MenuItem>
                ))}
              </MenuList>
            </Select>
          </FormControl>
        </Paper>
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
            </Overlay>
          ))
        ) : (
          <Overlay
            sx={{ position: "relative", zIndex: 2 }}
            color='red'
            position={[state.Lat, state.Lon]}>
            {state.Line > 100 ? (
              <DirectionsBusIcon
                color={props.iconColorizer(state.Delay)}
                fontSize='large'
                // onClick={props.toggleDrawer(true, state.Line)}
              />
            ) : (
              <TramIcon
                color={props.iconColorizer(state.Delay)}
                fontSize='large'
                // onClick={props.toggleDrawer(true, state.Line)}
              />
            )}
          </Overlay>
        )}
      </Map>
    </div>
  );
}

export default ViewMap;
