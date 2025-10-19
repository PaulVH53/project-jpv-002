import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Briefcase, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const firstName = user?.user_metadata?.first_name || 'Candidato';

  return (
    <>
      <Helmet>
        <title>Panel de Candidato - Latam Executive Search</title>
        <meta name="description" content="Panel de control para candidatos. Gestiona tu perfil y tus aplicaciones a vacantes." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 min-h-[calc(100vh-4rem)]"
      >
        <header className="bg-white shadow-sm">
          <div className="container-max section-padding py-8">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-4xl font-bold text-gray-900"
            >
              Bienvenido/a, <span className="text-gradient">{firstName}</span>
            </motion.h1>
            <p className="mt-2 text-lg text-medium-gray">Este es tu centro de control. Desde aquí puedes gestionar tu carrera profesional.</p>
          </div>
        </header>

        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg card-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <User className="text-accent-blue" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Gestionar Perfil</h2>
                <p className="text-medium-gray mb-8">Mantén tu información actualizada para que los reclutadores puedan encontrarte. Un perfil completo aumenta tus oportunidades.</p>
              </div>
              <button onClick={() => navigate('/perfil')} className="btn-primary w-full mt-4 flex items-center justify-center gap-2">
                Ir a mi Perfil
                <ArrowRight size={20} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg card-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Briefcase className="text-accent-blue" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Ver Aplicaciones</h2>
                <p className="text-medium-gray mb-8">Realiza un seguimiento del estado de todas tus postulaciones a vacantes y gestiona tus procesos de selección activos.</p>
              </div>
              <button onClick={() => navigate('/aplicaciones')} className="btn-primary w-full mt-4 flex items-center justify-center gap-2">
                Ver mis Aplicaciones
                <ArrowRight size={20} />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DashboardPage;