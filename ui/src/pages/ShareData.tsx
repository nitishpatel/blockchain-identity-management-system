import { Box, Button, Container, Select, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useHttpApi } from "../state/useHttpApi";
import { useAuthState } from "../state/useAuthState";

const ShareData = () => {
  const [organizationID, setOrganizationID] = React.useState("");
  const [organizations, setOrganizations] = React.useState([]);
  const { getOrganization, shareData } = useHttpApi();
  const { user } = useAuthState();
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
          <Button
            sx={{
              mx: 2,
              height: "60px",
              width: "200px",
            }}
            size="large"
            variant="contained"
            color="primary"
            onClick={async () => {
              try {
                if (!organizationID) {
                  alert("Please select an organization");
                  return;
                }

                const res = await shareData(user._id, organizationID);
                if (res) {
                  alert("Data shared successfully");
                } else {
                  alert("Something went wrong");
                }
              } catch (e) {
                alert("Something went wrong while sharing data" + e.message);
              }
            }}
          >
            <Typography variant="h6">Share</Typography>
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ShareData;
