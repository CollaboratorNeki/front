import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Logo from './components/Logo/Logo';
import MenuList from './components/MenuList/MenuList';
import Alm from './pages/Alm/Alm';
import EventReason from './pages/EventReason/EventReason';
import Messages from './pages/Messages/Messages';
import Home from './pages/Home/Home';
import Function from './pages/Function/Function';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Registrations from './pages/Registrations/Registrations';
import { Layout, Button } from 'antd';
import "./App.css";
import Accessibility from "./components/accessibility/accessibility";
import ThemeToggleButton from './components/ThemeToggleButton';
import Clients from './pages/Clients/Clients';
import Tech from './pages/Tech/Tech';
import ExtraCost from './pages/ExtraCost/ExtraCost';
import BreadCrumb from './components/Breadcrumb/Breadcrumb';


const { Content, Header, Sider, Footer } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const themeToggle = () => {
    setDarkTheme(!darkTheme);
  };
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };


  return (
    <BrowserRouter >
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
          <Logo />
          <MenuList darkTheme={darkTheme} />
          {/* <ThemeToggleButton darkTheme={darkTheme} themeToggle={themeToggle} /> */}
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              background: darkTheme
                ? 'linear-gradient(to bottom, #2d939c, #68C7CF)'
                : 'linear-gradient(to bottom, #2d939c, #68C7CF)',
            }}
          >
            <Layout style={{backgroundColor:"transparent",
                display:"flex", flexDirection:'row',
                justifyContent:"space-between", height:"4em"
              }}>
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
            <Accessibility/>
            </Layout>
          </Header>
          <BreadCrumb/>
          <Content
            style={{
              margin: '24px 16px 0',
              // maxWidth: '100%',
              // display: 'flex',
              // alignItems: 'center',
              // justifyContent: 'center',
              // marginBottom: '5vh',
            }}
          >
            {/* <div
            style={{
              padding: 24,
              minHeight: 360,
              height: '80vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            </div> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Alm" element={<Alm />} />
              <Route path="/EventReason" element={<EventReason />} />
              <Route path="/Function" element={<Function />} />
              <Route path="/Messages" element={<Messages />} />
              <Route path="/Clients"element={<Clients/>}/> 
              <Route path="/Tech"element={<Tech/>}/> 
              <Route path="/ExtraCost"element={<ExtraCost/>}/> 
              <Route path="*" element={<PageNotFound />} />
              <Route path="/Registrations" element={<Registrations />} />
            </Routes>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              background: darkTheme
                ? 'linear-gradient(to bottom, #2d939c, #68C7CF)'
                : 'linear-gradient(to bottom, #2d939c, #68C7CF)',
              color: darkTheme ? '#fff' : '#000',
            }}
          >
            Neki ©2024 Criado por Residentes
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
