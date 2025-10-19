import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { successStoriesData } from '@/data/successStoriesData';
import SuccessStoryCard from '@/components/Success/SuccessStoryCard';

const SuccessStoriesPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Casos de Éxito - HeadHunting Latam</title>
        <meta name="description" content="Descubre cómo hemos ayudado a empresas líderes en Latinoamérica a encontrar el talento ejecutivo que necesitan para transformar sus organizaciones." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 min-h-screen"
      >
        <header className="bg-white shadow-sm">
          <div className="container-max section-padding py-12 text-center">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Nuestros <span className="text-gradient">Casos de Éxito</span>
            </motion.h1>
            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Historias reales de cómo conectamos talento excepcional con oportunidades que generan un impacto medible.
            </motion.p>
          </div>
        </header>

        <div className="container-max section-padding">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {successStoriesData.map(story => (
              <SuccessStoryCard key={story.id} story={story} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default SuccessStoriesPage;