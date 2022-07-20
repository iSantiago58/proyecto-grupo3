import { User } from "../screens/LoginScreen"
import Endpoints from "../constants/endpoints"
import { Authenticate } from "../screens/SignUpScreen"
import {clearTokens} from "../utils/userUtils"
import {clearAuthToken, getAuthTokens} from "../utils/axios-jwt"
import axios, {AxiosRequestConfig} from "axios"
import {ChangePasswordPayload} from "../screens/forgotPassword/NewPasswordScreen"
import {resetPassword} from "../screens/ResetPassword"


const AuthenticateService = {
    login : async (payload: User): Promise<any> => {
        try {
            const response = await axios
                .post(Endpoints.LOGIN, payload)
            return response.data
        } catch (e) {
            return Promise.reject(e.response.data)
        }
    },

    signup: async (payload: Authenticate): Promise<any> => {
        try {
            const response = await axios
                .post(Endpoints.SIGNUP, payload)
           return response.status
        }catch (e) {
            return Promise.reject(e.response.data)
        }
    },

    logout: async (): Promise<void> => {
        clearTokens().finally(() => clearAuthToken())
    },

    forgotPassword: async (email: string): Promise<any>  => {
        const url = Endpoints.RESET_PASSWORD_FORGOTTEN.replace(":userId", email)
        try {
            const response = await axios.get(url)
            return response.status
        }catch (e){
            return Promise.reject(e.response)
        }
    },
    sendCode: async (email: string, code: string): Promise<any>  => {
        let url = Endpoints.SEND_CODE.replace(":userEmail", email)
        url = url.replace(":code", code)
        try {
            const response = await axios.get(url)
            return response.data
        }catch (e){
            return Promise.reject(e.response.data)
        }
    },
    changePassword: async (payload: ChangePasswordPayload): Promise<any>  => {
        const url = Endpoints.CHANGE_PASSWORD.replace(":userEmail", payload.email)
        try{
            const response = await axios
                .post(url, {
                    "password": payload.password,
                    "codigo": payload.code
                })
            return response.status
        }catch (e){
            return Promise.reject(e.response.data)
        }
    },
    changePasswordReset: async (payload: resetPassword): Promise<any> => {
        const token = await getAuthTokens()
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        try{
            const response = await  axios.put(Endpoints.RESET_PASSWORD_RESET, payload, config)
            return response.data
        }catch (e){
            return Promise.reject(e.response.data)
        }
    }
}

export default AuthenticateService