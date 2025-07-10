import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import NotFoundPage from './pages/NotFoundPage';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
    <Routes>
      {/* Route for the home page that shows the template cards */}
      <Route path="/" element={<HomePage />} />

      {/* A dynamic route for the form. :templateId will be a variable like "professional-portfolio" */}
      <Route path="/form/:templateId" element={<FormPage />} />
      
      {/* A catch-all route for any URL that doesn't match the ones above */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </MantineProvider>
  );
}

export default App;