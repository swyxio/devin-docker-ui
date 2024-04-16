import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import ContainersPanel from './components/ContainersPanel';
import ImagesPanel from './components/ImagesPanel';
import NetworksPanel from './components/NetworksPanel';
import VolumesPanel from './components/VolumesPanel';
import SettingsPanel from './components/SettingsPanel';
import Terminal from './components/Terminal';
import Footer from './components/Footer';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/containers" element={<ContainersPanel />} />
          <Route path="/images" element={<ImagesPanel />} />
          <Route path="/networks" element={<NetworksPanel />} />
          <Route path="/volumes" element={<VolumesPanel />} />
          <Route path="/settings" element={<SettingsPanel />} />
          <Route path="/terminal" element={<Terminal />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
