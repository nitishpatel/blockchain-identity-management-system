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
import { useHttpApi } from "../state/useHttpApi";
import ReactDiffViewer from "react-diff-viewer";

const useStyles = makeStyles((theme: any) => ({
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
  const { getTxnUpdates } = useHttpApi();
  const [txnUpdates, setTxnUpdates] = React.useState([]);

  React.useEffect(() => {
    const fetchTxnUpdates = async () => {
      getTxnUpdates(user._id).then((res) => {
        setTxnUpdates(res);
      });
    };
    fetchTxnUpdates();
  }, [user]);

  // Sample user data

  return (
    <Container maxWidth="xl" className={classes.root}>
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

            {user &&
              user.identity &&
              user.identity.educationProofs.length > 0 && (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell> Degree </TableCell>
                      <TableCell>College</TableCell>
                      <TableCell>Start Year</TableCell>
                      <TableCell>End Year</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.identity.educationProofs.map(
                      (proof: {
                        degreeName:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                        college:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                        startYear:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                        endYear:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                      }) => (
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
                      )
                    )}
                  </TableBody>
                </Table>
              )}
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
              Employment Proof
            </Typography>

            {user &&
              user.identity &&
              user.identity.employmentProofs.length > 0 && (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell> Company Name </TableCell>
                      <TableCell>Job Title</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.identity.employmentProofs.map((proof) => (
                      <TableRow>
                        <TableCell>{proof.companyName}</TableCell>
                        <TableCell>{proof.jobTitle}</TableCell>
                        <TableCell>
                          {proof.startDate ? proof.startDate : "N/A"}
                        </TableCell>
                        <TableCell>
                          {proof.endDate ? proof.endDate : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
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
              Txn Updates
            </Typography>
            {txnUpdates && txnUpdates.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> Txn Hash </TableCell>
                    <TableCell> Time Stamp </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {txnUpdates.map(
                    (txn: { transactionId: string; timestamp: string }) => (
                      <TableRow key={txn.transactionId}>
                        <TableCell>{txn.transactionId}</TableCell>
                        <TableCell>
                          {new Date(txn.timestamp).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    )
                  )}
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
