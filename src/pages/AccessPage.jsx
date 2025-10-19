import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from '@/components/Auth/LoginForm';
import RegisterForm from '@/components/Auth/RegisterForm';

const AccessPage = () => {
  return (
    <>
      <Helmet>
        <title>Acceso Candidatos - Latam Executive Search</title>
        <meta name="description" content="Inicia sesión o crea tu cuenta de candidato en Latam Executive Search para acceder a las mejores oportunidades laborales." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-[calc(100vh-4rem)] w-full lg:grid lg:grid-cols-2"
      >
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-md space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
                Acceso para <span className="text-gradient">Candidatos</span>
              </h1>
              <p className="mt-2 text-center text-sm text-medium-gray">
                Gestiona tu perfil y postulaciones en un solo lugar.
              </p>
            </div>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register">Crear Cuenta</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden bg-gray-100 lg:block relative">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            alt="Profesional sonriendo en un entorno de oficina moderno"
           src="https://images.unsplash.com/photo-1573878221136-9b03f3d976b7" />
          <div className="absolute inset-0 bg-navy/80"></div>
          <div className="relative h-full flex flex-col justify-end p-12 text-white">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-4xl font-bold leading-tight">
                Tu próximo paso profesional comienza aquí.
              </h2>
              <p className="mt-4 text-lg text-blue-200 max-w-lg">
                Conectamos tu talento con las empresas más innovadoras de Latinoamérica.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AccessPage;