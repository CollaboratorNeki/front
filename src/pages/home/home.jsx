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
      <Box sx={{ display: "flex", flexDirection: "column", width: "100vw", height: "100vh" }} paddingTop={-10}>
        <Navegaçao />
        <Box component="main" sx={{ flexGrow: 1, width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
          <Grid container spacing={0} sx={{ width: "100%", height: "100%" }}>
            <Grid xs={12} sx={{ backgroundColor: "#2D939C", height: "150px" }} display="flex" justifyContent="center" alignItems="center">
              top
            </Grid>
            <Grid container sx={{ flexGrow: 1 }}>
              <Grid xs={2} sx={{ backgroundColor: "#2D519C" }} display="flex" justifyContent="center" alignItems="center">
                left
              </Grid>
              <Grid xs={8} sx={{ backgroundColor: "#2D617D" }} display="flex" justifyContent="center" alignItems="center">
                <h1>{t("Home")}</h1>
              </Grid>
              <Grid xs={2} sx={{ backgroundColor: "#2D720C" }} display="flex" justifyContent="center" alignItems="center">
                right
              </Grid>
            </Grid>
            <Grid xs={12} sx={{ backgroundColor: "#2D939C", height: "150px" }} display="flex" justifyContent="center" alignItems="center">
              bottom
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
