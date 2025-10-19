import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Footer = () => {
  const handleContactClick = () => {
    toast({
      title: "🚧 Esta función no está implementada aún",
      description: "¡Pero no te preocupes! Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contacto@headhuntinglatam.com",
      href: "mailto:contacto@headhuntinglatam.com"
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: "+52 55 1234 5678",
      href: "tel:+525512345678"
    },
    {
      icon: MapPin,
      label: "Oficina Principal",
      value: "Ciudad de México, México",
      href: "#"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  const quickLinks = [
    "Nosotros",
    "Servicios",
    "Proceso",
    "Casos de Éxito",
    "Blog",
    "Carreras"
  ];

  const services = [
    "Executive Search",
    "Board Search",
    "Interim Management",
    "Talent Mapping",
    "Succession Planning",
    "Assessment Center"
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <span className="text-3xl font-bold text-gradient mb-6 block">Latam Executive Search</span>
            <p className="text-gray-300 leading-relaxed mb-6">
              Conectamos el mejor talento ejecutivo con las oportunidades más desafiantes en Latinoamérica.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  onClick={handleContactClick}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent-blue transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={handleContactClick}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">Servicios</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={handleContactClick}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">Contacto</h3>
            <div className="space-y-4">
              {contactInfo.map((contact) => (
                <div key={contact.label} className="flex items-start gap-3">
                  <contact.icon className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-gray-400 text-sm">{contact.label}</p>
                    <button
                      onClick={handleContactClick}
                      className="text-white hover:text-blue-400 transition-colors duration-300"
                    >
                      {contact.value}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Latam Executive Search. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <button
                onClick={handleContactClick}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Política de Privacidad
              </button>
              <button
                onClick={handleContactClick}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Términos de Servicio
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;