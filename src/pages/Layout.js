import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import SearchAppBar from "../components/SearchAppBar";

function Layout() {
  return (
    <>
      <SearchAppBar />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
    </>
  );
}

export default Layout;
