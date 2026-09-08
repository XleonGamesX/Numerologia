import api from './api';

export async function checkCompatibility(userId2) {
  const { data } = await api.post('/compatibility/check', { userId2 });
  return data.data;
}
