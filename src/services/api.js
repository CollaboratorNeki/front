import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:8080/collaborator'
});

export default api;