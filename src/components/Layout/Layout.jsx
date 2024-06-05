import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import PostList from '../PostList/PostList';
const { Header, Content, Footer, Sider } = Layout;
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
]
const App = () => {
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
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
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <PostList />
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