import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import { Box } from "@mui/material";
import axiosUsers from "../../shared/axios/axios-users";
import Spinner from "../../shared/components/UI/Spinner";

function Users() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedUsers, setLoadedUsers] = useState([]);
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await axiosUsers.get("");
        console.log(response);
        setLoadedUsers(response.data.users);
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);
  return (
    <Box sx={{ height: 1 }}>
      {isLoading && <Spinner />}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </Box>
  );
}

export default Users;
