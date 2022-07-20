import Endpoints from "../constants/endpoints";
import axios, {AxiosRequestConfig} from "axios";
import {getAuthTokens} from "../utils/axios-jwt";

const AccommodationService = {
    getServices: async () => {
        try {
            const response = await axios.get(Endpoints.SERVICES)
            return response.data
        }catch (e){

        }
    },

    search: async (country: string, province:string,city:string, startDate: string, endDate: string, features: string[], services: string [], priceFrom: string, priceTo: string) : Promise<any> => {
        const parseParams = (params) => {
            const keys = Object.keys(params);
            let options = '';

            keys.forEach((key) => {
                const isParamTypeObject = typeof params[key] === 'object';
                const isParamTypeArray = isParamTypeObject && (params[key].length >= 0);

                if (!isParamTypeObject) {
                    options += `${key}=${params[key]}&`;
                }

                if (isParamTypeObject && isParamTypeArray) {
                    params[key].forEach((element) => {
                        options += `${key}=${element}&`;
                    });
                }
            });
            return options ? options.slice(0, -1) : options;
        };

        let params = {
            country: country,
            province: province,
            city: city,
            cantReg: 20,
            priceFrom: priceFrom,
            priceTo: priceTo
        }

        if(features.length > 0){
            let feat = {features}
            params = {...params, ...feat}
        }
        if(services.length > 0){
            let serv = {services}
            params = {...params, ...serv}
        }

        try{
            const response = await axios.get(Endpoints.SEARCH,
                {params,
                        paramsSerializer: params => parseParams(params)    }
                )
            return response.data.accommodations
        }catch (e){
            return Promise.reject(e.response.data)
        }
    },

    orderBy: async (data: any[], param: string) => {
        if(param === 'desc'){
            data.sort((a: any,b: any) => {
                if(a.price > b.price) return -1
                if(a.price < b.price) return 1
                }
            )
        } else if(param === 'asc'){
            data.sort((a: any,b: any) => {
                if(a.price < b.price) return -1
                if(a.price > b.price) return 1
            }
            )
        }else{
            data.sort((a: any,b: any) => {
                if(a.rating > b.rating) return -1
                if(a.rating < b.rating) return 1
                }
            )
        }
        return data
    },

    getAccommodation: async (id: string, userAlias: string ) => {
        try {
            const url = Endpoints.ACCOMMODATION.replace(":id", id)
            const response = await axios.get(url, {params: {alias: userAlias}})
            console.log(response.data)
            return response.data
        }catch (e){
            return Promise.reject(e.response.data)
        }
    },

    sendFavorite: async (accommodationId: string, userId: string) => {
        const token = await getAuthTokens()
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        try{
            const response = await axios.post(Endpoints.SEND_FAVORITE, {alias: userId, accommodation_id: accommodationId}, config)
            console.log(response.status)
            return response.status
        }catch (e){
            return Promise.reject(e.response.data)

        }
    },

    getFavorites: async (userId: string) => {
        const token = await getAuthTokens()
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        const url = Endpoints.GET_FAVORITES.replace(":id", userId)
        try{
            const response = await axios.get(url, config)
            return response.data
        }catch (e){
            return Promise.reject(e.response.status)
        }

    }
}

export default AccommodationService