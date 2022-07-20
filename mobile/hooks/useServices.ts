import { useQuery } from "react-query"
import AccommodationService from "../services/AccommodationService";

const useServices = () => {
    return useQuery("services", () => AccommodationService.getServices())
}

export default useServices