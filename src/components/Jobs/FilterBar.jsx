import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Laptop } from 'lucide-react';

const FilterBar = ({ filters, setFilters, jobs }) => {
  const countries = ['Todos', ...new Set(jobs.map(job => job.country))];
  const areas = ['Todas', ...new Set(jobs.map(job => job.area))];
  const modalities = ['Todas', ...new Set(jobs.map(job => job.modality))];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filterOptions = [
    { name: 'country', label: 'País', options: countries, icon: MapPin },
    { name: 'area', label: 'Área', options: areas, icon: Briefcase },
    { name: 'modality', label: 'Modalidad', options: modalities, icon: Laptop },
  ];

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="grid md:grid-cols-3 gap-6">
        {filterOptions.map((filter, index) => (
          <div key={filter.name} className="relative">
            <filter.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              name={filter.name}
              value={filters[filter.name]}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all appearance-none"
            >
              {filter.options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FilterBar;