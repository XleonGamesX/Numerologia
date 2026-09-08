import axios from 'axios';

// Instancia central de Axios. Todas las llamadas al backend pasan por aquí.
const api = axios.create({
  baseURL: 'https://numerologia-9ynf.onrender.com/api/v1',

});

// Antes de cada petición, si existe un token guardado, lo añadimos
// automáticamente. Así no repetimos el header en cada componente.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('numeria_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si el backend responde 401 (token inválido o ausente), cerramos la
// sesión localmente y mandamos al usuario a /login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('numeria_token');
      localStorage.removeItem('numeria_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Convierte cualquier error de Axios en un mensaje simple y amigable.
export function getErrorMessage(error) {
  return (
    error.response?.data?.message ||
    error.response?.data?.mensaje ||
    'Ocurrió un error. Intenta de nuevo en unos segundos.'
  );
}

export default api;
