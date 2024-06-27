import React, { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, PlusSquareOutlined, AreaChartOutlined, TeamOutlined, EditOutlined, SettingOutlined, BarsOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import BasicModal from "../BasicModal/BasicModal"; // Importa o componente de modal básico
import "./Menu.css"; // Importa o arquivo de estilo CSS para o menu
import { useTranslation } from 'react-i18next'; // Importa o hook useTranslation para tradução

const MenuList = ({ darkTheme }) => {
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar a abertura e fechamento do modal
    const { t } = useTranslation(); // Hook useTranslation para tradução, t é uma função para traduzir strings

    // Função para lidar com cliques no menu
    const handleMenuClick = ({ key }) => {
        if (key === "cadastro") { // Se a chave do item de menu for "cadastro"
            setModalOpen(true); // Abre o modal
        }
    };

    return (
        <>
            {/* Componente Menu do Ant Design */}
            <Menu 
                theme={darkTheme ? "dark" : "light"} // Define o tema do menu com base na prop darkTheme
                mode="inline" // Modo inline para exibição do menu
                className="menu-bar" // Classe CSS para estilização do menu
                onClick={handleMenuClick} // Função a ser executada ao clicar em um item do menu
            >
                {/* Itens do menu */}
                <Menu.Item key="paginaInicial" accessKey="1" tabIndex={0} icon={<HomeOutlined />}>
                    {/* NavLink para navegação interna com rota '/' */}
                    <NavLink to="/" activeClassName="active-link">{t("Página Inicial")}</NavLink>
                </Menu.Item>
                <Menu.Item key="novoProjeto" accessKey="1" tabIndex={0} icon={<PlusSquareOutlined />}>
                    {t("Novo Projeto")} {/* Tradução do texto "Novo Projeto" */}
                </Menu.Item>
                <Menu.Item key="novaTarefa" accessKey="1" tabIndex={0} icon={<BarsOutlined />}>
                    {t("Nova Tarefa")} {/* Tradução do texto "Nova Tarefa" */}
                </Menu.Item>
                <Menu.Item key="relatorios" accessKey="1" tabIndex={0} icon={<AreaChartOutlined />}>
                    {t("Relatórios")} {/* Tradução do texto "Relatórios" */}
                </Menu.Item>
                <Menu.Item key="cadastro" accessKey="1" tabIndex={0} icon={<EditOutlined />}>
                    {t("Cadastro")} {/* Tradução do texto "Cadastro" */}
                </Menu.Item>
                <Menu.Item key="configuracoes" accessKey="1" tabIndex={0} icon={<SettingOutlined />}>
                    {t("Configurações")} {/* Tradução do texto "Configurações" */}
                </Menu.Item>
            </Menu>
            {/* Componente de modal básico, passando props modalOpen e setModalOpen */}
            <BasicModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </>
    );
};

export default MenuList;
