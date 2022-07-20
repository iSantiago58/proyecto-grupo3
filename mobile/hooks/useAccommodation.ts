import { useQuery } from "react-query"
import AccommodationService from "../services/AccommodationService";

const useAccomodation = (id: string, userAlias: string) => {
    return useQuery(["accommodation", id], () => AccommodationService.getAccommodation(id, userAlias))
}
export default useAccomodation