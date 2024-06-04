import React from "react";
import Navegaçao from "../../nav";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function About() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Navegaçao />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <h1>About</h1>
                </Box>
            </Box>

        </>

    )
}