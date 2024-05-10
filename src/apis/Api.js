import axios from "axios";
const Api = axios.create({
    baseURL : "http://localhost:5000",
    withCredentials : true,
    headers :{
        "Content-Type": "multipart/form-data"
    }
})

const config = {
    headers : {
    'authorization' : `Bearer ${localStorage.getItem('token')}`
    }
}

export const createUserApi = (data) => Api.post('/api/users/register',data)
export const loginUserApi = (data) => Api.post('/api/users/login',data)

export const getNotification = (data)=> Api.get('/api/admin/get_notification',data)

export const createFavourtieApi = (data) => Api.post('/api/users/create_favourite',data)

export const getActivatedVehiclesApi = (data)=> Api.get('/api/admin/getActivatedVehicles',data)
