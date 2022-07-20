import Endpoints from "../constants/endpoints"
import axios, {AxiosRequestConfig} from "axios"
import {getAuthTokens} from "../utils/axios-jwt";

const BookingService = {

    verify: async (payload: any) => {
        const token = await getAuthTokens()
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params:{
                id: payload.idAccommodation,
                start_date: payload.start_date,
                end_date: payload.end_date
            }
        }
        try{
            const response = await axios.get(Endpoints.VERIFY_BOOKING_DATES, config)
            return response.data
        }catch (e){
            return Promise.reject(e.response.data)
        }
    },

    booking: async (payload: any) => {
        const token = await getAuthTokens()
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try{
            const response = await axios.post(Endpoints.BOOKING, payload, config)
            console.log("Booking",response.data)
            return response.data

        }catch (e){
            console.log(e.response)
            return Promise.reject(e.response.data)
        }

    },
    list: async (id: string) => {
        console.log(id)
        const token = await getAuthTokens()
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        const url = Endpoints.BOOKING_LIST.replace(":id", id)
        try{
            const response = await axios.get(url, config)
            return response.data
        }catch (e){
            return Promise.reject(e.response.data)
        }
    },
    get: async (id: string) => {
        const token = await getAuthTokens()
        const url = Endpoints.BOOKING_DETAIL.replace(":id", id)
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        try {
            const response = await axios.get(url, config)
            return response.data
        }catch (e){
            return Promise.reject(e.response.data)
        }
    },
    saveHosRating: async (hostId: string,guestId: string, rating: number) => {
        const token = await getAuthTokens()
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }

        const payload = {
            qualifyingUser: guestId,
            qualifiedUser: hostId,
            qualification: rating
        }

        console.log(payload)

        try {
            const response = await axios.post(Endpoints.RATING_HOST, payload, config)
            console.log(response.data)
        }catch (e){
            console.log(e.response.data)
        }
    },
    saveReview: async (payload: any) => {
        const token = await getAuthTokens()
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        try{
            const response = await axios.post(Endpoints.SAVE_REVIEW, payload, config)
            console.log(response.data)

        }catch (e){
            return Promise.reject(e.response.data)
        }

    },
    deleteHostRating: async (guestId: string, hostId: string) => {
        const token = await getAuthTokens()
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        console.log("aca")
        let url = Endpoints.DELETE_HOST_RATING.replace(":guestId", guestId)
        url = url.replace(":hostId", hostId)
        try{
            const response = await axios.delete(url, config)
            console.log(response.data)
        }catch (e){
            console.log(e.response)
        }
    },
    editReview: async (payload: any) => {
        const token = await getAuthTokens()
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        try{
            const response = await axios.put(Endpoints.EDIT_REVIEW, payload, config)
            return response.data
        }catch (e){
            return Promise.reject(e.response)
        }
    },
    cancel: async (payload: any) => {
        const token = await getAuthTokens()
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        try {
            const response = await axios.post(Endpoints.CANCEL_BOOKING, payload, config)
            console.log(response)
            return response.data
        }catch (e){
            return Promise.reject(e.response)
        }
    }

}
 export default BookingService

