import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import TableTech from "../../components/Table/TableTech";



const { Header, Content, Footer, Sider } = Layout;
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);
const Tech = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      
      <Layout>
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            background: 'red'
          }}
        /> */}
        <Content
          style={{
            margin: '24px 16px 0',
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
            <TableFunction/>
          </div> */}
          <TableTech/>
        </Content>
        {/* <Footer
          style={{
            textAlign: 'center',
            background: 'green'
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default Tech;