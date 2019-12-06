import axios from 'axios';


const flaskAPI = axios.create({
    baseURL:'http://localhost:5000',
});

export default flaskAPI;