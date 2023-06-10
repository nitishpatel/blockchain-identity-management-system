import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Modal,
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
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
interface UserData {
  _id: string;
  name: string;
  employmentProofs: any[];
  educationProofs: any[];
}
const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const SearchData = () => {
  const { searchUser, getUserDataByOrg } = useHttpApi();
  const { user } = useAuthState();
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [search, setSearch] = React.useState("");
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState([]);
  const [userId, setUserId] = React.useState<UserData | undefined>(undefined);

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
                                  setUserId(res);
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

        <Modal
          open={userId ? true : false}
          onClose={() => {
            setUserId(undefined);
          }}
        >
          <Box sx={style}>
            <Card>
              <CardContent>
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  User Data
                </Typography>

                <Typography variant="h5">
                  Name: {userId ? userId.name : ""}
                </Typography>
                <Divider
                  sx={{
                    my: 2,
                    backgroundColor: "black",
                  }}
                />
                <Typography variant="h6" gutterBottom>
                  Education Proof
                </Typography>
                {userId &&
                  userId.educationProofs &&
                  userId.educationProofs.length > 0 && (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell> Degree </TableCell>
                          <TableCell>College</TableCell>
                          <TableCell>Start Year</TableCell>
                          <TableCell>End Year</TableCell>
                          <TableCell>Verified</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userId.educationProofs.map(
                          (proof: {
                            verified: any;
                            id: any;
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
                              <TableCell>
                                {proof.verified ? (
                                  <Box
                                    sx={{
                                      display: "flex",

                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <CheckCircleIcon
                                      sx={{
                                        color: "green",
                                      }}
                                    />
                                    <Typography
                                      sx={{
                                        mx: 1,
                                        fontWeight: "bold",
                                      }}
                                      variant="caption"
                                    >
                                      Verified
                                    </Typography>
                                  </Box>
                                ) : (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <CancelIcon
                                      sx={{
                                        color: "red",
                                      }}
                                    />
                                    <Typography
                                      sx={{
                                        mx: 1,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Not Verified
                                    </Typography>
                                  </Box>
                                )}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  )}
                <Divider
                  sx={{
                    my: 2,
                    backgroundColor: "black",
                  }}
                />
                <Typography variant="h6" gutterBottom>
                  Employment Proof
                </Typography>

                {userId &&
                  userId.employmentProofs &&
                  userId.employmentProofs.length > 0 && (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell> Company Name </TableCell>
                          <TableCell>Job Title</TableCell>
                          <TableCell>Start Date</TableCell>
                          <TableCell>End Date</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userId.employmentProofs.map(
                          (proof: {
                            verified: boolean;
                            id: string;
                            companyName: string;
                            jobTitle: string;
                            startDate: string;
                            endDate: string;
                          }) => (
                            <TableRow>
                              <TableCell>{proof.companyName}</TableCell>
                              <TableCell>{proof.jobTitle}</TableCell>
                              <TableCell>
                                {proof.startDate ? proof.startDate : "N/A"}
                              </TableCell>
                              <TableCell>
                                {proof.endDate ? proof.endDate : "N/A"}
                              </TableCell>
                              <TableCell>
                                {proof.verified ? (
                                  <Box
                                    sx={{
                                      display: "flex",

                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <CheckCircleIcon
                                      sx={{
                                        color: "green",
                                      }}
                                    />
                                    <Typography
                                      sx={{
                                        mx: 1,
                                        fontWeight: "bold",
                                      }}
                                      variant="caption"
                                    >
                                      Verified
                                    </Typography>
                                  </Box>
                                ) : (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <CancelIcon
                                      sx={{
                                        color: "red",
                                      }}
                                    />
                                    <Typography
                                      sx={{
                                        mx: 1,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Not Verified
                                    </Typography>
                                  </Box>
                                )}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  )}
              </CardContent>
            </Card>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default SearchData;
