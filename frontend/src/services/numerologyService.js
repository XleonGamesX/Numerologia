import api from './api';

export async function getProfile() {
  const { data } = await api.get('/numerology/profile');
  return data.data; // { numero_vida, numero_expresion, numero_alma }
}

export async function calculateProfile(fullName, birthDate) {
  const { data } = await api.post('/numerology/calculate', {
    fullName,
    birthDate,
  });
  return data.data;
}
