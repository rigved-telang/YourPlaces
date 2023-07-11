import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height:500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

function PlaceModal(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align="center" id="modal-modal-title" variant="h4" component="h2">
            {props.name}
          </Typography>
          <Typography align="center" id="modal-modal-description" sx={{ mt: 2 }}>
            {props.address}
          </Typography>
          <Box sx={{ height: "75%", mt: 2 }}>
            <iframe
              title="map"
              src={`https://maps.google.com/maps?q=${props.location.lat},${props.location.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              style={{ width: "100%", height: "100%", border: "0" }}
              allowFullScreen
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default PlaceModal;
