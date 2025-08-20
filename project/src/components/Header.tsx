import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-300' : 'hover:text-blue-300';
  };

  return (
    <header className="bg-blue-900 text-white shadow-lg relative z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white text-blue-900 p-2 rounded">
              <div className="font-bold text-lg">IN</div>
            </div>
            <span className="text-xl font-bold">IN-NOVA</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors font-medium`}>
              INICIO
            </Link>
            <Link to="/empresas" className={`${isActive('/empresas')} transition-colors font-medium`}>
              EMPRESAS
            </Link>
            <Link to="/cluster-turistico" className={`${isActive('/cluster-turistico')} transition-colors font-medium`}>
              CLUSTER TURÍSTICO
            </Link>
            <Link to="/casos-negocio" className={`${isActive('/casos-negocio')} transition-colors font-medium`}>
              CASOS DE NEGOCIO
            </Link>
            <Link to="/retos-actuales" className={`${isActive('/retos-actuales')} transition-colors font-medium`}>
              RETOS ACTUALES
            </Link>
          </nav>

          {/* Search and Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search for products..."
                className="bg-white/10 border border-white/20 rounded-md px-4 py-2 text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 w-48"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-white/60" />
            </div>
            <button className="lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}