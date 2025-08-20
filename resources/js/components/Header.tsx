import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const isActive = (path: string) => {
    return window.location.pathname === path ? 'text-blue-300' : 'hover:text-blue-300';
  };

  return (
    <>
      <header className="bg-blue-600 text-white shadow-md relative lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-50 lg:w-full">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logos */}
            <div className="flex items-center gap-4">
              <img src="/images/badge-80-years.svg" alt="80 años" className="h-10 w-auto hidden md:block" />
              <Link href="/" className="flex items-center" aria-label="Inicio">
                <img
                  src="/images/IN-Nova%20logo.svg"
                  alt="IN-NOVA Logo"
                  className="h-12 w-auto"
                />
              </Link>
              <img src="/images/dinamica.svg" alt="Dinámica" className="h-10 w-auto hidden md:block" />
            </div>

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
                <div className="absolute top-full left-0 mt-2 w-48 bg-blue-600 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-blue-500">
                  <div className="py-2">
                    <Link href="/empresas" className="block px-4 py-2 text-white hover:bg-blue-700">
                      Empresas de la Red
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/cluster-turistico" className={`${isActive('/cluster-turistico')} transition-colors font-medium`}>
                Cluster Turismo
              </Link>
              <Link href="/casos-negocio" className={`${isActive('/casos-negocio')} transition-colors font-medium`}>
                Casos de Negocio
              </Link>
              <Link href="/retos-actuales" className={`${isActive('/retos-actuales')} transition-colors font-medium`}>
                Retos Actuales
              </Link>
            </nav>

            {/* Auth & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Auth Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAuthOpen(!isAuthOpen)}
                  className="flex items-center space-x-1 text-white hover:text-blue-300 transition-colors font-medium"
                >
                  <span className="text-sm">Inicia Sesión o Regístrate</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isAuthOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-blue-600 rounded-md shadow-lg z-50 border border-blue-500">
                    <div className="py-2">
                      <Link href={route('login')} className="block px-4 py-2 text-white hover:bg-blue-700">
                        Inicia Sesión
                      </Link>
                      <Link href="/empresas" className="block px-4 py-2 text-white hover:bg-blue-700">
                        Registrarse como Empresa
                      </Link>
                      <Link href="/registro-usuarios" className="block px-4 py-2 text-white hover:bg-blue-700">
                        Registrarse como Estudiante
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Abrir menú"
              >
                <Menu className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-blue-600 mt-2 rounded-md border border-blue-500">
              <div className="px-4 py-2 space-y-2">
                <Link href="/" className="block text-white hover:text-blue-300">Inicio</Link>
                <Link href="/empresas" className="block text-white hover:text-blue-300">Empresas</Link>
                <Link href="/cluster-turistico" className="block text-white hover:text-blue-300">Cluster Turismo</Link>
                <Link href="/casos-negocio" className="block text-white hover:text-blue-300">Casos de Negocio</Link>
                <Link href="/retos-actuales" className="block text-white hover:text-blue-300">Retos Actuales</Link>
              </div>
            </div>
          )}
        </div>
      </header>
      {/* Spacer to offset fixed header height on desktop */}
      <div className="hidden lg:block h-20" />
    </>
  );
}
