import React from "react";
import { Modal, Button, Typography } from 'antd'; // Importa componentes necessários do Ant Design
import { useNavigate } from 'react-router-dom'; // Hook para navegação programática
import Logo from '../../assets/img/logo.png'; // Importa o logo da aplicação
import { useTranslation } from "react-i18next"; // Hook para internacionalização
import Accessibility from "../accessibility/accessibility"; // Componente de acessibilidade
import "./Modal.css"; // Estilos CSS específicos para o modal

const { Text } = Typography; // Extrai o componente Text de Typography do Ant Design

// Componente funcional BasicModal que recebe duas propriedades: modalOpen e setModalOpen
const BasicModal = ({ modalOpen, setModalOpen }) => {
  const navigate = useNavigate(); // Hook para navegação
  const { t } = useTranslation(); // Hook para obter funções de tradução

  // Função para fechar o modal
  const handleClose = () => {
    setModalOpen(false);
  };

  // Função para navegar para uma nova rota após fechar o modal
  const handleNavigate = (path) => {
    handleClose();  // Fecha o modal primeiro
    navigate(path); // Navega para a nova rota
  }

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={Logo} alt="Logo" style={{ width: "50px", height: "50px", marginRight: "10px" }} />
          <Text style={{ fontSize: "24px", margin: 0 }}>{t("Cadastros")}</Text>
        </div>
      }
      visible={modalOpen} // Propriedade que controla se o modal está visível ou não
      onCancel={handleClose} // Função chamada ao fechar o modal (clicando fora ou no botão de fechar)
      footer={null} // Não exibe footer no modal
      centered // Centraliza o modal na tela
      width={447} // Largura específica para o modal
      style={{
        padding: '24px',
        borderRadius: '10px',
        border: '2px solid gray',
        backgroundColor: '#fff',
      }}
    >
      <div>
        {/* Botão para acessibilidade */}
        <Button style={{ marginBottom: '16px', width: '100%', border:'none' }}><Accessibility/></Button>

        {/* Botões para acessar diferentes páginas */}
        <Button
          type="text"
          aria-label='botão para acessar página clientes'
          onClick={() => handleNavigate('/Clients')}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          {t("Clientes")}
        </Button>

        <Button
          type="text"
          aria-label='botão para acessar página de custos extras'
          onClick={() => handleNavigate('/ExtraCost')}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          {t("Tipos de Custos Extras")}
        </Button>

        <Button
          type="text"
          aria-label='botão para acessar página de tecnologia'
          onClick={() => handleNavigate('/Tech')}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          {t("Tecnologia")}
        </Button>

        <Button
          type="text"
          aria-label='botão para acessar página de funções'
          onClick={() => handleNavigate('/Function')}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          {t("Funções")}
        </Button>

        <Button
          type="text"
          aria-label='botão para acessar página motivos de eventos'
          onClick={() => handleNavigate('/EventReason')}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          {t("Motivos de Eventos")}
        </Button>

        <Button
          type="text"
          aria-label='botão para acessar página mensagens'
          onClick={() => handleNavigate('/Messages')}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          {t("Mensagens")}
        </Button>

        <Button
          type="text"
          aria-label='botão para acessar página alm'
          onClick={() => handleNavigate('/Alm')}
          style={{ marginBottom: '16px', width: '100%' }}
        >
          {t("ALM")}
        </Button>

        {/* Botão principal para acessar a página inicial */}
        <Button
          type="primary"
          aria-label='botão para acessar página inicial'
          onClick={() => handleNavigate('/')}
          style={{ marginBottom: '16px', width: '100%', background:'linear-gradient(to bottom, #2d939c, #68C7CF)' }}
        >
          {t("Página Inicial")}
        </Button>
      </div>
    </Modal>
  );
};

export default BasicModal; // Exporta o componente BasicModal para ser utilizado em outros arquivos
