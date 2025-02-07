import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5046/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response || error);
        return Promise.reject(error);
    }
);

export default api; 