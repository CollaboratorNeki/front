import React, { useState } from "react";
import Navegaçao from "../../nav";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useTranslation } from "react-i18next";
import AlmTable from "../../components/Tables/AlmTable";




export default function Alm() {
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
         
         

            <Grid container sx={{ flexGrow: 1 }}>
            

              {/*GRID CENTRAL  - CONTEUDO PRINCIPAL */}
              <Grid
                xs={15}
                display="flex"
                
                justifyContent="center"
                alignItems="center"
              >
                <AlmTable/>
              </Grid>

          
            
            </Grid>

         
          
          </Grid>
        </Box>
      </Box>
    </>
  );
}
