import api from './api';

class AuthService {
    async login(email: string, password: string) {
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async googleLogin(credential: string) {
        try {
            const response = await api.post('/auth/google', { credential });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('token');
    }
}

export default new AuthService(); 