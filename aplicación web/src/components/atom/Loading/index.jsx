import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
  return (
    <Box sx={{ display: "flex", alignContent: "center" ,justifyContent:"center"}}>
      <CircularProgress />
    </Box>
  );
}
