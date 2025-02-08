import api from '../config/axios';

const userService = {
    getProfile: async () => {
        const response = await api.get('/user/profile');
        return response.data;
    },

    updateProfile: async (userData) => {
        const response = await api.put('/user/profile', userData);
        return response.data;
    },

    changePassword: async (passwordData) => {
        const response = await api.post('/user/change-password', passwordData);
        return response.data;
    }
};

export default userService; 