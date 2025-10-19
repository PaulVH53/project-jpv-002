import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Building, Users, Award } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      icon: Building,
      company: "TechCorp Latam",
      position: "Chief Technology Officer",
      challenge: "Empresa fintech en rápido crecimiento necesitaba un CTO con experiencia en escalabilidad y liderazgo de equipos distribuidos.",
      solution: "Identificamos y colocamos un ejecutivo con 15+ años en tecnología financiera y experiencia previa en unicornios latinoamericanos.",
      result: "40% de mejora en time-to-market y expansión exitosa a 5 nuevos países en 18 meses.",
      timeframe: "Proceso completado en 45 días"
    },
    {
      icon: TrendingUp,
      company: "RetailMax",
      position: "VP de Operaciones",
      challenge: "Cadena de retail tradicional requería transformación digital y optimización de operaciones en 200+ tiendas.",
      solution: "Colocamos un VP con expertise en transformación digital retail y gestión de operaciones multicanal.",
      result: "25% de reducción en costos operativos y 60% de incremento en ventas online en el primer año.",
      timeframe: "Proceso completado en 30 días"
    },
    {
      icon: Users,
      company: "HealthTech Solutions",
      position: "Chief People Officer",
      challenge: "Startup de salud digital necesitaba estructurar su área de RRHH para escalar de 50 a 300 empleados.",
      solution: "Identificamos un CPO con experiencia en scaling de startups y deep knowledge en regulaciones de salud.",
      result: "Implementación exitosa de cultura organizacional y reducción del 70% en turnover voluntario.",
      timeframe: "Proceso completado en 35 días"
    }
  ];

  const metrics = [
    { number: "500+", label: "Ejecutivos colocados", icon: Users },
    { number: "95%", label: "Tasa de retención", icon: Award },
    { number: "35", label: "Días promedio", icon: TrendingUp },
    { number: "200+", label: "Empresas cliente", icon: Building }
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
            Casos de <span className="text-gradient">Éxito</span>
          </h2>
          <p className="text-xl text-medium-gray max-w-3xl mx-auto leading-relaxed">
            Historias reales de transformación empresarial a través del talento excepcional que hemos conectado con nuestros clientes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg text-center card-hover"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <metric.icon className="text-accent-blue" size={32} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{metric.number}</div>
              <div className="text-medium-gray font-medium">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-12">
          {stories.map((story, index) => (
            <motion.div
              key={story.company}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 lg:p-12"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                    <story.icon className="text-accent-blue" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{story.company}</h3>
                  <p className="text-accent-blue font-semibold mb-4">{story.position}</p>
                  <div className="bg-blue-50 px-4 py-2 rounded-lg inline-block">
                    <span className="text-navy font-medium text-sm">{story.timeframe}</span>
                  </div>
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Desafío</h4>
                    <p className="text-medium-gray leading-relaxed">{story.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Solución</h4>
                    <p className="text-medium-gray leading-relaxed">{story.solution}</p>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                    <h4 className="text-lg font-bold text-green-800 mb-3">Resultado</h4>
                    <p className="text-green-700 leading-relaxed font-medium">{story.result}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;