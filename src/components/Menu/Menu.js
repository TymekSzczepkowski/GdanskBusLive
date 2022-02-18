import { useState, useEffect } from "react";
import { Global } from "@emotion/react";
import {
  Card,
  CardContent,
  Button,
  Box,
  Skeleton,
  Typography,
  SwipeableDrawer,
} from "@mui/material/";
import { grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import { Map, Overlay } from "pigeon-maps";

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
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
  useEffect(() => {
    setInterval(() => {
      axios
        .get("https://ckan2.multimediagdansk.pl/gpsPositions")
        .then((response) => {
          setVehicleData(response.data.Vehicles);
        });
    }, 10000);
  }, []);
  console.log(vehicleData);
  const { window } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen, index) => () => {
    setOpen(newOpen);
    setVehicleIndex(index);
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
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Button>Search</Button>
      </Box>
      <Map
        height={800}
        defaultZoom={11}
        twoFingerDrag={true}
        defaultCenter={[54.372158, 18.638306]}>
        {vehicleData.map((item, index) => (
          <Overlay color='red' key={index} position={[item.Lat, item.Lon]}>
            <DirectionsBusIcon
              value={index}
              color={iconColorizer(item.Delay)}
              fontSize='large'
              onClick={toggleDrawer(true, index)}
            />
          </Overlay>
        ))}
      </Map>
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
                      Brętowo PKM - Nowy Port Zajezdnia
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                      {convertDelay(vehicleData[vehicleIndex].Delay) <= 0
                        ? `No delay, Have a good, safe trip.`
                        : `Delay is
                      ${convertDelay(vehicleData[vehicleIndex].Delay)}
                      minutes`}
                    </Typography>
                    <Typography variant='body2'>
                      Zapierdala jak pershing
                      <br />
                      {`Speed ${vehicleData[vehicleIndex].Speed} km/h`}
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
