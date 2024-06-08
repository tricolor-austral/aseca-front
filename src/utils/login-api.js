import axios from 'axios';

const API_URL = 'http://localhost:8888';

export async function login(email, password, onLogin, onError) {

        return axios.post(`${API_URL}/users/login`, { email, password })
            .then(res => onLogin(res.data))
            .catch(err => onError(err));
}