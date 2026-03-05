import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './index.css';
import AppLayout from './AppLayout';
import Dashboard from './Dashboard';
import NewTask from './NewTask';
import NewProject from './NewProject';
import AuthLayout from './AuthLayout';
import Login from './Login';
import Register from './Register';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/new-task" element={<NewTask />} />
            <Route path="/new-project" element={<NewProject />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
