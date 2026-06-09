export const useAuth = () => {
  const user = useState('auth:user', () => null as null | { nome: string; papel: string; iniciais: string })

  const login = async (credencial: string, senha: string): Promise<boolean> => {
    const utilizadores = [
      { credencial: 'admin', senha: '123456', nome: 'Administrador', papel: 'ADMIN', iniciais: 'AM' },
      { credencial: 'admin@metodista.ao', senha: '123456', nome: 'Administrador', papel: 'ADMIN', iniciais: 'AM' },
    ]

    const encontrado = utilizadores.find(
      u => (u.credencial === credencial) && u.senha === senha
    )

    if (encontrado) {
      user.value = { nome: encontrado.nome, papel: encontrado.papel, iniciais: encontrado.iniciais }
      if (import.meta.client) {
        sessionStorage.setItem('auth_user', JSON.stringify(user.value))
      }
      return true
    }

    return false
  }

  const logout = () => {
    user.value = null
    if (import.meta.client) {
      sessionStorage.removeItem('auth_user')
    }
    navigateTo('/login')
  }

  const restaurarSessao = () => {
    if (import.meta.client && !user.value) {
      const guardado = sessionStorage.getItem('auth_user')
      if (guardado) {
        user.value = JSON.parse(guardado)
      }
    }
  }

  const estaAutenticado = computed(() => !!user.value)

  return { user, login, logout, restaurarSessao, estaAutenticado }
}