import axios from 'axios';

export const getPartners = async () => {
  try {
    const response = await axios.get('http://localhost:8080/partners/getAll');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar os parceiros: ' + error.message);
  }
};