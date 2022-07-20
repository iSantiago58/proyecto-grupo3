import { useQuery } from "react-query"
import AccommodationService from "../services/AccommodationService"

const useFavorites = (id: string) => {
    return useQuery(["favorites", id], () => AccommodationService.getFavorites(id))
}
export default useFavorites