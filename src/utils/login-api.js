import axios from 'axios';

export async function login(email, password, onLogin, onError) {

        return axios.post(`http://localhost:8888/users/login`, { email, password })
            .then(res => onLogin(res.data))
            .catch(err => onError(err));
}