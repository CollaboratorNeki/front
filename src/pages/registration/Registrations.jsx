import React from "react";
import Navegaçao from "../../nav";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export default function Registrations() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Navegaçao />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <h1>Cadastro</h1>
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <Card sx={{ width: 600, height: 600 }}>
                                <CardContent>
                                    {/* Container flex para logo e título */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <img src="logo_url_aqui" alt="Logo" style={{ width: '50px', height: '50px' }} />
                                        <h1>Cadastros</h1>
                                    </div>
                                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <button
                                            style={{ borderColor: 'black' }}
                                            onClick={() => handleButtonClick('')}>Clientes
                                        </button>
                                        <button
                                            style={{ borderColor: 'black' }}
                                            onClick={() => handleButtonClick('')}>Tipos de Custos Extras
                                        </button>
                                        <button
                                            style={{ borderColor: 'black' }}
                                            onClick={() => handleButtonClick('')}>Tecnologia
                                        </button>
                                        <button
                                            style={{ borderColor: 'black' }}
                                            onClick={() => handleButtonClick('')}>Funçoes
                                        </button>
                                        <button
                                            style={{ borderColor: 'black' }}
                                            onClick={() => handleButtonClick('')}>Motivos de Eventos
                                        </button>
                                        <button
                                            style={{ borderColor: 'black' }}
                                            onClick={() => handleButtonClick('')}>Mensagens
                                        </button>
                                        <button
                                            style={{ borderColor: 'black' }}
                                            onClick={() => handleButtonClick('')}>ALM    
                                        </button>
                                        <button
                                            style={{ borderColor: 'black' }}
                                            onClick={() => handleButtonClick('')}>Voltar        
                                        </button>
                                    </nav>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </>

    )
}