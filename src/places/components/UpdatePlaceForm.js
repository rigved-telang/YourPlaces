import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../shared/context/auth-context";

import * as yup from "yup";
import axiosPlaces from "../../shared/axios/axios-places";
import Spinner from "../../shared/components/UI/Spinner";

const validationSchema = yup.object({
  title: yup.string("Enter the title").required("Title is required"),
  description: yup
    .string("Enter the description")
    .required("Description is required")
    .max(100, "Description can be max 100 characters")
});

function UpdatePlaceForm({ place }) {
  const auth = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: place.title,
      description: place.description,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const postData = JSON.stringify(values);
      setIsLoading(true);
      axiosPlaces(auth.token)
        .patch(`/${place.id}`, postData)
        .then((response) => {
          setIsLoading(false);
          console.log(response.data);
          setRedirect(true);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
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

          <Button color="primary" variant="contained" fullWidth type="submit">
            UPDATE PLACE
          </Button>
        </form>
      )}
    </Box>
  );
}

export default UpdatePlaceForm;
