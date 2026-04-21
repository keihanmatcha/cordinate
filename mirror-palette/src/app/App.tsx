import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './route';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
