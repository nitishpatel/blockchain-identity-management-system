import * as React from "react";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", flex: 1, position: "relative" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
