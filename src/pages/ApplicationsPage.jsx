import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ApplicationsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Mis Aplicaciones - Latam Executive Search</title>
        <meta name="description" content="Revisa el estado de tus aplicaciones a vacantes." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 min-h-[calc(100vh-4rem)]"
      >
        <div className="container-max section-padding">
          <Button variant="ghost" onClick={() => navigate('/panel')} className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Panel
          </Button>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Aplicaciones</h1>
            <p className="text-medium-gray mb-8">Esta sección está en construcción. Aquí podrás ver el estado de tus postulaciones.</p>
            
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700">Próximamente</h2>
              <p className="text-medium-gray mt-2">Estamos trabajando para que puedas seguir tus aplicaciones aquí.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ApplicationsPage;