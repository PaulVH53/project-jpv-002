// src/components/Admin/AdminJobList.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Play, Pause, Calendar, MapPin, Briefcase, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tooltip } from '@/components/ui/tooltip';

const AdminJobList = ({ jobs, onEdit, onDelete, onToggleActive }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Función para normalizar texto (quitar acentos)
  const normalizeText = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const filteredJobs = jobs.filter(job => {
    const normalizedSearch = normalizeText(searchTerm);
    
    const matchesSearch = 
      normalizeText(job.title || '').includes(normalizedSearch) ||
      normalizeText(job.company || '').includes(normalizedSearch) ||
      normalizeText(job.country || '').includes(normalizedSearch) ||
      (job.city && normalizeText(job.city).includes(normalizedSearch)) ||
      normalizeText(job.area || '').includes(normalizedSearch) ||
      normalizeText(job.modality || '').includes(normalizedSearch);
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && job.is_active) ||
                         (statusFilter === 'inactive' && !job.is_active);

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const getStatusBadge = (job) => {
    if (!job.is_active) {
      return <Badge variant="secondary">Inactiva</Badge>;
    }
    return <Badge variant="default">Activa</Badge>;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
    >
      {/* Header con búsqueda y filtros */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex-1 w-full md:max-w-md">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="text"
                placeholder="Buscar por título, empresa, país, ciudad, área o modalidad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-accent-blue text-sm"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activas</option>
              <option value="inactive">Inactivas</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vacante
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ubicación
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fechas
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estadísticas
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <motion.tr
                key={job.id}
                variants={itemVariants}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {job.title}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Briefcase size={14} />
                        {job.company}
                      </div>
                      {job.urgent_hire && (
                        <Badge variant="destructive" className="mt-1 text-xs">
                          Urgente
                        </Badge>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 flex items-center gap-1">
                    <MapPin size={14} />
                    {job.city ? `${job.city}, ${job.country}` : job.country}
                  </div>
                  <div className="text-sm text-gray-500">{job.area}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(job)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(job.created_at)}
                  </div>
                  {job.application_deadline && (
                    <div className="text-xs">
                      Cierra: {formatDate(job.application_deadline)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>👁️ {job.views_count || 0}</div>
                  <div>📄 {job.applications_count || 0}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Tooltip content="Editar vacante" position="top">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(job)}
                        className="text-blue-600 hover:text-blue-900 hover:bg-blue-50"
                      >
                        <Edit size={16} />
                      </Button>
                    </Tooltip>

                    <Tooltip 
                      content={job.is_active ? "Desactivar vacante" : "Activar vacante"} 
                      position="top"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleActive(job)}
                        className={
                          job.is_active
                            ? "text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50"
                            : "text-green-600 hover:text-green-900 hover:bg-green-50"
                        }
                      >
                        {job.is_active ? <Pause size={16} /> : <Play size={16} />}
                      </Button>
                    </Tooltip>

                    <Tooltip content="Eliminar vacante" position="top">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(job.id, job.title, job.company)}
                        className="text-red-600 hover:text-red-900 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </Tooltip>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {jobs.length === 0
              ? "No hay vacantes"
              : "No se encontraron resultados"}
          </h3>
          <p className="text-gray-500">
            {jobs.length === 0
              ? "Comienza creando tu primera vacante."
              : "Intenta con otros términos de búsqueda o filtros."}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default AdminJobList;
