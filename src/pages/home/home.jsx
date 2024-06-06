import React, { useState } from "react";
import Navegaçao from "../../nav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accessibility from "../../components/accessibility/accessibility";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Home() {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(true); // funcao para ajustar tela se a drawer estiver aberta ou fechada

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerWidth = 5; // Margem da drawer

  return (
    <>
      <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
        <Navegaçao drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />

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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginBottom: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Grid container spacing={0} sx={{ width: "100%", height: "100%" }}>
            {/* GRID TOP */}
            <Grid xs={12} sx={{ backgroundColor: "#2D939C", height: "150px" }} display="flex" justifyContent="center" alignItems="center"> 
              </Grid>

            <Grid container sx={{ flexGrow: 1 }}>
              {/* GRID LEFT */}
              <Grid xs={1} sx={{ backgroundColor: "#2D519C" }} display="flex" justifyContent="center" alignItems="center">
                </Grid>

                {/*GRID CENTRAL  - CONTEUDO PRINCIPAL */}
              <Grid xs={10} sx={{ backgroundColor: "#2D617D" }} display="flex" justifyContent="center" alignItems="center">
                <h1>{t("Home")}</h1>
              </Grid>

              {/* GRID DIREITA */}
              <Grid xs={1} sx={{ backgroundColor: "#2D720C" }} display="flex" justifyContent="center" alignItems="center">
                  </Grid>

            </Grid>

            {/* GRID BOTTON */}
            <Grid xs={12} sx={{ backgroundColor: "#2D939C", height: "150px" }} display="flex" justifyContent="center" alignItems="center">
              
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
