import { Avatar, Box, Card, CardHeader } from "@mui/material";

import { Link } from "react-router-dom";

function UserItem({item}) {
  return (
    <>
      <Link to= {`/${item.id}/places`} style={{ textDecoration: "none" }}>
        <Box
          sx={{
            display: "flex",
            my: 5,
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          <Card sx={{ width: 300 }}>
            <CardHeader
              avatar={
                <Avatar
                  alt="Avatar"
                  src={item.image}
                  sx={{ width: 56, height: 56 }}
                />
              }
              title={item.name}
              subheader={item.places.length}
            />
          </Card>
        </Box>
      </Link>
    </>
  );
}

export default UserItem;
