// src/components/Admin/AuthGuard.jsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export const AuthGuard = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Obtener credenciales de las variables de entorno
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;

  useEffect(() => {
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');
    
    console.log('🔐 Intentando login con username:', username);
    
    // Validar variables de entorno
    if (!adminEmail || !adminPassword || !adminUsername) {
      setAuthError('Error de configuración del sistema. Contacta al administrador.');
      setLoading(false);
      return;
    }

    // Mapeo de username a email real
    const usernameToEmailMap = {
      [adminUsername]: adminEmail
    };

    const email = usernameToEmailMap[username.toLowerCase()];
    
    if (!email) {
      setAuthError(`Usuario no válido. Solo el usuario "${adminUsername}" está autorizado.`);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('❌ Error de login:', error);
      setAuthError('Credenciales incorrectas. Verifica tu usuario y contraseña.');
    } else {
      console.log('✅ Login exitoso');
      console.log('👤 Usuario:', data.user.user_metadata?.username);
      console.log('📧 Email:', data.user.email);
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100"
      >
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Acceso Administrativo</h2>
            <p className="text-gray-600">Sistema de gestión de vacantes</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={adminUsername || "admin"}
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full"
                required
              />
            </div>
            
            {authError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                {authError}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-dark transition-colors" 
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
          
          {adminUsername && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 text-center">
                <strong>Credenciales de administrador:</strong><br/>
                Usuario: {adminUsername}<br/>
                Contraseña: ••••••••
              </p>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Header con info del usuario */}
      <div className="bg-blue-600 text-white py-2 px-4">
        <div className="container-max flex justify-between items-center">
          <span>Panel de Administración - Latam Executive Search</span>
          <div className="flex items-center gap-4">
            <span className="text-sm">Hola, {user.user_metadata?.username || 'Admin'}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="text-white border-white hover:bg-white hover:text-blue-600"
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
