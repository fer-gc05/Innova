import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface User {
  id: number;
  name: string;
  email: string;
  roles: Array<{ name: string }>;
}

interface PageProps {
  auth: {
    user: User | null;
  };
  [key: string]: unknown;
}

export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { auth } = usePage<PageProps>().props;
  const user = auth.user;

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

              <Link href="/retos-actuales" className={`${isActive('/retos-actuales')} transition-colors font-medium`}>
                Retos Actuales
              </Link>
            </nav>

            {/* Auth & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {user ? (
                /* User Menu */
                <div className="relative">
                  <button
                    onClick={() => setIsAuthOpen(!isAuthOpen)}
                    className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors font-medium"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {isAuthOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-blue-600 rounded-md shadow-lg z-50 border border-blue-500">
                      <div className="py-2">
                        <Link href={route('mi-cuenta')} className="flex items-center px-4 py-2 text-white hover:bg-blue-700">
                          <User className="h-4 w-4 mr-2" />
                          Mi Cuenta
                        </Link>

                        {user.roles.some(role => role.name === 'admin') && (
                          <Link href="/admin/panel" className="flex items-center px-4 py-2 text-white hover:bg-blue-700">
                            <Settings className="h-4 w-4 mr-2" />
                            Panel Administrativo
                          </Link>
                        )}

                        {user.roles.some(role => role.name === 'businessman') && (
                          <Link href="/businessman/panel" className="flex items-center px-4 py-2 text-white hover:bg-blue-700">
                            <Settings className="h-4 w-4 mr-2" />
                            Panel de Retos
                          </Link>
                        )}

                        <Link href={route('logout')} method="post" as="button" className="flex items-center w-full px-4 py-2 text-white hover:bg-blue-700">
                          <LogOut className="h-4 w-4 mr-2" />
                          Cerrar Sesión
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Auth Dropdown */
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
                        <Link href={route('register.company')} className="block px-4 py-2 text-white hover:bg-blue-700">
                          Registrarse como Empresa
                        </Link>
                        <Link href={route('register.student')} className="block px-4 py-2 text-white hover:bg-blue-700">
                          Registrarse como Estudiante
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Sidebar Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className="lg:hidden"
                    aria-label="Abrir menú"
                  >
                    <Menu className="h-6 w-6 text-white" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-blue-600 text-white border-l border-blue-500 p-0">
                  <SheetHeader className="p-4 border-b border-blue-500">
                    <SheetTitle className="text-white flex items-center gap-2">
                      <img
                        src="/images/IN-Nova%20logo.svg"
                        alt="IN-NOVA Logo"
                        className="h-8 w-auto"
                      />
                      <span className="text-lg font-semibold">IN-NOVA</span>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col h-full">
                    {/* Navigation Links */}
                    <div className="p-4 space-y-2">
                      <Link
                        href="/"
                        className="flex items-center text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        onClick={() => document.querySelector('[data-radix-sheet-content]')?.dispatchEvent(new Event('pointerdown', { bubbles: true }))}
                      >
                        Inicio
                      </Link>
                      <Link
                        href="/empresas"
                        className="flex items-center text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        onClick={() => document.querySelector('[data-radix-sheet-content]')?.dispatchEvent(new Event('pointerdown', { bubbles: true }))}
                      >
                        Empresas
                      </Link>
                      <Link
                        href="/retos-actuales"
                        className="flex items-center text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        onClick={() => document.querySelector('[data-radix-sheet-content]')?.dispatchEvent(new Event('pointerdown', { bubbles: true }))}
                      >
                        Retos Actuales
                      </Link>
                    </div>

                    {/* Separator */}
                    <div className="border-t border-blue-500 mx-4"></div>

                    {/* Auth Options */}
                    <div className="p-4 space-y-2 flex-1">
                      {user ? (
                        <>
                          <Link
                            href={route('mi-cuenta')}
                            className="flex items-center text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={() => document.querySelector('[data-radix-sheet-content]')?.dispatchEvent(new Event('pointerdown', { bubbles: true }))}
                          >
                            <User className="h-5 w-5 mr-3" />
                            Mi Cuenta
                          </Link>

                          {user.roles.some(role => role.name === 'admin') && (
                            <Link
                              href="/admin/panel"
                              className="flex items-center text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                              onClick={() => document.querySelector('[data-radix-sheet-content]')?.dispatchEvent(new Event('pointerdown', { bubbles: true }))}
                            >
                              <Settings className="h-5 w-5 mr-3" />
                              Panel Administrativo
                            </Link>
                          )}

                          {user.roles.some(role => role.name === 'businessman') && (
                            <Link
                              href="/businessman/panel"
                              className="flex items-center text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                              onClick={() => document.querySelector('[data-radix-sheet-content]')?.dispatchEvent(new Event('pointerdown', { bubbles: true }))}
                            >
                              <Settings className="h-5 w-5 mr-3" />
                              Panel de Retos
                            </Link>
                          )}

                          <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="flex items-center w-full text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={() => document.querySelector('[data-radix-sheet-content]')?.dispatchEvent(new Event('pointerdown', { bubbles: true }))}
                          >
                            <LogOut className="h-5 w-5 mr-3" />
                            Cerrar Sesión
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            href={route('login')}
                            className="flex items-center text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={() => document.querySelector('[data-radix-sheet-content]')?.dispatchEvent(new Event('pointerdown', { bubbles: true }))}
                          >
                            Inicia Sesión
                          </Link>
                          <Link
                            href={route('register.company')}
                            className="flex items-center text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={() => document.querySelector('[data-radix-sheet-content]')?.dispatchEvent(new Event('pointerdown', { bubbles: true }))}
                          >
                            Registrarse como Empresa
                          </Link>
                          <Link
                            href={route('register.student')}
                            className="flex items-center text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={() => document.querySelector('[data-radix-sheet-content]')?.dispatchEvent(new Event('pointerdown', { bubbles: true }))}
                          >
                            Registrarse como Estudiante
                          </Link>
                        </>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-blue-500">
                      <div className="text-xs text-blue-300 text-center">
                        © 2024 IN-NOVA. Todos los derechos reservados.
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>


        </div>
      </header>
      {/* Spacer to offset fixed header height on desktop */}
      <div className="hidden lg:block h-20" />
    </>
  );
}
