// src/components/Jobs/JobCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, Laptop, ArrowRight, Clock, Calendar, Eye, EyeOff, TrendingUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCardClick = () => {
    // Navegar a la página de detalle de la vacante
    navigate(`/vacantes/${job.id}`);
  };

  const handleApplyClick = (e) => {
    e.stopPropagation(); // Evitar que el click se propague al card
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

  // Calcular días restantes
  const getDaysRemaining = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = job.application_deadline ? getDaysRemaining(job.application_deadline) : null;

  // Función: Formatear el rango salarial correctamente
  const formatSalaryRange = () => {
    if (job.salary_visibility === 'range' && job.salary_min && job.salary_max) {
      // Formatear a "USD 2,500 - 3,500"
      const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `USD ${formatNumber(job.salary_min)} - ${formatNumber(job.salary_max)}`;
    } else if (job.salary_visibility === 'range' && job.salary_min) {
      // Solo hay mínimo
      const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `USD ${formatNumber(job.salary_min)}+`;
    }
    return null;
  };

  // Función para determinar si mostrar información salarial
  const shouldShowSalary = job.salary_visibility === 'range' && (job.salary_min || job.salary_max);
  const salaryRange = formatSalaryRange();

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-xl shadow-md p-6 flex flex-col card-hover border border-gray-100 cursor-pointer"
      onClick={handleCardClick} // ✅ Todo el card es clickeable
    >
      <div className="flex-grow">
        {/* Header con título y empresa */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-accent-blue font-semibold text-sm mb-1">{job.company}</p>
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{job.title}</h3>
          </div>
          {job.urgent_hire && (
            <Badge variant="destructive" className="ml-2 flex-shrink-0">
              Urgente
            </Badge>
          )}
        </div>

        {/* Información básica */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-medium-gray">
            <MapPin size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm">
              {job.city ? `${job.city}, ${job.country}` : job.country}
            </span>
          </div>
          <div className="flex items-center gap-2 text-medium-gray">
            <Briefcase size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm">{job.area}</span>
          </div>
          <div className="flex items-center gap-2 text-medium-gray">
            <Laptop size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm">{job.modality}</span>
          </div>
          {job.experience_level && (
            <div className="flex items-center gap-2 text-medium-gray">
              <Clock size={16} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm">{job.experience_level}</span>
            </div>
          )}
        </div>

        {/* Badges informativos - SIN badge de salario */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
            {job.employment_type || 'Tiempo Completo'}
          </Badge>

          {daysRemaining !== null && daysRemaining > 0 && (
            <Badge 
              variant={daysRemaining <= 7 ? "destructive" : "outline"} 
              className="text-xs"
            >
              <Calendar size={12} className="mr-1" />
              {daysRemaining}d
            </Badge>
          )}

          {job.display_status === 'closed' && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
              Cerrada
            </Badge>
          )}
        </div>

        {/* Información salarial destacada - CORREGIDA: Sin ícono DollarSign */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            {shouldShowSalary && salaryRange ? (
              <>
                {/* Cambiamos DollarSign por TrendingUp que no muestra símbolo $ */}
                <TrendingUp className="h-4 w-4 text-green-600" />
                <div>
                  <span className="text-sm font-medium text-gray-700">Rango Salarial:</span>
                  <span className="text-sm font-semibold text-green-600 ml-2">
                    {salaryRange}
                  </span>
                </div>
              </>
            ) : (
              <>
                <EyeOff className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-700">Rango Salarial Confidencial</span>
                  <span className="text-xs text-gray-500 block">Se revela durante el proceso</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Descripción breve */}
        {job.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {job.description}
          </p>
        )}

        {/* Estadísticas (si están disponibles) */}
        {(job.views_count > 0 || job.applications_count > 0) && (
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
            {job.views_count > 0 && (
              <span>{job.views_count} visualizaciones</span>
            )}
            {job.applications_count > 0 && (
              <span>{job.applications_count} postulaciones</span>
            )}
          </div>
        )}
      </div>

      {/* Botón de postulación */}
      <div className="mt-4">
        <Button
          onClick={handleApplyClick} // ✅ Ahora usa handleApplyClick que evita la propagación
          className="w-full btn-primary flex items-center justify-center gap-2"
          disabled={job.display_status === 'closed'}
        >
          {job.display_status === 'closed' ? 'Vacante Cerrada' : 'Postular'}
          <ArrowRight size={16} />
        </Button>

        {/* Mensajes informativos */}
        {job.display_status === 'closed' && (
          <p className="text-xs text-center text-gray-500 mt-2">
            Esta vacante ya no acepta aplicaciones
          </p>
        )}
        
        {daysRemaining !== null && daysRemaining > 0 && daysRemaining <= 7 && (
          <p className="text-xs text-center text-orange-600 font-medium mt-2">
            ⏳ Aplica pronto - se cierra en {daysRemaining} día{daysRemaining !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default JobCard;
