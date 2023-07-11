import { Box } from "@mui/system";
import PlaceItem from "./PlaceItem";

function PlaceList({places}) {
  if (places.length === 0) {
    return <h2>No places found</h2>;
  }

  return (
    <Box>
    {places.map((place) => (
      <PlaceItem place={place} key={place.id} />
    ))}
  </Box>
    );
}

export default PlaceList;