import React from 'react';
import { Layout, theme } from 'antd';
import './Header.css';
const { Header } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="demo-logo" />
        <h1 className="header">Список постов</h1>
      </Header>
    </Layout>
  );
};
export default App;
