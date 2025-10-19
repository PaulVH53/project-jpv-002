import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const RoleCard = ({ role }) => {
  const { toast } = useToast();
  const { title, description, icon: Icon, buttonText } = role;

  const handleActionClick = () => {
    toast({
      title: `🚀 Acceso para ${title}`,
      description: "Esta función te llevará a una página de login. ¡Puedes solicitarla en tu próximo prompt!",
    });
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-xl shadow-md p-8 flex flex-col text-center items-center card-hover"
    >
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
        <Icon className="text-blue-600" size={32} />
      </div>
      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
      <div className="mt-8 w-full">
        <button
          onClick={handleActionClick}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          {buttonText}
          <ArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default RoleCard;