export const useAuth = () => {
  const { $swal } = useNuxtApp();
  const router = useRouter();

  const user = useState('auth:user', () => null as null | {
    id: string;
    name: string;
    email: string;
    role: string;
    profile_picture: string | null;
  });
  const token = useState('auth:token', () => null as null | string);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        baseURL: useRuntimeConfig().public.apiBase,
        body: { email, password },
      });

      if (response.success && response.data) {
        user.value = response.data.user;
        token.value = response.data.token;
        
        if (import.meta.client) {
          localStorage.setItem('auth_token', token.value);
          localStorage.setItem('auth_user', JSON.stringify(user.value));
        }

        $swal.toast.fire({ icon: 'success', title: 'Login realizado com sucesso!' });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      $swal.toast.fire({ icon: 'error', title: 'Erro ao fazer login!' });
      return false;
    }
  }

  const logout = async () => {
    try {
      if (token.value) {
        await $fetch('/api/auth/logout', {
          method: 'POST',
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
      }
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      user.value = null;
      token.value = null;
      if (import.meta.client) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
      await router.push('/login');
    }
  }

  const restaurarSessao = () => {
    if (import.meta.client && !user.value) {
      const tokenGuardado = localStorage.getItem('auth_token');
      const userGuardado = localStorage.getItem('auth_user');
      if (tokenGuardado && userGuardado) {
        token.value = tokenGuardado;
        user.value = JSON.parse(userGuardado);
      }
    }
  }

  const estaAutenticado = computed(() => !!user.value);

  return { user, token, login, logout, restaurarSessao, estaAutenticado };
}
