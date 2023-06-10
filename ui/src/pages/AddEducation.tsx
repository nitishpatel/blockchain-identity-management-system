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
  LinearProgress,
} from "@mui/material";
import { useHttpApi } from "../state/useHttpApi";
import { useAuthState } from "../state/useAuthState";
import { useSnackbar } from "notistack";

const currentYear = new Date().getFullYear();
interface College {
  _id: string;
  name: string;
}
export default function EducationProofForm() {
  const { addEducation, getColleges } = useHttpApi();
  const { user } = useAuthState();
  const [colleges, setColleges] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const fetchColleges = async () => {
      const colleges = await getColleges();
      setColleges(colleges);
    };
    fetchColleges();
  }, []);

  const EducationProofSchema = Yup.object().shape({
    college: Yup.string().required("College is required"),
    PRN: Yup.string().required("Roll No is required"),
    startYear: Yup.string().required("Start Year is required"),
    endYear: Yup.string().required("End Year is required"),
    CGPA: Yup.string().required("CGPA is required"),
    department: Yup.string().required("Department is required"),
    degreeName: Yup.string().required("Degree Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      college: "",
      PRN: "",
      startYear: "",
      endYear: "",
      CGPA: "",
      department: "",
      degreeName: "",
    },
    validationSchema: EducationProofSchema,
    onSubmit: async (values) => {
      // Handle form submission here
      console.log(values);
      const collegeName: College[] = colleges.filter(
        (college: { _id: string; name: string }) =>
          college._id === values.college
      );
      const data = {
        ...values,
        college: collegeName[0].name,
        collegeId: collegeName[0]._id,
      };

      const res = await addEducation(user._id, data);
      if (res) {
        enqueueSnackbar("Education Proof Added Successfully", {
          variant: "success",
        });
      }
      await formik.resetForm();
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      {isSubmitting && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
          <Alert severity="info">
            Please wait while we add your education proff
          </Alert>
        </Box>
      )}
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
                <FormControl fullWidth>
                  <Select
                    id="college"
                    {...getFieldProps("college")}
                    error={Boolean(touched.college && errors.college)}
                  >
                    <MenuItem value="">Select college</MenuItem>
                    {colleges.map((college: { _id: string; name: string }) => (
                      <MenuItem key={college._id} value={college._id}>
                        {college.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {touched.college && errors.college}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormLabel>Enter PRN</FormLabel>
                <TextField
                  fullWidth
                  id="PRN"
                  type="text"
                  placeholder="Enter PRN"
                  {...getFieldProps("PRN")}
                  error={Boolean(touched.PRN && errors.PRN)}
                  helperText={touched.PRN && errors.PRN}
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
