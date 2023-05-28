import { Outlet, useLocation } from "react-router-dom";
import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { Typography } from "@mui/material";
import { useAuthState } from "../state/useAuthState";
import useMediaQuery from "@mui/material/useMediaQuery";
const drawerWidth = 240;

const AdminLayout = () => {
  const location = useLocation();
  const { user } = useAuthState();

  return (
    <>
      <Navbar useDrawer={true} />
      <Box sx={{ display: "flex", flex: 1, position: "relative" }}>
        {/* <CssBaseline /> */}

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#293241",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar
            children={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Box
                  component="img"
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.email}`}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    objectFit: "cover",
                    mr: 2,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                  noWrap
                  component="div"
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  noWrap
                  component="div"
                  sx={{
                    color: "#fff",
                  }}
                >
                  {user?.email}
                </Typography>
              </Box>
            }
          />
          <Divider />
          <SideBar location={location} />
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
          {/* <Toolbar /> */}
        </Box>
        {/* <Footer /> */}
      </Box>
    </>
  );
};

export default AdminLayout;
