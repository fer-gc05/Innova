import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Search, Menu, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const isActive = (path: string) => {
    return window.location.pathname === path ? 'text-blue-300' : 'hover:text-blue-300';
  };

  return (
    <header className="bg-blue-900 text-white relative">
      {/* Background with city silhouette */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/20">
          {/* City silhouette effect */}
          <div className="h-full bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/LOGO-copia.svg"
                alt="IN-NOVA Logo"
                className="h-12 w-auto"
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className={`${isActive('/')} transition-colors font-medium`}>
                Inicio
              </Link>

              {/* Empresas Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 transition-colors font-medium hover:text-blue-300">
                  <span>Empresas</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link href="/empresas" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Empresas de la Red
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/cluster-turistico" className={`${isActive('/cluster-turistico')} transition-colors font-medium`}>
                Cluster Turismo
              </Link>
              <Link href="/casos-negocio" className={`${isActive('/casos-negocio')} transition-colors font-medium`}>
                CASOS DE NEGOCIO
              </Link>
              <Link href="/retos-actuales" className={`${isActive('/retos-actuales')} transition-colors font-medium`}>
                RETOS ACTUALES
              </Link>
            </nav>

            {/* Search and Auth */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-white/10 border border-white/20 rounded-md px-4 py-2 text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 w-32"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-white/60" />
              </div>

              {/* Auth Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAuthOpen(!isAuthOpen)}
                  className="flex items-center space-x-1 text-white hover:text-blue-300 transition-colors"
                >
                  <span className="text-sm">Inicia Sesión O Regístrate</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isAuthOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50">
                    <div className="py-2">
                      <Link href={route('login')} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Inicia Sesion
                      </Link>
                      <Link href={route('register')} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Registrase como Empresa
                      </Link>
                      <Link href={route('register')} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Registrarse como Estudiante
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <button
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-blue-800 mt-2 rounded-md">
              <div className="px-4 py-2 space-y-2">
                <Link href="/" className="block text-white hover:text-blue-300">Inicio</Link>
                <Link href="/empresas" className="block text-white hover:text-blue-300">Empresas</Link>
                <Link href="/cluster-turistico" className="block text-white hover:text-blue-300">Cluster Turismo</Link>
                <Link href="/casos-negocio" className="block text-white hover:text-blue-300">CASOS DE NEGOCIO</Link>
                <Link href="/retos-actuales" className="block text-white hover:text-blue-300">RETOS ACTUALES</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
