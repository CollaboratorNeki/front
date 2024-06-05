import React from "react";
import Navegaçao from "../../nav";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accessibility from "../../components/accessibility/accessibility";
import { useTranslation } from 'react-i18next'




export default function Home() {

    const {t} = useTranslation();

    console.log(t('kkk'))
    return (
        <>
       
            <Box sx={{ display: 'flex' }}>
                <Navegaçao />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h1>{t('Home')}</h1>
                    {/* <Typography paragraph>
          -------------Espaço para texto-------------
        </Typography> */}

                </Box>
            </Box>

        </>

    )
}