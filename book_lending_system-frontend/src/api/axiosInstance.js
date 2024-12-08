import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:127.0.0.1:8000/api', // Laravel API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default API;
