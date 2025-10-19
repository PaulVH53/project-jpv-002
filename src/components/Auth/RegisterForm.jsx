import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const RegisterForm = () => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password.length < 6) {
      toast({
        title: 'Contraseña inválida',
        description: 'La contraseña debe tener al menos 6 caracteres.',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);

    const { error } = await signUp(formData.email, formData.password, {
      data: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        user_name: formData.username,
      }
    });

    if (!error) {
       toast({
        title: '¡Cuenta Creada!',
        description: 'Bienvenido/a. Revisa tu correo para confirmar tu cuenta y luego inicia sesión.',
      });
      // In a real app, you'd wait for email confirmation.
      // For this demo, we can consider navigating away or showing a message.
      // We don't navigate to /panel automatically anymore. User has to login after confirming.
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input id="username" type="text" placeholder="Tu usuario" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nombres</Label>
            <Input id="firstName" type="text" placeholder="Tus nombres" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Apellidos</Label>
            <Input id="lastName" type="text" placeholder="Tus apellidos" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input id="email" type="email" placeholder="tu@email.com" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
        </div>
        <Button type="submit" className="w-full btn-primary" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </Button>
      </form>
    </motion.div>
  );
};

export default RegisterForm;