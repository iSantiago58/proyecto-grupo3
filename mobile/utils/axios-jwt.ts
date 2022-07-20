import jwtDecode from "jwt-decode"
import {AxiosInstance, AxiosRequestConfig} from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Storage} from "../constants/app";


type Token = string
export interface AuthTokens {
    accessToken: Token
    refreshToken: ""
}

//Get access token -- modify that when start using refresh token
export const getAuthTokens = async (): Promise<AuthTokens | undefined> => {
    const tokens = await AsyncStorage.getItem(Storage.ACCESS_TOKEN)
    if(!tokens) return

    try {
        return JSON.parse(tokens)
    }catch (e){
        e.message = `Failed parse auth tokens: ${tokens}`
        throw e
    }

}

export const setAuthTokens = async (tokens: AuthTokens): Promise<void> => {
    await AsyncStorage.setItem(Storage.ACCESS_TOKEN, JSON.stringify(tokens.accessToken))
}

export const setAccessToken = async (token: Token): Promise<void> => {
    const tokens = await getAuthTokens()
    if(!tokens){
        throw new Error("There are not tokens stored")
    }
    return setAuthTokens(tokens)
}

export const clearAuthToken = async (): Promise<void> => {
    await AsyncStorage.removeItem(Storage.ACCESS_TOKEN)

}

