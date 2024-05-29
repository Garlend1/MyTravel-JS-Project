// App.js
import React from 'react';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import PostList from './components/PostList/PostList';
import Menu from './components/Menu/Menu';

function App() {
  return (
    <div>
      <Header />
      <Layout>
        <Menu />
        <PostList />
      </Layout>
    </div>
  );
}

export default App;
