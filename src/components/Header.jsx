import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    toast({
      title: 'Sesión cerrada',
      description: 'Has cerrado sesión exitosamente.',
    });
    navigate('/');
  };

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Vacantes', path: '/vacantes' },
    { name: 'Casos de Éxito', path: '/casos-de-exito' },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.6 }} 
      className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50"
    >
      <nav className="container-max">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gradient">Latam Executive Search</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <button key={link.name} onClick={() => handleNavClick(link.path)} className="text-medium-gray hover:text-accent-blue px-3 py-2 text-sm font-medium transition-colors duration-300">
                {link.name}
              </button>
            ))}
            {user ? (
              <>
                <button onClick={() => handleNavClick('/panel')} className="text-medium-gray hover:text-accent-blue px-3 py-2 text-sm font-medium transition-colors duration-300">
                  Panel
                </button>
                <button onClick={handleLogout} className="flex items-center text-medium-gray hover:text-accent-blue px-3 py-2 text-sm font-medium transition-colors duration-300">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button onClick={() => handleNavClick('/acceso')} className="btn-primary-outline text-sm">
                Acceso
              </button>
            )}
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-medium-gray hover:text-accent-blue p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="md:hidden bg-white border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map(link => (
                <button key={link.name} onClick={() => handleNavClick(link.path)} className="block w-full text-left text-medium-gray hover:text-accent-blue px-3 py-2 text-base font-medium">
                  {link.name}
                </button>
              ))}
              {user ? (
                <>
                  <button onClick={() => handleNavClick('/panel')} className="block w-full text-left text-medium-gray hover:text-accent-blue px-3 py-2 text-base font-medium">
                    Panel
                  </button>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="flex items-center w-full text-left text-medium-gray hover:text-accent-blue px-3 py-2 text-base font-medium">
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <button onClick={() => handleNavClick('/acceso')} className="block w-full text-left text-medium-gray hover:text-accent-blue px-3 py-2 text-base font-medium">
                  Acceso
                </button>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};
export default Header;