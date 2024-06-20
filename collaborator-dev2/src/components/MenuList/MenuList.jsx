import React, { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, PlusSquareOutlined, AreaChartOutlined, TeamOutlined, EditOutlined, SettingOutlined, BarsOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import BasicModal from "../BasicModal/BasicModal";
import "./Menu.css" 
import { useTranslation } from 'react-i18next';

const MenuList = ({ darkTheme }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { t } = useTranslation();

    const handleMenuClick = ({ key }) => {
        if (key === "cadastro") {
            setModalOpen(true);
        }
    };

    return (
        <>
            <Menu 
                theme={darkTheme ? "dark" : "light"} 
                mode="inline" 
                className="menu-bar" 
                onClick={handleMenuClick}
            >
                <Menu.Item key="paginaInicial" accessKey= "1" tabIndex={0} icon={<HomeOutlined />}>
                    <NavLink to="/" activeClassName="active-link">{t("Página Inicial")}</NavLink>
                </Menu.Item>
                <Menu.Item key="novoProjeto" accessKey= "1" tabIndex={0} icon={<PlusSquareOutlined />}>
                  {t("Novo Projeto")}
                </Menu.Item>
                <Menu.Item key="novaTarefa" accessKey= "1" tabIndex={0} icon={<BarsOutlined />}>
                {t("Nova Tarefa")} 
                </Menu.Item>
                <Menu.Item key="relatorios" accessKey= "1" tabIndex={0} icon={<AreaChartOutlined />}>
                {t("Relatórios")} 
                </Menu.Item>
                <Menu.Item key="cadastro" accessKey= "1" tabIndex={0} icon={<EditOutlined />}>
                {t("Cadastro")}
                </Menu.Item>
                <Menu.Item key="configuracoes" accessKey= "1" tabIndex={0} icon={<SettingOutlined />}>
                {t("Configurações")} 
                </Menu.Item>
            </Menu>
            <BasicModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </>
    );
};

export default MenuList;
