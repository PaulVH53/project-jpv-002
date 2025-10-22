// src/pages/JobsPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import FilterBar from '@/components/Jobs/FilterBar';
import JobCard from '@/components/Jobs/JobCard';
import { Briefcase, RefreshCw, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';

const JobsPage = () => {
  const [filters, setFilters] = useState({
    country: 'Todos',
    area: 'Todas',
    modality: 'Todas',
    experience_level: 'Todos',
    employment_type: 'Todos',
    salary_range: 'Todos',
  });
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar jobs desde Supabase
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      // Usar directamente la tabla jobs con filtro de activos
      const { data: jobsData, error: supabaseError } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("urgent_hire", { ascending: false })
        .order("created_at", { ascending: false })
        .order("application_deadline", { ascending: true });

      if (supabaseError) throw supabaseError;

      // Enriquecer los datos con campos calculados
      const enrichedJobs = jobsData.map(job => ({
        ...job,
        // Calcular días restantes
        days_remaining: job.application_deadline 
          ? Math.ceil((new Date(job.application_deadline) - new Date()) / (1000 * 60 * 60 * 24))
          : null,
        // Calcular estado de visualización
        display_status: (job.application_deadline && new Date(job.application_deadline) < new Date()) || job.status === 'closed' 
          ? 'closed' 
          : 'open'
      }));

      setJobs(enrichedJobs || []);

    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('No se pudieron cargar las vacantes. Por favor, intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    // NUEVA FUNCIÓN: Verificar si un trabajo coincide con el filtro salarial
    const matchesSalaryFilter = (job, salaryFilter) => {
      if (salaryFilter === 'Todos') return true;
      
      // Solo considerar trabajos con salario visible y con salary_min
      if (job.salary_visibility !== 'range' || !job.salary_min) return false;

      // Definir rangos para cada filtro (basado en salary_min)
      const salaryRanges = {
        'Hasta $2,000': { min: 0, max: 2000 },
        '$2,000 - $3,000': { min: 2000, max: 3000 },
        '$3,000 - $4,000': { min: 3000, max: 4000 },
        '$4,000 - $5,000': { min: 4000, max: 5000 },
        '$5,000 - $7,000': { min: 5000, max: 7000 },
        'Más de $7,000': { min: 7000, max: Infinity }
      };

      const selectedRange = salaryRanges[salaryFilter];
      if (!selectedRange) return false;

      // Verificar si el salario mínimo está dentro del rango
      return job.salary_min >= selectedRange.min && job.salary_min <= selectedRange.max;
    };

    return jobs.filter(job => {
      const countryMatch = filters.country === 'Todos' || job.country === filters.country;
      const areaMatch = filters.area === 'Todas' || job.area === filters.area;
      const modalityMatch = filters.modality === 'Todas' || job.modality === filters.modality;
      const experienceMatch = filters.experience_level === 'Todos' || job.experience_level === filters.experience_level;
      const employmentMatch = filters.employment_type === 'Todos' || job.employment_type === filters.employment_type;
      const salaryMatch = matchesSalaryFilter(job, filters.salary_range);
      
      return countryMatch && areaMatch && modalityMatch && experienceMatch && employmentMatch && salaryMatch;
    });
  }, [jobs, filters]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Estados de carga y error
  if (loading) {
    return (
      <>
        <Helmet>
          <title>Vacantes - Latam Executive Search</title>
          <meta name="description" content="Explora las mejores oportunidades laborales para ejecutivos y profesionales en Latinoamérica." />
        </Helmet>
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando vacantes...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Error - Vacantes</title>
          <meta name="description" content="Error al cargar las vacantes." />
        </Helmet>
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Error al cargar vacantes</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <Button 
              onClick={fetchJobs}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={16} />
              Reintentar
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Vacantes - Latam Executive Search</title>
        <meta name="description" content="Explora las mejores oportunidades laborales para ejecutivos y profesionales en Latinoamérica. Filtra por país, área, modalidad, experiencia y más." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 min-h-screen"
      >
        <header className="bg-white shadow-sm border-b">
          <div className="container-max section-padding py-12 text-center">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Encuentra tu Próxima <span className="text-gradient">Oportunidad</span>
            </motion.h1>
            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-medium-gray max-w-2xl mx-auto"
            >
              Explora las vacantes exclusivas que tenemos para profesionales de alto impacto en Latinoamérica.
            </motion.p>
            
            {/* Contador de vacantes */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                <Briefcase className="h-4 w-4" />
                <span className="font-semibold">
                  {filteredJobs.length} de {jobs.length} vacantes
                </span>
              </div>
            </motion.div>
          </div>
        </header>

        <div className="container-max section-padding">
          <FilterBar filters={filters} setFilters={setFilters} jobs={jobs} />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:col-span-2 lg:col-span-3 text-center py-16"
              >
                <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No se encontraron vacantes
                </h3>
                <p className="text-gray-500 mb-4">
                  {jobs.length === 0 
                    ? 'No hay vacantes disponibles en este momento.' 
                    : 'No hay vacantes que coincidan con tus filtros.'
                  }
                </p>
                {jobs.length > 0 && (
                  <Button 
                    onClick={() => setFilters({
                      country: 'Todos',
                      area: 'Todas',
                      modality: 'Todas',
                      experience_level: 'Todos',
                      employment_type: 'Todos',
                      salary_range: 'Todos',
                    })}
                    variant="outline"
                  >
                    Limpiar todos los filtros
                  </Button>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default JobsPage;
