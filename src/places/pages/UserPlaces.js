import { useContext, useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import axiosPlaces from "../../shared/axios/axios-places";
import Spinner from "../../shared/components/UI/Spinner";
import { UserContext } from "../../shared/context/auth-context";

function UserPlaces(props) {
  const auth = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const userId = useParams().userId;

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPlaces(auth.token).get(`/user/${userId}`);
        console.log(response);
        setLoadedPlaces(response.data.places);
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, [auth.token, userId]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && <PlaceList places={loadedPlaces} />}
    </>
  );
}

export default UserPlaces;
