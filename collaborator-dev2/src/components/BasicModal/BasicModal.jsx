import React from "react";
import { Modal, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';
import { useTranslation } from "react-i18next";
import Accessibility from "../accessibility/accessibility";
import "./Modal.css"



const { Text } = Typography;

const BasicModal = ({ modalOpen, setModalOpen }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClose = () => {
    setModalOpen(false);
  };
  const handleNavigate = (path) => {
    handleClose();  // Close the modal first
    navigate(path); // Then navigate to the new route
    }

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={Logo} alt="Logo" style={{ width: "50px", height: "50px", marginRight: "10px" }} />
          <Text style={{ fontSize: "24px", margin: 0 }}>{t("Cadastros")}</Text>
        </div>
      }
      visible={modalOpen}
      onCancel={handleClose}
      footer={null}
      centered
      width={447}
      style={{
        padding: '24px',
        borderRadius: '10px',
        border: '2px solid gray',
        backgroundColor: '#fff',
      }}
    >
      <div>
        <Button style={{ marginBottom: '16px', width: '100%', border:'none' }}><Accessibility/></Button>
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
          aria-label='botão para acessar página motivos de eventos '
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

        <Button
          type="primary"
          aria-label='botão para acessar página inicial'
          onClick={() => handleNavigate('/')}
          style={{ marginBottom: '16px', width: '100%',  background:'linear-gradient(to bottom, #2d939c, #68C7CF)' }}
        >
          {t("Página Inicial")}
        </Button>

      </div>
    </Modal>
  );
};

export default BasicModal;
