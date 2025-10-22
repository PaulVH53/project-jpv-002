// src/utils/setupAdmin.js
import { supabase } from '@/lib/customSupabaseClient';

export const setupAdminUser = async () => {
  try {
    console.log('🔧 Configurando usuario admin...');
    
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;

    // Validar que las variables existan
    if (!adminEmail || !adminPassword || !adminUsername) {
      console.error('❌ Variables de entorno admin no configuradas');
      return { error: 'Variables de entorno admin no configuradas' };
    }

    console.log('📧 Configurando admin con:', { adminEmail, adminUsername });

    const { data, error } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: {
          username: adminUsername,
          role: 'admin',
          name: 'Administrador'
        }
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('✅ Usuario admin ya existe');
        return { exists: true };
      }
      console.error('❌ Error creando usuario admin:', error);
      return { error };
    }

    if (data.user) {
      console.log('✅ Usuario admin creado exitosamente');
      console.log('📧 Email:', adminEmail);
      console.log('👤 Username:', adminUsername);
      return { success: true, user: data.user };
    }

  } catch (err) {
    console.error('💥 Error en setupAdminUser:', err);
    return { error: err };
  }
};
