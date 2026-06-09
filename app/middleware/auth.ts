export default defineNuxtRouteMiddleware(() => {
  const { estaAutenticado, restaurarSessao } = useAuth()
 
  restaurarSessao()
 
  if (!estaAutenticado.value) {
    return navigateTo('/login')
  }
})
 