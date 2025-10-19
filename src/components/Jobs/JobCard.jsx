import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Laptop, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const JobCard = ({ job }) => {
  const { toast } = useToast();

  const handleApplyClick = () => {
    toast({
      title: "🚧 Postulación en camino...",
      description: "Esta función te llevará al detalle de la vacante. ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
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
      className="bg-white rounded-xl shadow-md p-6 flex flex-col card-hover"
    >
      <div className="flex-grow">
        <p className="text-accent-blue font-semibold text-sm mb-2">{job.company}</p>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{job.title}</h3>
        <div className="space-y-3 text-medium-gray">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span>{job.country}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-gray-400" />
            <span>{job.area}</span>
          </div>
          <div className="flex items-center gap-2">
            <Laptop size={16} className="text-gray-400" />
            <span>{job.modality}</span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleApplyClick}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          Postular
          <ArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default JobCard;