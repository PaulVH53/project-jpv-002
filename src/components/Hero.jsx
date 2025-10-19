import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Target, Award } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
const Hero = () => {
  const handleCTAClick = () => {
    toast({
      title: "🚧 Esta función no está implementada aún",
      description: "¡Pero no te preocupes! Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };
  return <section className="hero-gradient section-padding pt-24 min-h-screen flex items-center">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Conectamos el <span className="text-blue-300">mejor talento</span> con las mejores oportunidades
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Somos la plataforma líder de headhunting en Latinoamérica, especializada en conectar profesionales excepcionales con empresas de alto nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button onClick={handleCTAClick} className="btn-primary flex items-center justify-center gap-2">
                Encuentra tu próximo talento
                <ArrowRight size={20} />
              </button>
              <button onClick={handleCTAClick} className="btn-secondary">
                Explora oportunidades
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="text-blue-300" size={32} />
                </div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-blue-100 text-sm">Profesionales colocados</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Target className="text-blue-300" size={32} />
                </div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-blue-100 text-sm">Tasa de éxito</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Award className="text-blue-300" size={32} />
                </div>
                <div className="text-2xl font-bold">200+</div>
                <div className="text-blue-100 text-sm">Empresas aliadas</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="relative">
            <div className="relative z-10">
              <img className="rounded-2xl shadow-2xl w-full h-auto" alt="Equipo profesional de HeadHunting Latam trabajando en oficina moderna" src="https://horizons-cdn.hostinger.com/7718c394-bb74-4e8b-820e-404e99c30b50/a-guide-to-different-classes-of-office-buildings_-class-a-class-b-class-c-On0BP.webp" />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-accent-blue rounded-2xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Hero;