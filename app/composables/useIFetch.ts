export const useIFetch = async (request: string, opts: any = {}) => {
  const config = useRuntimeConfig();
  const { token } = useAuth();

  const headers = {
    'ngrok-skip-browser-warning': 'true',
    ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
    ...(opts.headers || {}),
  };

  return $fetch(request, {
    baseURL: `${config.public.apiBase}/api/`,
    ...opts,
    headers,
  });
}
