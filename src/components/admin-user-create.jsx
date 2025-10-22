// En algún componente temporal o en la consola del navegador
import { setupAdminUser } from '@/utils/setupAdmin';

// Ejecutar esto una vez
setupAdminUser().then(result => {
  console.log('Resultado del setup:', result);
});