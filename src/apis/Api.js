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

export const createFeedbackApi = (id,data) => Api.post(`/api/users/create_feedback/${id}`,data,config)
export const getFeedbackApi = (data) => Api.get('/api/provider/getFeedback',data)


export const createProviderApi = (data) => Api.post('/api/provider/register',data)


export const createFavourtieApi = (data) => Api.post('/api/users/create_favourite',data)

export const getServiceProvidersApi = (data)=> Api.get('/api/provider/get_providers',data)
export const getTopServiceProvidersApi = (data)=> Api.get('/api/provider/get_topProviders',data)

export const getSingleProviderApi = (id)=> Api.get(`/api/provider/get_provider/${id}`)
export const createRequestApi = (data)=> Api.post('/api/users/create_request',data)
export const getFavouriteApi = (id)=> Api.get(`api/users/get_favourite/${id}`)
export const deleteFavouriteApi = (id)=> Api.delete(`api/users/delete_favourite/${id}`,config)
export const getActivatedRequestsApi=(id)=> Api.get(`api/users/activatedRequests/${id}`)
export const getRequestApi=(id)=>Api.get(`/api/provider/get_request/${id}`)
export const acceptRequestApi = (id)=>Api.patch(`/api/provider/accept/${id}`)
export const rejectRequestApi = (id)=>Api.patch(`/api/provider/reject/${id}`)

export const getSingleUserApi = (id)=>Api.get(`/api/users/getSingleUser/${id}`,config)
export const updateProfileApi = (id,data)=>Api.put(`/api/users/updateProfile/${id}`,data,config)
export const createNotificationApi = (data) => Api.post('/api/provider/create_notification', data, config);
export const getNotificationApi = (id) => Api.get(`/api/users/get_notification/${id}`);
export const deleteNotificationApi = (id)=> Api.delete(`api/users/delete_notifications/${id}`)
export const updateUserCoordinatesApi = (id,data)=>Api.put(`/api/users/updateCoordinates/${id}`,data)
export const getUserCoordinatesApi = (id) => Api.get(`/api/users/getCoordinates/${id}`);
export const cancelRequestApi = (id)=> Api.delete(`api/users/cancelRequest/${id}`)

export const completeRequestApi = (id,data)=>Api.post(`/api/users/complete/${id}`,data)
export const getUserList = (data)=> Api.get('/api/users/getAllUsers',data)



