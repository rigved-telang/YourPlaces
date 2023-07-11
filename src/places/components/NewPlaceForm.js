import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import Spinner from "../../shared/components/UI/Spinner";
import axiosPlaces from "../../shared/axios/axios-places";
import { UserContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  title: yup.string("Enter the title").required("Title is required"),
  description: yup
    .string("Enter the description")
    .required("Description is required")
    .max(100, "Description can be max 100 characters"),
  address: yup
    .string("Enter address")
    .required("Address is required")
    .max(200, "Address can be max 200 characters"),
});

function NewPlaceForm() {
  const auth = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const postData = JSON.stringify(values);
      setIsLoading(true);
      axiosPlaces(auth.token)
        .post("/", postData)
        .then((response) => {
          setIsLoading(false);
          console.log(response.data);
          setRedirect(true);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("Posting new place error" + err);
        });
    },
  });

  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect]);

  return (
    <Box sx={{ padding: 2 }}>
      {isLoading && <Spinner />}
      {!isLoading && (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="dense"
            id="title"
            name="title"
            label="Title"
            variant="outlined"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            margin="dense"
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            fullWidth
            margin="dense"
            id="address"
            name="address"
            label="Address"
            variant="outlined"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            ADD PLACE
          </Button>
        </form>
      )}
    </Box>
  );
}

export default NewPlaceForm;
