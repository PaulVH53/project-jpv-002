import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { successStoriesData } from '@/data/successStoriesData';
import { ArrowLeft, CheckCircle, Target, BarChart2, Quote } from 'lucide-react';

const SuccessStoryDetailPage = () => {
  const { storyId } = useParams();
  const story = successStoriesData.find(s => s.id === storyId);

  if (!story) {
    return (
      <div className="container-max section-padding text-center">
        <h1 className="text-3xl font-bold">Caso de Éxito no encontrado</h1>
        <Link to="/casos-de-exito" className="mt-4 inline-block btn-primary">
          Volver a Casos de Éxito
        </Link>
      </div>
    );
  }

  const sections = [
    { icon: Target, title: 'El Reto', content: story.challenge, color: 'red' },
    { icon: CheckCircle, title: 'Nuestra Solución', content: story.solution, color: 'blue' },
    { icon: BarChart2, title: 'Impacto y Resultados', content: null, color: 'green' },
  ];

  return (
    <>
      <Helmet>
        <title>{`Caso de Éxito: ${story.role} en ${story.sector} - HeadHunting Latam`}</title>
        <meta name="description" content={story.challenge} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white min-h-screen"
      >
        <div className="relative h-80 hero-gradient">
          <img
            class="absolute inset-0 w-full h-full object-cover opacity-20"
            alt={`Imagen corporativa para el caso de éxito de ${story.sector}`}
           src="https://images.unsplash.com/photo-1626447857058-2ba6a8868cb5" />
          <div className="relative container-max h-full flex flex-col justify-center text-white p-4 sm:p-6 lg:p-8">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <Link to="/casos-de-exito" className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-4">
                <ArrowLeft size={20} />
                Volver a Casos de Éxito
              </Link>
              <p className="text-lg font-semibold text-blue-200">{story.sector} / {story.country}</p>
              <h1 className="text-4xl lg:text-5xl font-bold mt-2">{story.role}</h1>
            </motion.div>
          </div>
        </div>

        <div className="container-max section-padding -mt-20">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12"
          >
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 bg-${section.color}-100 rounded-lg flex items-center justify-center`}>
                        <section.icon className={`text-${section.color}-600`} size={24} />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                    </div>
                    {section.content ? (
                      <p className="text-lg text-gray-600 leading-relaxed">{section.content}</p>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {story.impact.metrics.map(metric => (
                          <div key={metric.label} className="bg-green-50 p-6 rounded-xl text-center">
                            <p className="text-4xl font-bold text-green-700">{metric.value}</p>
                            <p className="text-green-800 font-medium mt-1">{metric.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-8 sticky top-24"
                >
                  <Quote className="text-blue-200 mb-4" size={32} />
                  <p className="text-lg text-gray-700 italic leading-relaxed mb-6">
                    "{story.impact.testimonial.text}"
                  </p>
                  <p className="font-bold text-gray-900">{story.impact.testimonial.author}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default SuccessStoryDetailPage;