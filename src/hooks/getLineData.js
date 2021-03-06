import axios from "axios";
function getLineData(setLineData) {
  axios
    .get(
      "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/22313c56-5acf-41c7-a5fd-dc5dc72b3851/download/routes.json"
    )
    .then((response) => {
      let date = new Date().toISOString().slice(0, 10);
      setLineData(response.data[date].routes);
    });
}

export default getLineData;
