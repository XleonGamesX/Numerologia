import api from './api';

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  return data.data; // { user, token }
}

export async function register({ name, email, password, fecha_nacimiento }) {
  const { data } = await api.post('/auth/register', {
    name,
    email,
    password,
    fecha_nacimiento,
  });
  return data.data; // { user, token }
}
