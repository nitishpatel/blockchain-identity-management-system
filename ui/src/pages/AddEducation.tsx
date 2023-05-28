import * as React from "react";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  FormHelperText,
  Alert,
} from "@mui/material";

const currentYear = new Date().getFullYear();

export default function EducationProofForm() {
  const EducationProofSchema = Yup.object().shape({
    college: Yup.string().required("College is required"),
    rollno: Yup.string().required("Roll No is required"),
    startYear: Yup.string().required("Start Year is required"),
    endYear: Yup.string().required("End Year is required"),
    CGPA: Yup.string().required("CGPA is required"),
    department: Yup.string().required("Department is required"),
    degreeName: Yup.string().required("Degree Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      college: "",
      rollno: "",
      startYear: "",
      endYear: "",
      CGPA: "",
      department: "",
      degreeName: "",
    },
    validationSchema: EducationProofSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add Education Proof
        </Typography>
        <FormikProvider value={formik}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <FormLabel>College</FormLabel>
                <TextField
                  fullWidth
                  id="college"
                  type="text"
                  placeholder="Enter college"
                  {...getFieldProps("college")}
                  error={Boolean(touched.college && errors.college)}
                  helperText={touched.college && errors.college}
                />
              </Grid>
              <Grid item lg={6}>
                <FormLabel>Roll No</FormLabel>
                <TextField
                  fullWidth
                  id="rollno"
                  type="text"
                  placeholder="Enter roll no"
                  {...getFieldProps("rollno")}
                  error={Boolean(touched.rollno && errors.rollno)}
                  helperText={touched.rollno && errors.rollno}
                />
              </Grid>
              <Grid item lg={6}>
                <FormLabel>Start Year</FormLabel>
                <FormControl fullWidth>
                  <Select
                    id="startYear"
                    {...getFieldProps("startYear")}
                    error={Boolean(touched.startYear && errors.startYear)}
                  >
                    <MenuItem value="">Select start year</MenuItem>
                    {[...Array(61)].map((_, index) => {
                      const year = currentYear - index;
                      return (
                        <MenuItem key={year} value={year.toString()}>
                          {year}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>
                    {touched.startYear && errors.startYear}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item lg={6}>
                <FormLabel>End Year</FormLabel>
                <FormControl fullWidth>
                  <Select
                    id="endYear"
                    {...getFieldProps("endYear")}
                    error={Boolean(touched.endYear && errors.endYear)}
                  >
                    <MenuItem value="">Select end year</MenuItem>
                    {[...Array(61)].map((_, index) => {
                      const year = currentYear - index;
                      return (
                        <MenuItem key={year} value={year.toString()}>
                          {year}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>
                    {touched.endYear && errors.endYear}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormLabel>CGPA</FormLabel>
                <TextField
                  fullWidth
                  id="CGPA"
                  type="text"
                  placeholder="Enter CGPA"
                  {...getFieldProps("CGPA")}
                  error={Boolean(touched.CGPA && errors.CGPA)}
                  helperText={touched.CGPA && errors.CGPA}
                />
              </Grid>
              <Grid item lg={6}>
                <FormLabel>Department</FormLabel>
                <TextField
                  fullWidth
                  id="department"
                  type="text"
                  placeholder="Enter department"
                  {...getFieldProps("department")}
                  error={Boolean(touched.department && errors.department)}
                  helperText={touched.department && errors.department}
                />
              </Grid>
              <Grid item lg={6}>
                <FormLabel>Degree Name</FormLabel>
                <TextField
                  fullWidth
                  id="degreeName"
                  type="text"
                  placeholder="Enter degree name"
                  {...getFieldProps("degreeName")}
                  error={Boolean(touched.degreeName && errors.degreeName)}
                  helperText={touched.degreeName && errors.degreeName}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "row",
                alignItems: "end",
                justifyContent: "end",
              }}
            >
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Add Proof
              </Button>
            </Box>
          </Box>
        </FormikProvider>
      </Box>
    </Container>
  );
}
