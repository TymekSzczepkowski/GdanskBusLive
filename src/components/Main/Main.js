import { useState, useEffect } from "react";
import { Global } from "@emotion/react";
import { Box, Skeleton, Typography, SwipeableDrawer } from "@mui/material/";
import { grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import ViewMap from "../Map/ViewMap";
import Popup from "../Popup/Popup";
import VehicleCard from "../VehicleCard/VehicleCard";
import getVehicleGPSPositon from "../../hooks/getVehicleGPSPosition";
import getLineData from "../../hooks/getLineData";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function Menu(props) {
  const [vehicleIndex, setVehicleIndex] = useState();
  const [vehicleData, setVehicleData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [lineNumber, setLineNumber] = useState([]);

  const { window } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen, index, line) => () => {
    setOpen(newOpen);
    setVehicleIndex(index);
    setLineNumber(line);
  };
  const convertDelay = (delay) => {
    if (delay < 0) return 0;
    return Math.floor(delay / 60) + "." + (delay % 60 ? delay % 60 : "00");
  };
  const iconColorizer = (delay) => {
    if (convertDelay(delay) >= 3.0) return "error";
    else if (convertDelay(delay) > 1 && convertDelay(delay) < 3)
      return "warning";
    else return "success";
  };

  let found = lineData.find(function (vehicle) {
    if (vehicle.routeId == lineNumber) return true;
  });

  useEffect(() => {
    getVehicleGPSPositon(setVehicleData);
  }, []);

  useEffect(() => {
    getLineData(setLineData);
  }, []);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <Popup />
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <ViewMap
        vehicleData={vehicleData}
        toggleDrawer={toggleDrawer}
        iconColorizer={iconColorizer}></ViewMap>
      <SwipeableDrawer
        container={container}
        anchor='bottom'
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        ModalProps={{
          keepMounted: true,
        }}>
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}>
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            {vehicleData.length} results
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}>
          {!vehicleData === [] ? (
            <Skeleton variant='rectangular' height='100%' />
          ) : (
            <>
              {open === false
                ? null
                : VehicleCard(vehicleData, vehicleIndex, found, convertDelay)}
            </>
          )}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default Menu;
