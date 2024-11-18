import axios from 'axios';

const API_URL = '/api';
const API_KEY = '62799e097c2a4386a0fe8b403cb169a57866325cc158d7375729bb9a5e29bbbe';

const gophishService = {
  getCampaignData: async () => {
    try {
      const response = await axios.get(`${API_URL}/campaigns/5/results`, {
        headers: {
          'Authorization': API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  },
};

export default gophishService;