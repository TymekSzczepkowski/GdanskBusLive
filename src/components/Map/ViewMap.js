import React from "react";
import TramIcon from "@mui/icons-material/Tram";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { Map, Overlay } from "pigeon-maps";
import { isMobile } from "react-device-detect";

import "./ViewMap.css";
function ViewMap(props) {
  return (
    <div className='map'>
      <Map
        defaultZoom={11}
        twoFingerDrag={isMobile ? true : false}
        defaultCenter={[54.372158, 18.638306]}>

        {props.vehicleData.map((item, index) => (
          <Overlay color='red' key={index} position={[item.Lat, item.Lon]}>
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
        ))}
      </Map>
    </div>
  );
}

export default ViewMap;
