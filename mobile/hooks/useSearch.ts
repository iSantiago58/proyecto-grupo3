import { useQuery } from "react-query"
import AccommodationService from "../services/AccommodationService";

const useSearch = (country: string, province: string, city: string, startDate: string, endDate: string, features: string[], services: string[], priceFrom: string, priceTo: string ) => {
    return useQuery("search", () => AccommodationService.search(country,province,city,startDate,endDate,features,services, priceFrom, priceTo))
}

export default useSearch