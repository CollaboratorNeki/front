import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Accessibility from "../accessibility/accessibility";
import './header.css'

export default function ButtonAppBar() {
  return (
   
    <Box sx={{ flexGrow: 1 }}>
     
      
      <AppBar position="absolute" style={{"backgroundImage": "linear-gradient(to bottom , #2d939c, #68C7CF"        
      }}>

        <Toolbar style={{"display":"flex","flexDirection":"row-reverse"}}>
        <Accessibility/>
        </Toolbar>
      </AppBar>
    </Box>
   
  );
}