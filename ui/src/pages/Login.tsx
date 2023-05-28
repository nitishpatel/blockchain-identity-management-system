import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Alert, Chip, Container, FormLabel } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useAuthState } from "../state/useAuthState";
import React from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const { login } = useAuthState();
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async ({ email, password }) => {
      try {
        console.log("check", email, password);
        const res = await login(email, password);
        navigate("/");
      } catch (e: any) {
        setError(e.message);
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://cdni.iconscout.com/illustration/premium/thumb/login-access-protection-5521140-4609600.png?f=webp)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "#cfe8fc",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

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
              <FormikProvider value={formik}>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <FormLabel>Username</FormLabel>
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

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </FormikProvider>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
