import AsyncStorage from "@react-native-async-storage/async-storage";
import {Storage} from "../constants/app";
import {AuthTokens, setAuthTokens} from "./axios-jwt";
import jwtDecode from "jwt-decode";


export const clearTokens = async(): Promise<void> =>  { await AsyncStorage.removeItem(Storage.USER_EMAIL)}

export const setupLogin = async (token: AuthTokens, name: string) : Promise<void> => {
    await setAuthTokens(token)
    const {exp, sub} = jwtDecode(token.accessToken)
    await AsyncStorage.setItem(Storage.USER_EMAIL, sub)
    await AsyncStorage.setItem(Storage.USER_NAME, name)
}

export const cutDate = (date: Date) => {
    return date.toISOString().split("T")[0]
}
