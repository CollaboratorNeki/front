import React from "react";
import Navegaçao from "../../nav";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from "react";

export default function Settings() {
    const [drawerOpen, setDrawerOpen] = useState(true); // funcao para ajustar tela se a drawer estiver aberta ou fechada

    const handleDrawerToggle = () => {
      setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
            <Navegaçao
          drawerOpen={drawerOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <h1>Settings</h1>

                </Box>
            </Box>

        </>

    )
}