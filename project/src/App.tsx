import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import EmpresasPage from './pages/EmpresasPage';
import ClusterTurismoPage from './pages/ClusterTurismoPage';
import CasosNegocioPage from './pages/CasosNegocioPage';
import RetosActualesPage from './pages/RetosActualesPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/empresas" element={<EmpresasPage />} />
          <Route path="/cluster-turistico" element={<ClusterTurismoPage />} />
          <Route path="/casos-negocio" element={<CasosNegocioPage />} />
          <Route path="/retos-actuales" element={<RetosActualesPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;