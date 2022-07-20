import { useQuery } from "react-query"
import BookingService from "../services/BookingService"

const useBookings = (id: string) => {
    return useQuery(["bookings", id], () => BookingService.list(id))
}
export default useBookings