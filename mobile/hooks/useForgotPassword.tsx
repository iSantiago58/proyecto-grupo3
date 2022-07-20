import { useQuery } from "react-query"
import AuthenticateService from "../services/AuthenticateService";

const useForgotPassword = (email: string) => {
    return useQuery(["reset_password", email], () => AuthenticateService.forgotPassword(email),
        {enabled:false})
}
export default useForgotPassword