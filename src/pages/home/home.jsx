import React from "react";
import Navegaçao from "../../nav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accessibility from "../../components/accessibility/accessibility";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Height, WidthFull } from "@mui/icons-material";

export default function Home() {
  const { t } = useTranslation();

  console.log(t("kkk"));
  return (
    <>
      <Box sx={{ display: "flex" }} paddingTop={-10}>
        <Navegaçao />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Colocar o Accessibility dentro do HEADER */}
          {/* <Accessibility/>  */}

          <Grid container spacing="0" minHeight={160}>
          <Grid xs={12} style={{ backgroundColor: "#2D939C", height:"150px", }} justifyContent="center" alignItems="center">top</Grid>
            <Grid xs={2} style={{ backgroundColor: "#2D519C" }}>left</Grid>
            <Grid xs={8} style={{ backgroundColor: "#2D617D" }}>
              <h1>{t("Home")}</h1>
            </Grid>
            <Grid xs={2} style={{ backgroundColor: "#2D720C" }}>right</Grid>
            <Grid xs={12} style={{ backgroundColor: "#2D939C" }}>botton</Grid>
          </Grid>

          {/* <Typography paragraph>
          -------------Espaço para texto-------------
        </Typography> */}
        </Box>
      </Box>
    </>
  );
}
