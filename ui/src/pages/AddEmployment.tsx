import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  FormLabel,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { useHttpApi } from "../state/useHttpApi";
import { useAuthState } from "../state/useAuthState";

const EmploymentProofForm = () => {
  const { addEmployment, getCompanies } = useHttpApi();
  const { user } = useAuthState();
  const [companies, setCompanies] = React.useState([]);

  React.useEffect(() => {
    const fetchCompanies = async () => {
      const companies = await getCompanies();
      setCompanies(companies);
    };
    fetchCompanies();
  }, []);
  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("Company Name is required"),
    jobTitle: Yup.string().required("Job Title is required"),
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().nullable(),
    employeeId: Yup.string().required("Employee ID is required"),
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      jobTitle: "",
      startDate: "",
      endDate: null,
      employeeId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
      console.log(values);
      const collegeName = companies.filter(
        (college: { _id: string; name: string }) =>
          college._id === values.companyName
      );
      const data = {
        ...values,
        companyName: collegeName[0].name,
        companyId: collegeName[0]._id,
      };
      await addEmployment(user._id, data);
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldProps,
  } = formik;

  return (
    <Container component="main" maxWidth="xs">
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
          Add Employment Proof
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormLabel>College</FormLabel>
              <FormControl fullWidth>
                <Select
                  id="companyName"
                  {...getFieldProps("companyName")}
                  error={Boolean(touched.companyName && errors.companyName)}
                >
                  <MenuItem value="">Select college</MenuItem>
                  {companies.map((college: { _id: string; name: string }) => (
                    <MenuItem key={college._id} value={college._id}>
                      {college.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.companyName && errors.companyName}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="jobTitle"
                name="jobTitle"
                label="Job Title"
                value={values.jobTitle}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.jobTitle && errors.jobTitle)}
                helperText={touched.jobTitle && errors.jobTitle}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="startDate"
                name="startDate"
                label="Start Date"
                value={values.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.startDate && errors.startDate)}
                helperText={touched.startDate && errors.startDate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="endDate"
                name="endDate"
                label="End Date (Optional)"
                value={values.endDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.endDate && errors.endDate)}
                helperText={touched.endDate && errors.endDate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="employeeId"
                name="employeeId"
                label="Employee ID"
                value={values.employeeId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.employeeId && errors.employeeId)}
                helperText={touched.employeeId && errors.employeeId}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Proof
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EmploymentProofForm;
