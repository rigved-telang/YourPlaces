import { Paper } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from "yup";
import { UserContext } from "../../shared/context/auth-context";

import axiosUsers from "../../shared/axios/axios-users";
import Spinner from "../../shared/components/UI/Spinner";

const validationSchema = yup.object({
  name: yup.string("Enter the name").required("Name is required"),
  email: yup
    .string("Enter the email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter password")
    .min(6, "Password should be min 6 characters of length")
    .required("Password is required"),
});

function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const postData = JSON.stringify(values);
      setIsLoading(true);
      axiosUsers
        .post("signup", postData)
        .then((response) => {
          setIsLoading(false);
          console.log(response.data);
          console.log(`User ID is: ${response.data.userId}`);
          auth.login(response.data.userId, response.data.token.token);
        })
        .catch((err) => {
          setIsLoading(false);
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
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
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
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            SIGN UP
          </Button>
        </form>
      </Box>
    </Paper>
  );
}

export default SignUpPage;
