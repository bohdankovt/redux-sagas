import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid, IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { UsersService } from "./services/users";
import { action, useTypedSelector } from "./store";
import { useSelector } from "react-redux";
import {Close} from "@mui/icons-material";
import {idID} from "@mui/material/locale";

function App() {
  const handleFetchUsers = () => action("FETCH_USERS");
  const handleFetchUsersWithDelay = () => action("FETCH_USERS_WITH_DELAY");
  const handleFetchUsersWithError = () => action("FETCH_USERS_WITH_ERROR");
  const deleteUser = (id: any) => action("DELETE_USER", id)

  const { data, isLoading, error } = useTypedSelector((state) => state.users);

  return (
    <Stack spacing={3}>
      <Grid container justifyContent={"center"}>
        <Stack direction={"row"} spacing={2}>
          <Button variant={"contained"} onClick={handleFetchUsers}>
            Fetch Users
          </Button>
          <Button variant={"contained"} onClick={handleFetchUsersWithDelay}>
            Fetch Users With Delay
          </Button>
          <Button
            color={"error"}
            variant={"contained"}
            onClick={handleFetchUsersWithError}
          >
            Fetch Users with error
          </Button>
        </Stack>
      </Grid>
      <Grid container justifyContent={"center"}>
        {isLoading && <CircularProgress />}
        {!!error && <Alert color={"error"}>{error}</Alert>}
      </Grid>
      {!!data.length && (
        <Stack spacing={3}>
          {data.map((user) => (
            <Card key={user.id} component={Stack} alignItems={"center"} direction={"row"} p={1.5} justifyContent={"space-between"}>
                <Typography>{user.name}</Typography>
              <IconButton onClick={() => deleteUser(user.id)} disabled={isLoading}>
                <Close/>
              </IconButton>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default App;
