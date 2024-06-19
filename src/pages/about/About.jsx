import React, { useState } from "react";
import Navegaçao from "../../nav";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useTranslation } from "react-i18next";
import EnhancedTable from "../../components/table"
import myImage from "../../assets/img/neki.png"
import { Typography } from "@mui/material";
import { getAllEventReason } from "../../services/eventReason";

export default function Home() {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(true); // funcao para ajustar tela se a drawer estiver aberta ou fechada

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerWidth = 5; // Margem da drawer

  return (
    <>
      <div>
       
              <input type="text" placeholder="Teste requisição" />
              <button onClick={async(e) => {await getAllEventReason()}}>Teste 2</button>
           
          </div>
    </>
  );
}
