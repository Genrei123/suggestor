import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});



export default axiosInstance;