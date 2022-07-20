
const url = "https://api.go-and-rent.com/prod-1/"

const Endpoints = {
    LOGIN : `${url}auth/login-device`,
    SIGNUP : `${url}auth/signup/guest`,
    USERS : `${url}user/profile/:userId`,
    UPDATE_USER: `${url}user/update-profile`,
    RESET_PASSWORD_FORGOTTEN: `${url}auth/recover-password/:userId`,
    SEND_CODE: `${url}auth/validate-code/:userEmail/:code`,
    CHANGE_PASSWORD: `${url}auth/recover/change-password/:userEmail`,
    SERVICES: `${url}data/features`,
    SEARCH: `${url}data/accommodation/search`,
    ACCOMMODATION: `${url}data/accommodation/info/:id`,
    VERIFY_BOOKING_DATES: `${url}guests/booking/verify`,
    BOOKING: `${url}booking/guest/confirm`,
    RESET_PASSWORD_RESET: `${url}user/update/password`,
    BOOKING_LIST: `${url}guests/bookings/:id`,
    BOOKING_DETAIL: `${url}guests/booking/detail/:id`,
    RATING_HOST: `${url}guests/qualify-host`,
    DELETE_HOST_RATING: `${url}guests/qualify-host/:guestId/:hostId`,
    SAVE_REVIEW: `${url}guests/review/add`,
    EDIT_REVIEW: `${url}guests/review/update`,
    CANCEL_BOOKING: `${url}booking/refund`,
    SEND_FAVORITE: `${url}guests/favorites`,
    GET_FAVORITES: `${url}guests/favorites/:id`,
    REMOVE_USER: `${url}guests/delete/:id`
}

export default Endpoints