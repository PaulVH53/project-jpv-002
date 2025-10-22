// src/pages/admin/AdminJobsPage.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, AlertCircle, AlertTriangle, X } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import AdminJobList from '@/components/Admin/AdminJobList';
import JobForm from '@/components/Admin/JobForm';

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  jobTitle,
  company 
}) => {
  if (!isOpen) return null;

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
        className="bg-white rounded-xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Eliminar Vacante</h3>
              <p className="text-sm text-gray-600">Confirmar acción irreversible</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            ¿Estás seguro de que quieres eliminar permanentemente esta vacante?
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="font-medium text-red-800 text-sm">
              {jobTitle}
            </p>
            <p className="text-red-600 text-sm mt-1">
              {company}
            </p>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            <strong>Esta acción no se puede deshacer.</strong> La vacante será eliminada permanentemente de la base de datos y ya no estará disponible en el sitio web.
          </p>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              className="flex-1"
            >
              Sí, Eliminar
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AdminJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    jobId: null,
    jobTitle: '',
    company: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    urgent: 0,
    totalViews: 0,
    totalApplications: 0
  });

  // Debug: Verificar conexión Supabase
  useEffect(() => {
    console.log('AdminJobsPage montado - Verificando conexión Supabase');
    console.log('Supabase client:', supabase);
  }, []);

  // Cargar jobs desde Supabase
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Cargando jobs desde Supabase...');
      const { data: jobsData, error: supabaseError } = await supabase
        .from("jobs")
        .select("*")
        .order("updated_at", { ascending: false })
        .order("is_active", { ascending: false })
        .order("created_at", { ascending: false });

      if (supabaseError) {
        console.error('Error de Supabase:', supabaseError);
        throw supabaseError;
      }

      console.log('Jobs cargados exitosamente:', jobsData?.length || 0);
      setJobs(jobsData || []);
      calculateStats(jobsData || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('No se pudieron cargar las vacantes. Por favor, intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (jobsData) => {
    const stats = {
      total: jobsData.length,
      active: jobsData.filter(job => job.is_active).length,
      urgent: jobsData.filter(job => job.urgent_hire).length,
      totalViews: jobsData.reduce((sum, job) => sum + (job.views_count || 0), 0),
      totalApplications: jobsData.reduce((sum, job) => sum + (job.applications_count || 0), 0)
    };
    setStats(stats);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreateJob = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDeleteClick = (jobId, jobTitle, company) => {
    setDeleteModal({
      isOpen: true,
      jobId,
      jobTitle,
      company
    });
  };

  const handleDeleteConfirm = async () => {
    const { jobId } = deleteModal;
    
    try {
      console.log('Eliminando vacante:', jobId);
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);

      if (error) {
        console.error('Error de Supabase al eliminar:', error);
        throw error;
      }

      console.log('Vacante eliminada exitosamente');
      // Cerrar modal y actualizar lista
      setDeleteModal({ isOpen: false, jobId: null, jobTitle: '', company: '' });
      fetchJobs();
      
    } catch (err) {
      console.error('Error deleting job:', err);
      alert('Error al eliminar la vacante: ' + err.message);
      setDeleteModal({ isOpen: false, jobId: null, jobTitle: '', company: '' });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, jobId: null, jobTitle: '', company: '' });
  };

  const handleToggleActive = async (job) => {
    const newValue = !job.is_active;
    console.log(`Actualizando is_active de ${job.is_active} a ${newValue} para vacante:`, job.id);
    
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ 
          is_active: newValue,
          updated_at: new Date().toISOString()
        })
        .eq('id', job.id);

      if (error) {
        console.error('Error de Supabase al actualizar is_active:', error);
        throw error;
      }

      console.log('✅ Estado activo actualizado exitosamente');
      // Actualizar la lista
      fetchJobs();
      
    } catch (err) {
      console.error('❌ Error actualizando estado activo:', err);
      alert(`Error al actualizar el estado: ${err.message}`);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingJob(null);
    fetchJobs(); // Recargar la lista
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Administrar Vacantes - Latam Executive Search</title>
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
          <title>Error - Administrar Vacantes</title>
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
        <title>Administrar Vacantes - Latam Executive Search</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 min-h-screen"
      >
        <header className="bg-white shadow-sm border-b">
          <div className="container-max section-padding py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Administrar Vacantes</h1>
                <p className="text-gray-600 mt-2">Gestiona todas las vacantes publicadas en el sistema</p>
              </div>
              <Button
                onClick={handleCreateJob}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Nueva Vacante
              </Button>
            </div>
          </div>
        </header>

        {/* Estadísticas */}
        <div className="container-max section-padding">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-200 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-sm text-gray-600">Activas</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-200 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.urgent}</div>
              <div className="text-sm text-gray-600">Urgentes</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalViews}</div>
              <div className="text-sm text-gray-600">Visualizaciones</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-200 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.totalApplications}</div>
              <div className="text-sm text-gray-600">Postulaciones</div>
            </div>
          </div>

          <AdminJobList
            jobs={jobs}
            onEdit={handleEditJob}
            onDelete={handleDeleteClick}
            onToggleActive={handleToggleActive}
          />
        </div>

        {showForm && (
          <JobForm
            job={editingJob}
            onClose={handleFormClose}
            onSave={handleFormSave}
          />
        )}

        {/* Modal de confirmación de eliminación */}
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          jobTitle={deleteModal.jobTitle}
          company={deleteModal.company}
        />
      </motion.div>
    </>
  );
};

export default AdminJobsPage;
