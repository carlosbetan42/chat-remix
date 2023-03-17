// import { supabase } from '~/utils/supabase';
import { useSupabase } from '../hooks/useSupabase';

const Login = () => {
  const supabase = useSupabase();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log('Error al cerrar sesión', error);
    }
  };

  const handleLogin = async () => {
    console.log('entra');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    });

    if (error) {
      console.log('Error al cerrar sesión', error);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <button onClick={handleLogin}>Iniciar sesión</button>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Login;
