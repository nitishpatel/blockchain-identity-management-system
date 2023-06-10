import { Box, Button, Container, Select, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useHttpApi } from "../state/useHttpApi";
import { useAuthState } from "../state/useAuthState";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
const ShareData = () => {
  const [organizationID, setOrganizationID] = React.useState("");
  const [organizations, setOrganizations] = React.useState([]);
  const { getOrganization, shareData } = useHttpApi();
  const { user } = useAuthState();
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchOrganizations = async () => {
      getOrganization().then((res) => {
        setOrganizations(res);
      });
    };
    fetchOrganizations();
  }, []);
  return (
    <>
      <Container maxWidth="lg">
        <h1>Share Data</h1>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Select
            native
            value={organizationID}
            onChange={(e) => setOrganizationID(e.target.value)}
            inputProps={{
              name: "organization",
              id: "organization",
            }}
          >
            <option value="">Select Organization</option>
            {organizations.map((organization) => (
              <option value={organization._id}>{organization.name}</option>
            ))}
          </Select>
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
                if (!organizationID) {
                  enqueueSnackbar("Please select an organization", {
                    variant: "error",
                  });
                  setLoading(false);
                  return;
                }

                const res = await shareData(user._id, organizationID);
                if (res) {
                  enqueueSnackbar("Data shared successfully", {
                    variant: "success",
                  });
                } else {
                  enqueueSnackbar("Something went wrong", {
                    variant: "error",
                  });
                }
                setLoading(false);
              } catch (e) {
                enqueueSnackbar("Something went wrong", {
                  variant: "error",
                });
                setLoading(false);
              }
            }}
          >
            <Typography variant="h6">Share</Typography>
          </LoadingButton>
        </Box>
      </Container>
    </>
  );
};

export default ShareData;
