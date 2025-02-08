import api from '../config/axios';

const matchService = {
    getAllMatches: async () => {
        const response = await api.get('/matches');
        return response.data;
    },

    getMatch: async (id) => {
        const response = await api.get(`/matches/${id}`);
        return response.data;
    },

    bookTicket: async (matchId, ticketData) => {
        const response = await api.post(`/matches/${matchId}/book`, ticketData);
        return response.data;
    }
};

export default matchService; 