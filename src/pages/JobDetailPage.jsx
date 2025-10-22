// src/pages/JobDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Briefcase, Laptop, Clock, Calendar, Eye, EyeOff, TrendingUp, ArrowLeft, CheckCircle, DollarSign, Users, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchJobDetail();
  }, [jobId]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtener el detalle de la vacante
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .eq('is_active', true)
        .single();

      if (jobError) throw jobError;

      if (!jobData) {
        setError('Vacante no encontrada');
        return;
      }

      setJob(jobData);

      // Incrementar contador de vistas
      await supabase
        .from('jobs')
        .update({ views_count: (jobData.views_count || 0) + 1 })
        .eq('id', jobId);

      // Obtener vacantes relacionadas
      const { data: relatedData } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .eq('area', jobData.area)
        .neq('id', jobId)
        .order('created_at', { ascending: false })
        .limit(3);

      setRelatedJobs(relatedData || []);

    } catch (err) {
      console.error('Error fetching job detail:', err);
      setError('No se pudo cargar la vacante. Por favor, intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = () => {
    toast({
      title: "🚧 Postulación en proceso...",
      description: "Esta función te permitirá postular a la vacante. ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  const formatSalaryRange = () => {
    if (job.salary_visibility === 'range' && job.salary_min && job.salary_max) {
      const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `${job.currency} ${formatNumber(job.salary_min)} - ${formatNumber(job.salary_max)}`;
    } else if (job.salary_visibility === 'range' && job.salary_min) {
      const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `${job.currency} ${formatNumber(job.salary_min)}+`;
    }
    return null;
  };

  const getDaysRemaining = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Cargando vacante - Latam Executive Search</title>
        </Helmet>
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando vacante...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !job) {
    return (
      <>
        <Helmet>
          <title>Vacante no encontrada - Latam Executive Search</title>
        </Helmet>
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Vacante no disponible</h3>
            <p className="text-gray-500 mb-4">{error || 'La vacante que buscas no existe o ha sido desactivada.'}</p>
            <Button 
              onClick={() => window.history.back()}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Volver a vacantes
            </Button>
          </div>
        </div>
      </>
    );
  }

  const daysRemaining = job.application_deadline ? getDaysRemaining(job.application_deadline) : null;
  const salaryRange = formatSalaryRange();

  return (
    <>
      <Helmet>
        <title>{job.title} - {job.company} | Latam Executive Search</title>
        <meta name="description" content={job.description?.substring(0, 160) + '...'} />
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 min-h-screen"
      >
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container-max section-padding py-6">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft size={16} />
              Volver a vacantes
            </Button>
            
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {job.area}
                  </Badge>
                  {job.urgent_hire && (
                    <Badge variant="destructive">
                      Contratación Urgente
                    </Badge>
                  )}
                  {daysRemaining !== null && daysRemaining > 0 && (
                    <Badge variant={daysRemaining <= 7 ? "destructive" : "outline"}>
                      <Calendar size={12} className="mr-1" />
                      {daysRemaining} día{daysRemaining !== 1 ? 's' : ''} restante{daysRemaining !== 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {job.title}
                </h1>
                
                <div className="flex items-center gap-4 text-lg text-gray-700 mb-4">
                  <div className="flex items-center gap-2">
                    <Building size={20} className="text-gray-500" />
                    <span className="font-semibold">{job.company}</span>
                  </div>
                </div>

                {/* Información básica */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin size={18} className="text-gray-400" />
                    <span>{job.city ? `${job.city}, ${job.country}` : job.country}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Laptop size={18} className="text-gray-400" />
                    <span>{job.modality}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Briefcase size={18} className="text-gray-400" />
                    <span>{job.employment_type || 'Tiempo Completo'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock size={18} className="text-gray-400" />
                    <span>{job.experience_level || 'Senior'}</span>
                  </div>
                </div>

                {/* Información salarial */}
                {salaryRange ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-800">Rango Salarial:</p>
                        <p className="text-lg font-bold text-green-600">{salaryRange}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <EyeOff className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-semibold text-gray-700">Rango Salarial Confidencial</p>
                        <p className="text-sm text-gray-600">Se revela durante el proceso de selección</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar de aplicación */}
              <div className="lg:w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{job.company}</h3>
                  <p className="text-sm text-gray-600 mt-1">Está buscando talento</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Visualizaciones:</span>
                    <span className="font-medium">{job.views_count || 0}</span>
                  </div>
                  {job.applications_count > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Postulaciones:</span>
                      <span className="font-medium">{job.applications_count}</span>
                    </div>
                  )}
                  {job.application_deadline && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cierra:</span>
                      <span className="font-medium">
                        {new Date(job.application_deadline).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleApplyClick}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 text-lg font-semibold"
                  size="lg"
                >
                  Postular a esta vacante
                </Button>

                {daysRemaining !== null && daysRemaining > 0 && daysRemaining <= 7 && (
                  <p className="text-sm text-center text-orange-600 font-medium mt-3">
                    ⏳ Aplica pronto - se cierra en {daysRemaining} día{daysRemaining !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenido de la vacante */}
            <div className="lg:col-span-2 space-y-8">
              {/* Descripción */}
              <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción del Puesto</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </section>

              {/* Requisitos */}
              <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requisitos</h2>
                <div className="prose prose-gray max-w-none">
                  <ul className="space-y-2">
                    {job.requirements?.split('\n').filter(req => req.trim()).map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{requirement.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Deseable (si existe) */}
              {job.nice_to_have && (
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Deseable (Nice to Have)</h2>
                  <div className="prose prose-gray max-w-none">
                    <ul className="space-y-2">
                      {job.nice_to_have.split('\n').filter(item => item.trim()).map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <CheckCircle size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{item.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Beneficios (si existen) */}
              {job.benefits && (
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Beneficios</h2>
                  <div className="prose prose-gray max-w-none">
                    <ul className="space-y-2">
                      {job.benefits.split('\n').filter(benefit => benefit.trim()).map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <CheckCircle size={18} className="text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>{benefit.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}
            </div>

            {/* Vacantes relacionadas */}
            {relatedJobs.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Oportunidades Similares</h3>
                <div className="space-y-4">
                  {relatedJobs.map(relatedJob => (
                    <motion.div
                      key={relatedJob.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => window.location.href = `/vacantes/${relatedJob.id}`}
                    >
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {relatedJob.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">{relatedJob.company}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin size={12} />
                        <span>{relatedJob.city || relatedJob.country}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default JobDetailPage;
