import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomLayout from './components/Layout/Layout';
import HomePage from './routes/HomePage/HomePage';
import PostListGrid from './routes/PostListGrid/PostListGrid';
import Albums from './routes/Albums/Albums';
import Photos from './routes/Photos/Photos';
import { ErrorBoundary } from './error-page.jsx';
import NotFoundPage from './routes/NotFoundPage/NotFoundPage';
import Photo from './routes/Photo/Photo';
import CreatePostModal from './routes/CreatePostModal/CreatePostModal.jsx';
import Login from './routes/Login/Login.jsx';
import ResponsiveAppBar from './components/ResponsiveAppBar/ResponsiveAppBar.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import RequireAuth from './RequireAuth.jsx';
import Profile from './routes/Profile/Profile.jsx';
import PostDetailPage from './routes/PostDetailPage/PostDetailPage.jsx';

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <ResponsiveAppBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />

            <Route element={<CustomLayout />}>
              <Route path="/albums" element={<Albums />} />
              <Route path="/photos" element={<Photos />}>
                <Route path=":id" element={<Photo />} />
              </Route>
              <Route path="/posts" element={<PostListGrid />} />
              <Route path="/posts/:id" element={<PostDetailPage />} />

              <Route
                path="/new"
                element={
                  <RequireAuth>
                    <CreatePostModal />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
