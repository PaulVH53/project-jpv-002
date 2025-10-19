import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Testimonials = () => {
  const { toast } = useToast();
  const testimonials = [
    {
      name: "María González",
      position: "CEO",
      company: "InnovaTech Solutions",
      image: "Professional woman CEO in modern office setting",
      rating: 5,
      text: "HeadHunting Latam transformó completamente nuestro proceso de contratación ejecutiva. En menos de 30 días encontraron al CTO perfecto para nuestra empresa. Su metodología es impecable y el seguimiento post-colocación excepcional."
    },
    {
      name: "Carlos Mendoza",
      position: "VP de Recursos Humanos", 
      company: "GlobalCorp",
      image: "Professional man VP in corporate environment",
      rating: 5,
      text: "Llevamos 3 años trabajando con ellos y han sido fundamentales en nuestro crecimiento. Cada ejecutivo que nos han presentado ha superado nuestras expectativas. Su conocimiento del mercado latinoamericano es incomparable."
    },
    {
      name: "Ana Rodríguez",
      position: "Directora de Operaciones",
      company: "TechStart Ventures",
      image: "Professional woman director in startup office environment",
      rating: 5,
      text: "Como startup en crecimiento, necesitábamos talento senior que entendiera nuestro contexto. HeadHunting Latam no solo encontró a los candidatos ideales, sino que facilitó todo el proceso de integración. Altamente recomendados."
    },
    {
      name: "Roberto Silva",
      position: "Fundador & CEO",
      company: "EcoSolutions",
      image: "Professional man founder in sustainable business office",
      rating: 5,
      text: "Su enfoque personalizado y comprensión profunda de nuestra industria hizo la diferencia. Encontraron exactamente el perfil que buscábamos para liderar nuestra expansión regional. Profesionalismo de primer nivel."
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Lo que dicen nuestros <span className="text-gradient">Clientes</span>
          </h2>
          <p className="text-xl text-medium-gray max-w-3xl mx-auto leading-relaxed">
            La confianza de líderes empresariales de toda Latinoamérica respalda nuestro compromiso con la excelencia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 card-hover relative"
            >
              <div className="absolute top-6 right-6">
                <Quote className="text-blue-200" size={40} />
              </div>
              
              <div className="flex items-center mb-6">
                <img 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                  alt={`${testimonial.name} - ${testimonial.position} en ${testimonial.company}`}
                 src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-accent-blue font-medium">{testimonial.position}</p>
                  <p className="text-medium-gray text-sm">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-navy text-white rounded-2xl p-12">
            <h3 className="text-3xl font-bold mb-6">¿Listo para encontrar tu próximo líder?</h3>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Únete a más de 200 empresas que han transformado sus equipos ejecutivos con nosotros.
            </p>
            <button 
              onClick={() => {
                toast({
                  title: "🚧 Esta función no está implementada aún",
                  description: "¡Pero no te preocupes! Puedes solicitarla en tu próximo prompt! 🚀"
                });
              }}
              className="bg-accent-blue text-white hover:bg-blue-700 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Iniciar búsqueda ejecutiva
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;