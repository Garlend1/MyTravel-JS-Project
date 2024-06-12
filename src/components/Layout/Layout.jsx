import React, { useState } from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import PostList from '../PostList/PostList';
import About from '../About/About';
const { Content, Footer, Sider } = Layout;
const items = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'About',
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'Posts',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'Contacts',
  },
];
const App = () => {
  const [selectedKey, setSelectedKey] = useState('1');
  const onMenuSelect = ({ key }) => {
    setSelectedKey(key);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          onSelect={onMenuSelect}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: '100vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {selectedKey === '2' && <PostList />}

            {selectedKey === '1' && <About />}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          {new Date().getFullYear()} Created by Pavel Mikhaylov
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
