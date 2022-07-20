import Endpoints from "../constants/endpoints"
import axios, {AxiosRequestConfig} from "axios"
import {getAuthTokens} from "../utils/axios-jwt";
import {UserProfile} from "../screens/EditProfile";



export const UserService = {
    getUser: async (userId: string) : Promise<any> => {
        const url = Endpoints.USERS.replace(":userId", userId)
        const token = await getAuthTokens()
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const response = await axios.get(url,config )
            console.log(response.data)
            return response.data
        }catch (e){
            return Promise.reject(e.response.status)
        }
    },

    updateUser: async (payload: UserProfile): Promise<any> => {
        const url = Endpoints.UPDATE_USER
        const token = await getAuthTokens()
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try{
            const response = await axios.put(url, payload, config)
            return response.data
        }catch (e){
            return Promise.reject(e.response.data)
        }
    },

    delete: async (userId: string): Promise<any> => {
        const url = Endpoints.REMOVE_USER.replace(":id", userId)
        const token = await getAuthTokens()
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const response = await axios.delete(url, config)
            return response.data
        }catch (e){
            return Promise.reject(e.response.data)
        }
    }
}