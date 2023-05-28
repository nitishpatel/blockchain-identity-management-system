import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useFormik, FormikProvider, Formik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useHttpApi } from "../state/useHttpApi";

export default function SignUp() {
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const { signUp } = useHttpApi();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required"),
    role: Yup.string().required("Role is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async ({ email, password, name, role }) => {
      try {
        console.log("check", email, password);
        const res = await signUp({
          email,
          password,
          name,
          role,
        });
        navigate("/");
      } catch (e: any) {
        setError(e.message);
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <FormikProvider value={formik}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {error && (
                  <Alert
                    sx={{
                      width: "100%",
                      px: 2,
                      mx: 2,
                    }}
                    severity="error"
                  >
                    {error}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Name</FormLabel>
                <TextField
                  fullWidth
                  autoComplete="name"
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>

              <Grid item xs={12}>
                <FormLabel>Email</FormLabel>
                <TextField
                  fullWidth
                  autoComplete="email"
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Password</FormLabel>
                <TextField
                  fullWidth
                  autoComplete="password"
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  {...getFieldProps("password")}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Reward Frequency</FormLabel>
                <FormControl
                  size="small"
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 1.5 }}
                >
                  <Select
                    inputProps={{ "aria-label": "Without label" }}
                    {...getFieldProps("role")}
                    id="role"
                    error={Boolean(touched.role && errors.role)}
                  >
                    <MenuItem value="0">Individual</MenuItem>
                    <MenuItem value="1">University</MenuItem>
                    <MenuItem value="2">Organization</MenuItem>
                  </Select>
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {touched.role && errors.role}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </FormikProvider>
      </Box>
    </Container>
  );
}
