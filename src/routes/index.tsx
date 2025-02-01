import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/shared/layout';
import { RouteLoading } from '@/components/route-loading';
import { ErrorBoundary } from '@/components/error-boundary';
import PrivateRoute from './private-route';
import { PublicRoute } from './public-route';

// Lazy load pages
const HomePage = React.lazy(() => import('@/pages/home'));
const LoginPage = React.lazy(() => import('@/pages/login'));
const RegisterPage = React.lazy(() => import('@/pages/register'));
const CreatePostPage = React.lazy(() => import('@/pages/create-post'));
const EditPostPage = React.lazy(() => import('@/pages/edit-post'));
const PostDetailPage = React.lazy(() => import('@/pages/post-detail'));
const MyPostsPage = React.lazy(() => import('@/pages/my-posts'));

export function AppRoutes() {
  return (
    <Routes>
      <Route
        element={
          <Suspense fallback={<RouteLoading />}>
            <Layout />
          </Suspense>
        }
        errorElement={<ErrorBoundary />}
      >
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path='post/:id' element={<PostDetailPage />} />

        {/* Auth Routes */}
        <Route element={<PublicRoute />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path='my-posts' element={<MyPostsPage />} />
          <Route path='create' element={<CreatePostPage />} />
          <Route path='edit/:id' element={<EditPostPage />} />
        </Route>

        {/* Fallback */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
}
