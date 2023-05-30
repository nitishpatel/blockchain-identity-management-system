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
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAuthState } from "../state/useAuthState";
import { useHttpApi } from "../state/useHttpApi";

const useStyles = makeStyles((theme: any) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const EducationApprovals = () => {
  const classes = useStyles();
  const { user } = useAuthState();
  const { getApprovals, approveEducation } = useHttpApi();
  const [approvalsUpdates, setapprovalsUpdates] = React.useState([]);

  React.useEffect(() => {
    const fetchapprovalsUpdates = async () => {
      getApprovals(user._id).then((res) => {
        setapprovalsUpdates(res);
      });
    };
    fetchapprovalsUpdates();
  }, [user]);

  // Sample user data

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Requests for Approval
      </Typography>
      {JSON.stringify(approvalsUpdates)}
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
            {approvalsUpdates && approvalsUpdates.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {approvalsUpdates.map(
                    (txn: { proofId: string; candidateId: string }) => (
                      <TableRow key={txn.proofId}>
                        <TableCell>{txn.proofId}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={async () => {
                              await approveEducation(
                                txn.candidateId,
                                txn.proofId
                              );
                              alert("Approved");
                            }}
                          >
                            <Typography variant="h6">Approve</Typography>
                          </Button>
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

export default EducationApprovals;
