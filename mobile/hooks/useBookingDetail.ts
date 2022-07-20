import { useQuery } from "react-query"
import BookingService from "../services/BookingService"


const useBookingDetail = (id: string) => {
    return useQuery(["bookingDetail", id], () => BookingService.get(id))

}
export default useBookingDetail