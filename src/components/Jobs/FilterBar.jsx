// src/components/Jobs/FilterBar.jsx (Versión final con Badge)
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Laptop, Clock, DollarSign, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FilterBar = ({ filters, setFilters, jobs }) => {
  // Extraer opciones únicas de los trabajos
  const countries = ['Todos', ...new Set(jobs.map(job => job.country).filter(Boolean))];
  const areas = ['Todas', ...new Set(jobs.map(job => job.area).filter(Boolean))];
  const modalities = ['Todas', ...new Set(jobs.map(job => job.modality).filter(Boolean))];
  const experienceLevels = ['Todos', ...new Set(jobs.map(job => job.experience_level).filter(Boolean))];
  const employmentTypes = ['Todos', ...new Set(jobs.map(job => job.employment_type).filter(Boolean))];
  
  // Opciones predefinidas para salario
  const salaryRanges = [
    'Todos',
    'Hasta $2,000',
    '$2,000 - $3,000',
    '$3,000 - $4,000',
    '$4,000 - $5,000',
    'Más de $5,000'
  ];

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      country: 'Todos',
      area: 'Todas',
      modality: 'Todas',
      experience_level: 'Todos',
      employment_type: 'Todos',
      salary_range: 'Todos',
    });
  };

  // Contar filtros activos
  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== 'Todos' && value !== 'Todas'
  ).length;

  const filterOptions = [
    { 
      name: 'country', 
      label: 'País', 
      options: countries, 
      icon: MapPin 
    },
    { 
      name: 'area', 
      label: 'Área', 
      options: areas, 
      icon: Briefcase 
    },
    { 
      name: 'modality', 
      label: 'Modalidad', 
      options: modalities, 
      icon: Laptop 
    },
    { 
      name: 'experience_level', 
      label: 'Experiencia', 
      options: experienceLevels, 
      icon: Clock 
    },
    { 
      name: 'employment_type', 
      label: 'Tipo de Contrato', 
      options: employmentTypes, 
      icon: Briefcase 
    },
    { 
      name: 'salary_range', 
      label: 'Rango Salarial', 
      options: salaryRanges, 
      icon: DollarSign 
    },
  ];

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    >
      {/* Header de filtros */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-800">Filtrar Vacantes</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount} activo{activeFiltersCount !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
            Limpiar
          </Button>
        )}
      </div>

      {/* Grid de filtros responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {filterOptions.map((filter) => (
          <div key={filter.name} className="relative">
            <label htmlFor={filter.name} className="block text-sm font-medium text-gray-700 mb-1">
              {filter.label}
            </label>
            <div className="relative">
              <filter.icon 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                size={16} 
              />
              <select
                id={filter.name}
                name={filter.name}
                value={filters[filter.name] || 'Todos'}
                onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all appearance-none text-sm bg-white"
              >
                {filter.options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros activos (chips) */}
      {activeFiltersCount > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (value === 'Todos' || value === 'Todas') return null;
            
            const filterConfig = filterOptions.find(f => f.name === key);
            return (
              <Badge 
                key={key}
                variant="outline"
                className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200"
              >
                {filterConfig?.icon && <filterConfig.icon size={12} />}
                <span className="text-xs">
                  {filterConfig?.label}: {value}
                </span>
                <button
                  onClick={() => handleFilterChange(key, key === 'salary_range' ? 'Todos' : key === 'country' ? 'Todos' : key === 'area' ? 'Todas' : 'Todos')}
                  className="ml-1 hover:text-blue-900"
                >
                  <X size={12} />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default FilterBar;
