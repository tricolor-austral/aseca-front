import axios from 'axios';

export async function getOrders(callback) {

    return axios.get(`http://localhost:8888/shipments`)
        .then(res => callback(res.data))
        .catch(err => console.error(err));

}

export async function getShipmentByID(id, callback) {

    return axios.get(`http://localhost:8888/shipments/${id}`)
        .then(res => callback(res.data))
        .catch(err => console.error(err));

}