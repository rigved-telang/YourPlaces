import { Paper, Typography } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../shared/context/auth-context";
import axiosUsers from "../../shared/axios/axios-users";
import Spinner from "../../shared/components/UI/Spinner";

const validationSchema = yup.object({
  email: yup
    .string("Enter the email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter password").required("Password is required"),
});

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const postData = JSON.stringify(values);
      setIsLoading(true);
      axiosUsers
        .post("login", postData)
        .then((response) => {
          setIsLoading(false);
          auth.login(response.data.userId, response.data.token);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("Inside login catch block");
          console.log(err);
        });
    },
  });

  return (
    <Paper sx={{ m: 2 }} elevation={3}>
      {isLoading && <Spinner />}
      <Box sx={{ padding: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="dense"
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="dense"
            id="password"
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            LOG IN
          </Button>
        </form>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignContent="center"
        justifyContent="center"
      >
        <Typography mr={1} variant="subtitle1">
          New to YourPlaces?
        </Typography>
        <Typography variant="subtitle1">
          <Link
            style={{ textDecoration: "none", color: "#002884" }}
            to="/signup"
          >
            SignUp
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
}

export default LoginPage;
