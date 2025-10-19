import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, Zap, Heart } from 'lucide-react';

const AboutUs = () => {
  const values = [
    {
      icon: Globe,
      title: "Alcance Regional",
      description: "Presencia consolidada en toda Latinoamérica con deep knowledge del mercado local."
    },
    {
      icon: Shield,
      title: "Confidencialidad",
      description: "Procesos seguros y confidenciales que protegen tanto a candidatos como empresas."
    },
    {
      icon: Zap,
      title: "Eficiencia",
      description: "Metodología ágil que reduce tiempos de contratación sin comprometer la calidad."
    },
    {
      icon: Heart,
      title: "Compromiso",
      description: "Acompañamiento integral durante todo el proceso y seguimiento post-colocación."
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Quiénes <span className="text-gradient">Somos</span>
          </h2>
          <p className="text-xl text-medium-gray max-w-3xl mx-auto leading-relaxed">
            Con más de 10 años de experiencia en el mercado latinoamericano, somos especialistas en identificar, evaluar y conectar el talento ejecutivo más destacado con las oportunidades que transforman carreras y organizaciones.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              className="rounded-2xl shadow-xl w-full h-auto"
              alt="Oficinas modernas de HeadHunting Latam con vista panorámica de la ciudad"
             src="https://images.unsplash.com/photo-1655314873087-a3ca9343e8cf" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Nuestra Misión
            </h3>
            <p className="text-lg text-medium-gray leading-relaxed">
              Transformar el panorama profesional de Latinoamérica conectando el talento excepcional con oportunidades que impulsan el crecimiento tanto personal como organizacional.
            </p>
            <p className="text-lg text-medium-gray leading-relaxed">
              Creemos que cada profesional merece una oportunidad que potencie su talento, y cada empresa merece acceso al mejor capital humano de la región.
            </p>
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-accent-blue">
              <p className="text-navy font-medium italic">
                "Nuestro éxito se mide por el impacto positivo que generamos en las carreras profesionales y en el crecimiento de las organizaciones que confían en nosotros."
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg card-hover text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <value.icon className="text-accent-blue" size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
              <p className="text-medium-gray leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;