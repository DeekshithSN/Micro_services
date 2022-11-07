import axios from 'axios';
import { env } from '../env';

const sevice = axios.create({
    baseURL: `${env.REACT_APP_API_URL}/api`,
});

export default sevice;
