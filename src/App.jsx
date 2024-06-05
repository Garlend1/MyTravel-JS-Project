// App.js
import React from 'react';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import PostList from './components/PostList/PostList';

function App() {
  return (
    <div>
      <Header />
      <Layout>
        <PostList />
      </Layout>
    </div>
  );
}

export default App;
