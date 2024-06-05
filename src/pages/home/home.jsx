import React from "react";
import Navegaçao from "../../nav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accessibility from "../../components/accessibility/accessibility";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

export default function Home() {
  const { t } = useTranslation();

  console.log(t("kkk"));
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navegaçao />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Colocar o Accessibility dentro do HEADER */}
          {/* <Accessibility/>  */}

          <Grid container spacing={2}>
            <Grid xs={12} style={{ backgroundColor: "#2D939C" }}></Grid>
            <Grid xs="auto" style={{ backgroundColor: "#2D519C" }}></Grid>
            <Grid xs={8} style={{ backgroundColor: "#2D617D" }}>
              <h1>{t("Home")}</h1>
            </Grid>
            <Grid xs style={{ backgroundColor: "#2D720C" }}></Grid>
            <Grid xs={12} style={{ backgroundColor: "#2D939C" }}></Grid>
          </Grid>

          {/* <Typography paragraph>
          -------------Espaço para texto-------------
        </Typography> */}
        </Box>
      </Box>
    </>
  );
}
