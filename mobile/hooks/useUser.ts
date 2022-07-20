import { useQuery } from "react-query"
import {UserService} from "../services/UserService";

const useUser = (userId: string) => {
    return useQuery("user", () => UserService.getUser(userId))
}

export default useUser