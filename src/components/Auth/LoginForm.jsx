import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';

const LoginForm = () => {
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (!error) {
      toast({
        title: '¡Bienvenido/a de nuevo!',
        description: 'Has iniciado sesión correctamente.',
      });
      navigate('/panel');
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email-login">Correo Electrónico</Label>
          <Input id="email-login" type="email" placeholder="tu@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password-login">Contraseña</Label>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              toast({ title: '🚧 Funcionalidad no implementada', description: 'La recuperación de contraseña aún no está activa. ¡Puedes solicitarlo en tu próximo prompt! 🚀' });
            }} className="text-sm font-medium text-accent-blue hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Input id="password-login" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="w-full btn-primary" disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
      </form>
    </motion.div>
  );
};

export default LoginForm;