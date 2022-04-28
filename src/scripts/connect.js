import axios from 'axios'

const serverDefaults = axios.create({
    baseURL: 'http://localhost:3000/api/customers/',
    withCredentials: true 
})

const workerDefaults = axios.create({
    baseURL: 'http://localhost:3000/api/workers/',
    withCredentials: true 
})

export { serverDefaults, workerDefaults }