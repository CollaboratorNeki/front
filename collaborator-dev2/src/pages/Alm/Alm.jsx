import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'; // Importação de ícones do Ant Design
import { Layout, Menu, theme } from 'antd'; // Importação de componentes do Ant Design
import TableAlm from "../../components/Table/TableAlm"; // Importação do componente TableAlm

const { Header, Content, Footer, Sider } = Layout; // Destructuring para extrair componentes Layout do Ant Design

// Criação de itens de menu usando ícones e rótulos
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon), // Criação de elemento React para cada ícone
    label: `nav ${index + 1}`, // Rótulo do menu
  }),
);

const Alm = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }, // Extração de propriedades de token do tema
  } = theme.useToken(); // Uso do hook useToken() do tema do Ant Design

  return (
    <Layout>
      {/* Estrutura de layout principal */}
      <Layout>
        <Content
          style={{
            margin: '24px 16px 0', // Estilo CSS para o conteúdo principal
          }}
        >
          {/* Componente TableAlm utilizado para exibir uma tabela */}
          <TableAlm/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Alm;
