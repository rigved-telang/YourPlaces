import { Box } from "@mui/material";
import UserItem from "./UserItem";

function UsersList(props) {
  if (props.items.length === 0) {
    return <h2>No users found</h2>;
  }

  return (
    <>
      <Box sx={{paddingTop: 2}}>
        {props.items.map((item) => (
          <UserItem item={item} key={item.id} />
        ))}
      </Box>
    </>
  );
}

export default UsersList;
