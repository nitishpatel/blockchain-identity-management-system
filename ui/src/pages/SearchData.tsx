import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect } from "react";
import { useHttpApi } from "../state/useHttpApi";
import { useAuthState } from "../state/useAuthState";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { tableCellClasses } from "@mui/material/TableCell";

const SearchData = () => {
  const { searchUser, getUserDataByOrg } = useHttpApi();
  const { user } = useAuthState();
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [search, setSearch] = React.useState("");
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState([]);
  const [userId, setUserId] = React.useState("");

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  return (
    <>
      <Container maxWidth="lg">
        <h1>Searh Data</h1>
        {error && (
          <Alert
            sx={{
              mb: 2,
            }}
            severity="error"
          >
            {error}
          </Alert>
        )}
        {/* Create a UI to search for the user and do an api call for the samne */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <TextField onChange={(e) => setSearch(e.target.value)}>
            <option value="">Search User</option>
          </TextField>
          <LoadingButton
            sx={{
              mx: 2,
              height: "60px",
              width: "200px",
            }}
            size="large"
            variant="contained"
            color="primary"
            loading={loading}
            onClick={async () => {
              try {
                setLoading(true);
                const res = await searchUser(search);
                console.log(res);
                setData(res);
              } catch (err) {
                console.log(err);
                setError(err.response.data.error);
              } finally {
                setLoading(false);
              }
            }}
          >
            Search Data
          </LoadingButton>
        </Box>
        {data.length > 0 && (
          <Box
            sx={{
              mt: 2,
            }}
          >
            <Divider />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              Search Results
            </Typography>
            <Grid container>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                      <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((userData) => {
                      return (
                        <TableRow>
                          <StyledTableCell>{userData.name}</StyledTableCell>
                          <StyledTableCell>{userData.email}</StyledTableCell>
                          <StyledTableCell>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={async () => {
                                try {
                                  const res = await getUserDataByOrg(
                                    userData._id,
                                    user._id
                                  );
                                  console.log(res);
                                } catch (err) {
                                  console.log(err);
                                  setError(err.response.data.error);
                                }
                              }}
                            >
                              View
                            </Button>
                          </StyledTableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
};

export default SearchData;
