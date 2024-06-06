// components/BasicModal/BasicModal.jsx
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack"; // Importar Stack para layout dos botões
import { borderRadius } from "@mui/system";

// Estilo do modal
const style = {
  position: "absolute", // Posição absoluta para centralizar o modal na tela
  top: "50%", // Centralizar verticalmente
  left: "50%", // Centralizar horizontalmente
  transform: "translate(-50%, -50%)", // Ajustar para centralizar completamente
  width: 447, // Largura do modal
  height: 806, // Altura do modal
  borderRadius: "10px",
  bgcolor: "background.paper", // Cor de fundo do modal
  border: "2px solid #000", // Borda do modal
  boxShadow: 24, // Sombra do modal
  p: 4, // Padding interno do modal
  
 };

export default function BasicModal({ modalOpen, setModalOpen }) {
   // Função para fechar o modal
  const handleClose = () => setModalOpen(false);

  return (
    <div>
      <Modal
        open={modalOpen} // Estado que controla se o modal está aberto ou fechado
        onClose={handleClose} // Função para fechar o modal quando o usuário clicar fora dele
        aria-labelledby="modal-modal-title" // ID do elemento que descreve o título do modal
        aria-describedby="modal-modal-description" // ID do elemento que descreve o conteúdo do modal
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: "24px", mt: 5, mb: 8}}>
            Cadastros
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            {/* Aqui ficam os cadastros. */}
          </Typography>
          {/* Início da seção modificada */}
          <Stack spacing={4}>
            <Button variant="contained" color="primary" onClick={handleClose} sx={{'&:hover': {backgroundColor: '#fff', color: '#3c52b2'}, borderRadius: "2px", backgroundColor: "#FAFAF9", color: "#57534E", height: "38px", fontSize: "28px", textTransform: "none"}}>
              Clientes
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose} sx={{ '&:hover': {backgroundColor: '#fff', color: '#3c52b2'}, borderRadius: "2px", backgroundColor: "#FAFAF9", color: "#57534E", height: "38px", fontSize: "28px", textTransform: "none"}}>
              Tipos de Custos Extras
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose} sx={{'&:hover': {backgroundColor: '#fff', color: '#3c52b2'},  borderRadius: "2px", backgroundColor: "#FAFAF9", color: "#57534E", height: "38px", fontSize: "28px", textTransform: "none"}}>
              Tecnologia
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose} sx={{'&:hover': {backgroundColor: '#fff', color: '#3c52b2'},  borderRadius: "2px", backgroundColor: "#FAFAF9", color: "#57534E", height: "38px", fontSize: "28px", textTransform: "none"}}>
              Funções
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose} sx={{'&:hover': {backgroundColor: '#fff', color: '#3c52b2'},  borderRadius: "2px", backgroundColor: "#FAFAF9", color: "#57534E", height: "38px", fontSize: "28px", textTransform: "none"}}>
              Motivos de Eventos
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose} sx={{'&:hover': {backgroundColor: '#fff', color: '#3c52b2'},  borderRadius: "2px", backgroundColor: "#FAFAF9", color: "#57534E", height: "38px", fontSize: "28px", textTransform: "none"}}>
              Mensagens
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose} sx={{'&:hover': {backgroundColor: '#fff', color: '#3c52b2'},  borderRadius: "2px", backgroundColor: "#FAFAF9", color: "#57534E", height: "38px", fontSize: "28px", textTransform: "none"}}>
              ALM
            </Button>
          </Stack>
          {/* Fim da seção modificada */}
        </Box>
      </Modal>
    </div>
  );
}
