import { Paper } from "@mui/material";
import UpdatePlaceForm from "../components/UpdatePlaceForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosPlaces from "../../shared/axios/axios-places";
import Spinner from "../../shared/components/UI/Spinner";


function UpdatePlace() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedPlace, setLoadedPlace] = useState([]);
  const placeId = useParams().placeId;

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPlaces().get(`/${placeId}`);
        console.log(response);
        setLoadedPlace(response.data.place);
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, [placeId]);

  return (
    <Paper sx={{ m: 2 }} elevation={3}>
      {isLoading && <Spinner />}
      {!isLoading && <UpdatePlaceForm place={loadedPlace} />}
    </Paper>
  );
}

export default UpdatePlace;
