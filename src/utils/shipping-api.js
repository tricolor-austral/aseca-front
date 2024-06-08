import axios from 'axios';
import {API_URL} from "./constants";

export async function getOrders(callback) {

    return axios.get(`${API_URL}/shipments`)
        .then(res => callback(res.data))
        .catch(err => console.error(err));

}

export async function getShipmentByID(id, callback) {

    return axios.get(`${API_URL}/shipments/${id}`)
        .then(res => callback(res.data))
        .catch(err => console.error(err));

}

export async function updateShipmentStatus(id, status) {

    return axios.post(`${API_URL}/shipments/${id}/change-status`, {status})

}