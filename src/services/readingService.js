import api from './api';

export async function generateReading(type = 'general') {
  const { data } = await api.post('/readings/generate', { type });
  return data.lectura;
}

export async function getHistory() {
  const { data } = await api.get('/readings/history');
  return data.lecturas;
}
