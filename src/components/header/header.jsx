import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export default function ButtonAppBar() {
  return (
   
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" style={{ "backgroundImage": "linear-gradient(to bottom , #2d939c, #68C7CF)"        
      }}>
        <Toolbar>
        <img src=" COLOCAR LOGO DA NEKI"/>
        </Toolbar>
      </AppBar>
    </Box>
   
  );
}