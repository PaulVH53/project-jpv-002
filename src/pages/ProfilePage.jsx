import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    executiveSummary: '',
    currentPosition: '',
    currentCompany: '',
    englishLevel: '',
    spanishLevel: '',
    phone: '',
    country: '',
    occupations: '',
    skills: '',
    experienceSector: '',
    linkedin: '',
    cv_url: '',
  });
  const [cvFile, setCvFile] = useState(null);
  const [cvFileName, setCvFileName] = useState('');
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      if (user) {
        let { data, error, status } = await supabase
          .from('profiles')
          .select(`first_name, last_name, executive_summary, current_position, current_company, english_level, spanish_level, phone, country, occupations, skills, experience_sector, linkedin, cv_url`)
          .eq('id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        const savedDraft = localStorage.getItem(`draftProfile_${user.id}`);
        const draftProfile = savedDraft ? JSON.parse(savedDraft) : {};

        if (data) {
          const dbProfile = {
            firstName: data.first_name || user.user_metadata?.first_name || '',
            lastName: data.last_name || user.user_metadata?.last_name || '',
            email: user.email,
            executiveSummary: data.executive_summary || '',
            currentPosition: data.current_position || '',
            currentCompany: data.current_company || '',
            englishLevel: data.english_level || '',
            spanishLevel: data.spanish_level || '',
            phone: data.phone || '',
            country: data.country || '',
            occupations: data.occupations || '',
            skills: data.skills || '',
            experienceSector: data.experience_sector || '',
            linkedin: data.linkedin || '',
            cv_url: data.cv_url || '',
          };
          
          setProfile({ ...dbProfile, ...draftProfile });

          if(data.cv_url){
            const parts = data.cv_url.split('/');
            setCvFileName(parts[parts.length - 1]);
          }
        } else {
           setProfile(prev => ({ ...prev, ...draftProfile, email: user.email }));
        }
      }
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
      setInitialLoadDone(true);
    }
  }, [user, toast]);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user, getProfile]);
  
  useEffect(() => {
    if (initialLoadDone && user) {
      localStorage.setItem(`draftProfile_${user.id}`, JSON.stringify(profile));
    }
  }, [profile, initialLoadDone, user]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    setProfile(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: 'Archivo demasiado grande', description: 'El CV no debe superar los 5 MB.', variant: 'destructive'});
        return;
      }
      if (!['application/pdf', 'image/jpeg'].includes(file.type)) {
        toast({ title: 'Formato de archivo no válido', description: 'Por favor, sube un archivo PDF o JPG.', variant: 'destructive'});
        return;
      }
      setCvFile(file);
      setCvFileName(file.name);
    }
  };

  const validateLinkedIn = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    return !url || regex.test(url);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateLinkedIn(profile.linkedin)) {
      toast({ title: 'URL de LinkedIn inválida', description: 'Introduce una URL de perfil de LinkedIn válida.', variant: 'destructive' });
      return;
    }
    
    try {
        setSaving(true);
        let cv_url = profile.cv_url;

        if (cvFile) {
            const filePath = `${user.id}/${cvFileName}`;
            const { error: uploadError } = await supabase.storage
                .from('cvs')
                .upload(filePath, cvFile, { upsert: true });
            
            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage.from('cvs').getPublicUrl(filePath);
            cv_url = publicUrlData.publicUrl;
        }

        const updates = {
            id: user.id,
            first_name: profile.firstName,
            last_name: profile.lastName,
            executive_summary: profile.executiveSummary,
            current_position: profile.currentPosition,
            current_company: profile.currentCompany,
            english_level: profile.englishLevel,
            spanish_level: profile.spanishLevel,
            phone: profile.phone,
            country: profile.country,
            occupations: profile.occupations,
            skills: profile.skills,
            experience_sector: profile.experienceSector,
            linkedin: profile.linkedin,
            cv_url: cv_url,
            updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);
        if (error) throw error;
        
        localStorage.removeItem(`draftProfile_${user.id}`);
        toast({ title: '¡Perfil Actualizado!', description: 'Tus datos se han guardado correctamente.' });

    } catch (error) {
        toast({ title: 'Error al guardar', description: error.message, variant: 'destructive' });
    } finally {
        setSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
        localStorage.removeItem(`draftProfile_${user.id}`);
    }
    navigate('/panel');
  };

  const languageLevels = ['Básico', 'Conversacional', 'Fluido'];

  if (loading) {
      return <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">Cargando perfil...</div>
  }

  return (
    <>
      <Helmet>
        <title>Mi Perfil - Latam Executive Search</title>
        <meta name="description" content="Gestiona tu perfil profesional para destacar en los procesos de selección." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 min-h-[calc(100vh-4rem)]"
      >
        <div className="container-max section-padding">
          <Button variant="ghost" onClick={() => navigate('/panel')} className="mb-8 -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Panel
          </Button>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Perfil del Candidato</h1>
            <p className="text-medium-gray mb-8">Completa tu perfil para aumentar tus oportunidades. Los campos marcados con * son obligatorios.</p>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombres *</Label>
                  <Input id="firstName" value={profile.firstName} onChange={e => setProfile({...profile, firstName: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellidos *</Label>
                  <Input id="lastName" value={profile.lastName} onChange={e => setProfile({...profile, lastName: e.target.value})} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input id="email" type="email" value={profile.email} required disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="executiveSummary">Resumen Ejecutivo *</Label>
                <Textarea
                  id="executiveSummary"
                  value={profile.executiveSummary}
                  onChange={handleChange}
                  maxLength="500"
                  required
                  placeholder="Describe brevemente tu perfil profesional, tus logros clave y tus objetivos de carrera."
                />
                <p className="text-sm text-gray-500 text-right">{profile.executiveSummary.length} / 500</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPosition">Puesto actual o último puesto</Label>
                  <Input id="currentPosition" value={profile.currentPosition} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentCompany">Empresa actual o última empresa</Label>
                  <Input id="currentCompany" value={profile.currentCompany} onChange={handleChange} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="spanishLevel">Nivel de español</Label>
                  <Select onValueChange={(value) => handleSelectChange('spanishLevel', value)} value={profile.spanishLevel}>
                    <SelectTrigger><SelectValue placeholder="Selecciona un nivel" /></SelectTrigger>
                    <SelectContent>
                      {languageLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="englishLevel">Nivel de inglés</Label>
                  <Select onValueChange={(value) => handleSelectChange('englishLevel', value)} value={profile.englishLevel}>
                    <SelectTrigger><SelectValue placeholder="Selecciona un nivel" /></SelectTrigger>
                    <SelectContent>
                      {languageLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Número de celular</Label>
                  <Input id="phone" type="tel" value={profile.phone} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">País</Label>
                  <Input id="country" value={profile.country} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupations">Ocupaciones (separadas por comas)</Label>
                <Input id="occupations" value={profile.occupations} onChange={handleChange} placeholder="Ej: Desarrollo de Software, Gestión de Proyectos" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Habilidades (separadas por comas)</Label>
                <Input id="skills" value={profile.skills} onChange={handleChange} placeholder="Ej: React, Liderazgo, Scrum" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceSector">Experiencia (sector, separado por comas)</Label>
                <Input id="experienceSector" value={profile.experienceSector} onChange={handleChange} placeholder="Ej: Fintech, Salud, E-commerce" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">Cuenta de LinkedIn</Label>
                <Input id="linkedin" type="url" value={profile.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/tu-perfil" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cv">Subir CV (JPG o PDF, máx. 5 MB)</Label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="cv" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                      <p className="text-xs text-gray-500">{cvFileName || 'PDF, JPG (MAX. 5MB)'}</p>
                    </div>
                    <Input id="cv" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg" />
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={handleCancel} disabled={saving}>Cancelar</Button>
                <Button type="submit" className="btn-primary" disabled={saving}>{saving ? "Guardando..." : "Guardar Cambios"}</Button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ProfilePage;