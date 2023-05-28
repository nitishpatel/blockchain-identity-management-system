import React from "react";
import { Container, Typography, Grid, Button, Box } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(4),
  },
  subtitle: {
    marginBottom: theme.spacing(4),
  },
  buttonContainer: {
    marginTop: theme.spacing(4),
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography
        variant="h2"
        component="h1"
        align="center"
        gutterBottom
        className={classes.title}
      >
        Blockchain-based Identity Management System
      </Typography>
      <Typography variant="h5" align="center" className={classes.subtitle}>
        A secure and decentralized solution for managing identities using
        blockchain technology.
      </Typography>
      <Grid
        container
        justifyContent="center"
        className={classes.buttonContainer}
      >
        <Grid
          item
          sx={{
            marginRight: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Learn More
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>
        </Grid>
      </Grid>
      <Box mt={8}>
        <Typography variant="body2" align="center">
          © 2023 Your Company. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
