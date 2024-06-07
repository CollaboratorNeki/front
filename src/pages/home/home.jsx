import React, { useState } from "react";
import Navegaçao from "../../nav";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useTranslation } from "react-i18next";


import myImage from "../../assets/img/neki.png"

export default function Home() {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(true); // funcao para ajustar tela se a drawer estiver aberta ou fechada

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerWidth = 5; // Margem da drawer

  return (
    <>
      <Box sx={{ display: "flex", width: "98vw", height: "90vh" }}>
        <Navegaçao
          drawerOpen={drawerOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)`,
            marginLeft: `${drawerOpen ? drawerWidth : 0}px`,
            transition: "margin-left 0.3s ease",
          }}
        >
          <Grid container spacing={0} sx={{ width: "100%", height: "100%", alignContent:"center" }}>
            {/* GRID TOP */}
            <Grid
              xs={12}
              sx={{ backgroundColor: "", height: "150px" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            ></Grid>

            <Grid container sx={{ flexGrow: 1 }}>
              {/* GRID LEFT */}
              <Grid
                xs={1}
                // sx={{ backgroundColor: "#2D519C" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              ></Grid>

              {/*GRID CENTRAL  - CONTEUDO PRINCIPAL */}
              <Grid
                xs={10}
                // sx={{ backgroundColor: "#2D617D" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img src={myImage} alt="Home" style={{ maxWidth: "100%", height: "auto" }} />
              </Grid>

              {/* GRID DIREITA */}
              <Grid
                xs={1}
                // sx={{ backgroundColor: "#2D720C" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              ></Grid>
            </Grid>

            {/* GRID BOTTON */}
            <Grid
              xs={12}
              sx={{ backgroundColor: "", height: "150px" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            ></Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
