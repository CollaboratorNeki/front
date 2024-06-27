import React, { useState } from 'react'; // Importação do React e useState
import { Routes, Route, BrowserRouter } from 'react-router-dom'; // Importação dos componentes de roteamento do React Router DOM
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'; // Importação dos ícones de menu do Ant Design
import Logo from './components/Logo/Logo'; // Importação do componente de logo
import MenuList from './components/MenuList/MenuList'; // Importação do componente de lista de menu
import Alm from './pages/Alm/Alm'; // Importação da página Alm
import EventReason from './pages/EventReason/EventReason'; // Importação da página EventReason
import Messages from './pages/Messages/Messages'; // Importação da página Messages
import Home from './pages/Home/Home'; // Importação da página Home
import Function from './pages/Function/Function'; // Importação da página Function
import PageNotFound from './pages/PageNotFound/PageNotFound'; // Importação da página PageNotFound
import Registrations from './pages/Registrations/Registrations'; // Importação da página Registrations
import { Layout, Button } from 'antd'; // Importação dos componentes Layout e Button do Ant Design
import "./App.css"; // Importação do arquivo de estilos CSS
import Accessibility from "./components/accessibility/accessibility"; // Importação do componente de acessibilidade
import ThemeToggleButton from './components/ThemeToggleButton'; // Importação do componente de botão de alternância de tema
import Clients from './pages/Clients/Clients'; // Importação da página Clients
import Tech from './pages/Tech/Tech'; // Importação da página Tech
import ExtraCost from './pages/ExtraCost/ExtraCost'; // Importação da página ExtraCost
import BreadCrumb from './components/Breadcrumb/Breadcrumb'; // Importação do componente de breadcrumb

const { Content, Header, Sider, Footer } = Layout; // Destruturação dos componentes Layout, Header, Sider e Footer do Ant Design

const App = () => {
  const [collapsed, setCollapsed] = useState(false); // Estado para controlar o colapso do Sider
  const [darkTheme, setDarkTheme] = useState(false); // Estado para controlar o tema escuro

  // Função para alternar entre tema claro e escuro
  const themeToggle = () => {
    setDarkTheme(!darkTheme);
  };

  // Função chamada quando o Sider é colapsado ou expandido
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          collapsed={collapsed}
          collapsible
          onCollapse={onCollapse}
          trigger={null}
          theme={darkTheme ? 'dark' : 'light'}
          className="sidebar"
        >
          <Logo /> {/* Componente de logo */}
          <MenuList darkTheme={darkTheme} /> {/* Componente de lista de menu com o tema escuro */}
          {/* <ThemeToggleButton darkTheme={darkTheme} themeToggle={themeToggle} /> */}
          {/* Componente de botão de alternância de tema (comentado) */}
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              background: darkTheme
                ? 'linear-gradient(to bottom, #2d939c, #68C7CF)' // Gradiente de fundo para tema escuro
                : 'linear-gradient(to bottom, #2d939c, #68C7CF)', // Gradiente de fundo para tema claro
            }}
          >
            <Layout
              style={{
                backgroundColor: "transparent",
                display: "flex", flexDirection: 'row',
                justifyContent: "space-between", height: "4em"
              }}
            >
              <Button
                type="text"
                className="toggle"
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
              <Accessibility /> {/* Componente de acessibilidade */}
            </Layout>
          </Header>
          <BreadCrumb /> {/* Componente de breadcrumb */}
          <Content
            style={{
              margin: '24px 16px 0',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} /> {/* Rota para a página Home */}
              <Route path="/Alm" element={<Alm />} /> {/* Rota para a página Alm */}
              <Route path="/EventReason" element={<EventReason />} /> {/* Rota para a página EventReason */}
              <Route path="/Function" element={<Function />} /> {/* Rota para a página Function */}
              <Route path="/Messages" element={<Messages />} /> {/* Rota para a página Messages */}
              <Route path="/Clients" element={<Clients />} /> {/* Rota para a página Clients */}
              <Route path="/Tech" element={<Tech />} /> {/* Rota para a página Tech */}
              <Route path="/ExtraCost" element={<ExtraCost />} /> {/* Rota para a página ExtraCost */}
              <Route path="*" element={<PageNotFound />} /> {/* Rota para a página PageNotFound */}
              <Route path="/Registrations" element={<Registrations />} /> {/* Rota para a página Registrations */}
            </Routes>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              background: darkTheme
                ? 'linear-gradient(to bottom, #2d939c, #68C7CF)' // Gradiente de fundo para tema escuro
                : 'linear-gradient(to bottom, #2d939c, #68C7CF)', // Gradiente de fundo para tema claro
              color: darkTheme ? '#fff' : '#000', // Cor do texto dependendo do tema
            }}
          >
            Neki ©2024 Criado por Residentes {/* Texto do footer */}
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App; // Exporta o componente App
