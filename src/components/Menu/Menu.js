import { useState, useEffect } from "react";
import { Global } from "@emotion/react";
import {
  Card,
  CardContent,
  Box,
  Skeleton,
  Typography,
  SwipeableDrawer,
} from "@mui/material/";
import { grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import ViewMap from "../Map/ViewMap";
import axios from "axios";

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
  useEffect(() => {
    setInterval(() => {
      axios
        .get("https://ckan2.multimediagdansk.pl/gpsPositions")
        .then((response) => {
          setVehicleData(response.data.Vehicles);
        });
    }, 10000);
  }, []);
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

  useEffect(() => {
    axios
      .get(
        "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/22313c56-5acf-41c7-a5fd-dc5dc72b3851/download/routes.json"
      )
      .then((response) => {
        let date = new Date().toISOString().slice(0, 10);
        setLineData(response.data[date].routes);
      });
  }, []);

  var found = lineData.find(function (vehicle) {
    if (vehicle.routeId == lineNumber) return true;
  });

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
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
              {open === false ? null : (
                <Card>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color='text.secondary'
                      gutterBottom>
                      Line {vehicleData[vehicleIndex].Line}
                    </Typography>
                    <Typography variant='h5' component='div'>
                      {found === undefined ? null : found.routeLongName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                      {convertDelay(vehicleData[vehicleIndex].Delay) <= 0
                        ? `No delay, Have a good, safe trip.`
                        : `Delay is
                      ${convertDelay(vehicleData[vehicleIndex].Delay)}
                      minutes`}
                    </Typography>
                    <Typography variant='body2'>
                      {`Speed ${vehicleData[vehicleIndex].Speed} km/h`}
                      <br />
                      Vehicle code is {vehicleData[vehicleIndex].VehicleCode}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default Menu;
