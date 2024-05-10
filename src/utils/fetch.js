import axios from 'axios';
import { urls } from '../configs';

const baseConfig = {
    baseURL: `${urls.baseUrl}${urls.apiBaseEndpoint}`,
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
}

export const fetch = axios.create(baseConfig);