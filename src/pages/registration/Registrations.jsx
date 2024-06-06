import React, { useState } from "react";
import Navegaçao from "../../nav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useTranslation } from "react-i18next";
import NewTask from "../newTask/NewTask";
import BasicModal from "../../components/BasicModal/BasicModal";

export default function Registrations() {
  //Função para chamar a tradução
  const { t } = useTranslation();

//******************************************************** INICIO OPEN DRAWER */
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const drawerWidth = 5; // Margem da drawer

//******************************************************** FIM OPEN DRAWER */

  return (
    <>
    
      <Box sx={{ display: "flex" }}>
        <Navegaçao
//*****OPEN DRAWER
          drawerOpen={drawerOpen}
          handleDrawerToggle={handleDrawerToggle}
//*****OPEN DRAWER
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          
          <Grid container spacing={1}>
            {/* <Grid item xs={8}>
              <Card sx={{ width: 600, height: 600 }}>
                <CardContent>
               
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src="logo_url_aqui"
                      alt="Logo"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <h1>{t("Cadastros")}</h1>
                  </div>
                  <nav
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <button
                      style={{ borderColor: "black" }}
                      onClick={() => handleButtonClick("")}
                    >
                      {t("Clientes")}
                    </button>
                    <button
                      style={{ borderColor: "black" }}
                      onClick={() => handleButtonClick("")}
                    >
                      {t("Tipos de Custos Extras")}
                    </button>
                    <button
                      style={{ borderColor: "black" }}
                      onClick={() => handleButtonClick("")}
                    >
                      {t("Tecnologia")}
                    </button>
                    <button
                      style={{ borderColor: "black" }}
                      onClick={() => handleButtonClick("")}
                    >
                      {t("Funções")}
                    </button>
                    <button
                      style={{ borderColor: "black" }}
                      onClick={() => handleButtonClick("")}
                    >
                      {t("Motivos de Eventos")}
                    </button>
                    <button
                      style={{ borderColor: "black" }}
                      onClick={() => handleButtonClick("")}
                    >
                      {t("Mensagens")}
                    </button>
                    <button
                      style={{ borderColor: "black" }}
                      onClick={() => handleButtonClick("")}
                    >
                      {t("ALM")}
                    </button>
                    <button
                      style={{ borderColor: "black" }}
                      onClick={() => handleButtonClick("")}
                    >
                      {t("Voltar")}
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>
        </Box>
        <BasicModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
      </Box>
    </>
  );
}
