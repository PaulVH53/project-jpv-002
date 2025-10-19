import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuccessStoryCard = ({ story }) => {
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
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <story.icon className="text-blue-600" size={24} />
          </div>
          <p className="text-blue-600 font-semibold text-sm">{story.sector}</p>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 h-16">{story.role}</h3>
        <div className="space-y-3 text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span>{story.country}</span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Link
          to={`/casos-de-exito/${story.id}`}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          Ver detalle
          <ArrowRight size={20} />
        </Link>
      </div>
    </motion.div>
  );
};

export default SuccessStoryCard;