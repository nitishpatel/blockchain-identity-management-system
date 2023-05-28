import React from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Tab,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuthState } from "../state/useAuthState";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const DashboardPage = () => {
  const classes = useStyles();
  const { user } = useAuthState();

  // Sample user data

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Dashboard
      </Typography>
      <Grid container justifyContent="center">
        <Grid item lg={12} sm={6}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              User Details
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Name:</strong> {user.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Role:</strong>{" "}
              {(() => {
                switch (user.role) {
                  case 0:
                    return "Individual";
                  case "1":
                    return "Organization";
                  case "2":
                    return "Government";
                  default:
                    return "Unknown";
                }
              })()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="center"
        sx={{
          marginTop: 4,
        }}
      >
        <Grid item lg={12} sm={6}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Education Proof
            </Typography>

            {user && user.identity.educationProofs && (
              <Table>
                <TableHead>
                  <TableCell> Degree </TableCell>
                  <TableCell>College</TableCell>
                  <TableCell>Start Year</TableCell>
                  <TableCell>End Year</TableCell>
                </TableHead>
                <TableBody>
                  {user.identity.educationProofs.map((proof) => (
                    <TableRow>
                      <TableCell>{proof.degreeName}</TableCell>
                      <TableCell>{proof.college}</TableCell>
                      <TableCell>
                        {proof.startYear ? proof.startYear : "N/A"}
                      </TableCell>
                      <TableCell>
                        {proof.endYear ? proof.endYear : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Paper>
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

export default DashboardPage;
