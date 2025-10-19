import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import FilterBar from '@/components/Jobs/FilterBar';
import JobCard from '@/components/Jobs/JobCard';
import { Briefcase, MapPin, Laptop } from 'lucide-react';

const jobsData = [
  { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp', country: 'México', area: 'Tecnología', modality: 'Remoto' },
  { id: 2, title: 'Product Manager', company: 'InnovaSolutions', country: 'Colombia', area: 'Producto', modality: 'Híbrido' },
  { id: 3, title: 'Data Scientist', company: 'DataAnalitycs', country: 'Argentina', area: 'Datos', modality: 'Remoto' },
  { id: 4, title: 'UX/UI Designer', company: 'CreativeMinds', country: 'Chile', area: 'Diseño', modality: 'Presencial' },
  { id: 5, title: 'Backend Developer (Go)', company: 'ScaleFast', country: 'México', area: 'Tecnología', modality: 'Híbrido' },
  { id: 6, title: 'Marketing Digital Manager', company: 'GrowthBoosters', country: 'Colombia', area: 'Marketing', modality: 'Remoto' },
  { id: 7, title: 'DevOps Engineer', company: 'CloudNative', country: 'Argentina', area: 'Tecnología', modality: 'Remoto' },
  { id: 8, title: 'Head of Sales', company: 'SalesForce Latam', country: 'Chile', area: 'Ventas', modality: 'Presencial' },
];

const JobsPage = () => {
  const [filters, setFilters] = useState({
    country: 'Todos',
    area: 'Todas',
    modality: 'Todas',
  });

  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      const countryMatch = filters.country === 'Todos' || job.country === filters.country;
      const areaMatch = filters.area === 'Todas' || job.area === filters.area;
      const modalityMatch = filters.modality === 'Todas' || job.modality === filters.modality;
      return countryMatch && areaMatch && modalityMatch;
    });
  }, [filters]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Vacantes - Latam Executive Search</title>
        <meta name="description" content="Explora las mejores oportunidades laborales para ejecutivos y profesionales en Latinoamérica. Filtra por país, área y modalidad." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 min-h-screen"
      >
        <header className="bg-white shadow-sm">
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
          </div>
        </header>

        <div className="container-max section-padding">
          <FilterBar filters={filters} setFilters={setFilters} jobs={jobsData} />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
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
                <h3 className="text-2xl font-semibold text-gray-700">No se encontraron vacantes</h3>
                <p className="text-gray-500 mt-2">Intenta ajustar los filtros o revisa más tarde.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default JobsPage;