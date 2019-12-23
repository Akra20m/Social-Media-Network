import axios from 'axios';


const flaskAPI = axios.create({
    baseURL:'https://social-network-akram.herokuapp.com',
});

export default flaskAPI;