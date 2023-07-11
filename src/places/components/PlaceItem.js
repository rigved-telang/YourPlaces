import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MapIcon from "@mui/icons-material/Map";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import PlaceModal from "./PlaceModal";
import DeletePlaceDialog from "./DeletePlaceDialog";
import { UserContext } from "../../shared/context/auth-context";
import axiosPlaces from "../../shared/axios/axios-places";

function PlaceItem({ place }) {
  const auth = useContext(UserContext);
  const navigate = useNavigate();
  //Map Modal States and open and close functions
  const [openMap, setOpenMap] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const handleMapOpen = () => setOpenMap(true);
  const handleMapClose = () => setOpenMap(false);

  //Delete Dialog States and open and close functions
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDialogCloseWithNo = () => {
    setOpenDeleteDialog(false);
  };

  const handleDialogCloseWithYes = () => {
    axiosPlaces(auth.token)
      .delete(`/${place.id}`)
      .then(() => {
        setRedirect(true);
        console.log("place deleted...");
      })
      .catch((err) => {
        console.log("error deleting place");
        console.log(err);
      });
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    if (redirect) {
      navigate(`/${auth.userId}/places`);
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect]);

  return (
    <Card sx={{ maxWidth: 600, my: 5 }}>
      <CardMedia
        component="img"
        alt={place.title}
        height="300"
        image={place.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="center">
          {place.title}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          color="text.secondary"
          align="center"
        >
          {place.description}
        </Typography>
        <Typography variant="subtitle1" align="center">
          {place.address}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={handleMapOpen}
          size="small"
          variant="contained"
          startIcon={<MapIcon />}
        >
          View On Map
        </Button>
        {openMap && (
          <PlaceModal
            name={place.title}
            address={place.address}
            location={place.location}
            handleClose={handleMapClose}
            open={openMap}
          />
        )}
        {auth.isLoggedIn && auth.userId === place.creator && (
          <Button size="small" variant="contained" startIcon={<EditIcon />}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/places/${place.id}`}
            >
              Edit
            </Link>
          </Button>
        )}
        {auth.isLoggedIn && auth.userId === place.creator && (
          <Button
            onClick={handleDialogOpen}
            size="small"
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        )}
        {openDeleteDialog && (
          <DeletePlaceDialog
            handleDialogCloseWithNo={handleDialogCloseWithNo}
            handleDialogCloseWithYes={handleDialogCloseWithYes}
            openDeleteDialog={openDeleteDialog}
          />
        )}
      </CardActions>
    </Card>
  );
}

export default PlaceItem;
