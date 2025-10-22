// src/components/Admin/JobForm.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { Input } from '@/components/ui/input';

const JobForm = ({ job, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    country: '',
    city: '',
    area: '',
    modality: '',
    employment_type: 'Tiempo Completo',
    experience_level: 'Senior',
    description: '',
    requirements: '',
    nice_to_have: '',
    benefits: '',
    currency: 'USD',
    salary_visibility: 'confidential',
    salary_min: null,
    salary_max: null,
    application_deadline: '',
    expected_start_date: '',
    urgent_hire: false,
    is_active: true,
    status: 'open',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        company: job.company || '',
        country: job.country || '',
        city: job.city || '',
        area: job.area || '',
        modality: job.modality || '',
        employment_type: job.employment_type || 'Tiempo Completo',
        experience_level: job.experience_level || 'Senior',
        description: job.description || '',
        requirements: job.requirements || '',
        nice_to_have: job.nice_to_have || '',
        benefits: job.benefits || '',
        currency: job.currency || 'USD',
        salary_visibility: job.salary_visibility || 'confidential',
        salary_min: job.salary_min || null,
        salary_max: job.salary_max || null,
        application_deadline: job.application_deadline || '',
        expected_start_date: job.expected_start_date || '',
        urgent_hire: job.urgent_hire || false,
        is_active: job.is_active !== undefined ? job.is_active : true,
        status: job.status || 'open',
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? null : parseInt(value, 10)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validaciones básicas
      if (!formData.title?.trim() || !formData.company?.trim() || !formData.country?.trim() || 
          !formData.area?.trim() || !formData.modality?.trim() || !formData.description?.trim() || 
          !formData.requirements?.trim()) {
        throw new Error('Por favor, completa todos los campos obligatorios (*).');
      }

      if (formData.salary_visibility === 'range' && formData.salary_min && formData.salary_max && 
          formData.salary_min > formData.salary_max) {
        throw new Error('El salario mínimo no puede ser mayor al salario máximo.');
      }

      // Preparar datos para Supabase
      const submissionData = {
        ...formData,
        // Asegurar que los campos numéricos sean números
        salary_min: formData.salary_min ? parseInt(formData.salary_min, 10) : null,
        salary_max: formData.salary_max ? parseInt(formData.salary_max, 10) : null,
        // Convertir fechas vacías a null
        application_deadline: formData.application_deadline || null,
        expected_start_date: formData.expected_start_date || null,
        // Asegurar valores booleanos
        urgent_hire: Boolean(formData.urgent_hire),
        is_active: Boolean(formData.is_active),
      };

      console.log('Enviando datos a Supabase:', submissionData);

      let result;
      if (job) {
        // Actualizar vacante existente
        result = await supabase
          .from('jobs')
          .update(submissionData)
          .eq('id', job.id);
      } else {
        // Crear nueva vacante
        result = await supabase
          .from('jobs')
          .insert([submissionData]);
      }

      if (result.error) {
        console.error('Error de Supabase:', result.error);
        throw new Error(`Error al ${job ? 'actualizar' : 'crear'} la vacante: ${result.error.message}`);
      }

      console.log('Vacante guardada exitosamente:', result.data);
      onSave();

    } catch (err) {
      console.error('Error en handleSubmit:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {job ? 'Editar Vacante' : 'Crear Vacante'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Sección de información básica */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Información Básica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título de la vacante *
                </label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa *
                </label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  País *
                </label>
                <Input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Ciudad
                </label>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                  Área *
                </label>
                <Input
                  type="text"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="modality" className="block text-sm font-medium text-gray-700 mb-1">
                  Modalidad *
                </label>
                <select
                  id="modality"
                  name="modality"
                  value={formData.modality}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Presencial">Presencial</option>
                  <option value="Remoto">Remoto</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sección de detalles del puesto */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Detalles del Puesto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="employment_type" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Contrato
                </label>
                <select
                  id="employment_type"
                  name="employment_type"
                  value={formData.employment_type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Tiempo Completo">Tiempo Completo</option>
                  <option value="Medio Tiempo">Medio Tiempo</option>
                  <option value="Por Contrato">Por Contrato</option>
                  <option value="Temporal">Temporal</option>
                </select>
              </div>
              <div>
                <label htmlFor="experience_level" className="block text-sm font-medium text-gray-700 mb-1">
                  Nivel de Experiencia
                </label>
                <select
                  id="experience_level"
                  name="experience_level"
                  value={formData.experience_level}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Junior">Junior</option>
                  <option value="Mid-level">Mid-level</option>
                  <option value="Senior">Senior</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sección de salario */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Información Salarial</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="salary_visibility" className="block text-sm font-medium text-gray-700 mb-1">
                  Visibilidad del Salario
                </label>
                <select
                  id="salary_visibility"
                  name="salary_visibility"
                  value={formData.salary_visibility}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="confidential">Confidencial</option>
                  <option value="range">Mostrar Rango</option>
                </select>
              </div>
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                  Moneda
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="MXN">MXN</option>
                  <option value="COP">COP</option>
                  <option value="ARS">ARS</option>
                  <option value="CLP">CLP</option>
                </select>
              </div>
              {formData.salary_visibility === 'range' && (
                <>
                  <div>
                    <label htmlFor="salary_min" className="block text-sm font-medium text-gray-700 mb-1">
                      Salario Mínimo
                    </label>
                    <Input
                      type="number"
                      id="salary_min"
                      name="salary_min"
                      value={formData.salary_min || ''}
                      onChange={handleNumberChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="salary_max" className="block text-sm font-medium text-gray-700 mb-1">
                      Salario Máximo
                    </label>
                    <Input
                      type="number"
                      id="salary_max"
                      name="salary_max"
                      value={formData.salary_max || ''}
                      onChange={handleNumberChange}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sección de fechas */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Fechas Importantes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="application_deadline" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha Límite de Postulación
                </label>
                <Input
                  type="date"
                  id="application_deadline"
                  name="application_deadline"
                  value={formData.application_deadline}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="expected_start_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha Esperada de Inicio
                </label>
                <Input
                  type="date"
                  id="expected_start_date"
                  name="expected_start_date"
                  value={formData.expected_start_date}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Sección de descripción y requisitos */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Descripción y Requisitos</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción del Puesto *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                  Requisitos *
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={4}
                  value={formData.requirements}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="nice_to_have" className="block text-sm font-medium text-gray-700 mb-1">
                  Deseable (Nice to Have)
                </label>
                <textarea
                  id="nice_to_have"
                  name="nice_to_have"
                  rows={3}
                  value={formData.nice_to_have}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">
                  Beneficios
                </label>
                <textarea
                  id="benefits"
                  name="benefits"
                  rows={3}
                  value={formData.benefits}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Sección de estado */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Estado de la Vacante</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="urgent_hire"
                  name="urgent_hire"
                  checked={formData.urgent_hire}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="urgent_hire" className="ml-2 block text-sm text-gray-700">
                  Contratación Urgente
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                  Vacante Activa
                </label>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
            >
              <Save size={16} />
              {loading ? 'Guardando...' : (job ? 'Actualizar' : 'Crear')}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default JobForm;
