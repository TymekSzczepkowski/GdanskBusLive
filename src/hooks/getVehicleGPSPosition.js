import axios from "axios";
function getVehicleGPSPositon(setVehicleData) {
  setInterval(() => {
    axios
      .get("https://ckan2.multimediagdansk.pl/gpsPositions")
      .then((response) => {
        setVehicleData(response.data.Vehicles);
      });
  }, 10000);
}

export default getVehicleGPSPositon;
