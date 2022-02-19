import React from "react";
import { Card, CardContent, Typography } from "@mui/material/";
function VehicleCard(vehicleData, vehicleIndex, found, convertDelay) {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
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
  );
}

export default VehicleCard;
