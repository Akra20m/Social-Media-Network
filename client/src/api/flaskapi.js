import axios from 'axios';


const flaskAPI = axios.create({
   //baseURL:'https://social-network-akram.herokuapp.com',
   baseURL:'http://localhost:5000',
});

export default flaskAPI;