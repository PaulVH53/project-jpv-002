import React from 'react';
import { motion } from 'framer-motion';
import { Search, UserCheck, HeartHandshake as Handshake } from 'lucide-react';
const Process = () => {
  const steps = [{
    icon: Search,
    number: "01",
    title: "Identificación y Búsqueda",
    description: "Utilizamos metodologías avanzadas de sourcing y nuestra extensa red de contactos para identificar candidatos que no solo cumplan con los requisitos técnicos, sino que también se alineen con la cultura organizacional.",
    features: ["Mapeo del mercado", "Búsqueda activa y pasiva", "Evaluación cultural"]
  }, {
    icon: UserCheck,
    number: "02",
    title: "Evaluación Integral",
    description: "Proceso riguroso de evaluación que incluye entrevistas técnicas, assessment de competencias, verificación de referencias y evaluación psicométrica para garantizar el fit perfecto.",
    features: ["Entrevistas especializadas", "Assessment de competencias", "Verificación exhaustiva"]
  }, {
    icon: Handshake,
    number: "03",
    title: "Presentación y Cierre",
    description: "Presentamos únicamente los candidatos más calificados, facilitamos el proceso de entrevistas y negociamos condiciones para asegurar una incorporación exitosa y duradera.",
    features: ["Shortlist exclusivo", "Facilitación de entrevistas", "Negociación y cierre"]
  }];
  return <section className="section-padding bg-white">
      <div className="container-max">
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Nuestro <span className="text-gradient">Proceso</span>
          </h2>
          <p className="text-lg sm:text-xl text-medium-gray max-w-3xl mx-auto leading-relaxed">
            Un enfoque metodológico y personalizado que garantiza resultados excepcionales en cada búsqueda ejecutiva.
          </p>
        </motion.div>

        <div className="space-y-16">
          {steps.map((step, index) => <motion.div key={step.number} initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: index * 0.2
        }} viewport={{
          once: true
        }} className={`grid lg:grid-cols-2 gap-8 md:gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative">
                  <img className="rounded-2xl shadow-xl w-full h-auto" alt={`Proceso de ${step.title} en HeadHunting Latam`} src="https://horizons-cdn.hostinger.com/7718c394-bb74-4e8b-820e-404e99c30b50/1536737820470-1-C0nCp.webp" />
                  <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-accent-blue rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-base sm:text-lg">{step.number}</span>
                  </div>
                </div>
              </div>
              
              <div className={`space-y-4 md:space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full mb-2">
                  <step.icon className="text-accent-blue" size={32} />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{step.title}</h3>
                
                <p className="text-base sm:text-lg text-medium-gray leading-relaxed">
                  {step.description}
                </p>
                
                <ul className="space-y-3">
                  {step.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent-blue rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 font-medium text-sm sm:text-base">{feature}</span>
                    </li>)}
                </ul>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default Process;