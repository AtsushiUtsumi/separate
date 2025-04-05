import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import PartsList from './components/PartsList';
import PartForm from './components/PartForm';
import PartDetail from './components/PartDetail';
import InventoryList from './components/InventoryList';
import InventoryDetail from './components/InventoryDetail';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parts" element={<PartsList />} />
          <Route path="/parts/new" element={<PartForm />} />
          <Route path="/parts/:id" element={<PartDetail />} />
          <Route path="/parts/:id/edit" element={<PartForm />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/inventory/:id" element={<InventoryDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 