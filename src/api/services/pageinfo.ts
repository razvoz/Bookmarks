import axios from 'axios';
const API_URL = 'http://localhost:3000/api';

const getByUrl = async (url: string): Promise<Object> => {
  try {
    const { data } = await axios.get(`${API_URL}/pageinfo/get`, {
      params: { url },
    });

    return { data };
  } catch ({ message }) {
    return {
      success: false,
      error: message
    };
  }
}

export default {
  getByUrl,
};

