import axios from "./"

export const addBooking = (data) => {
    return axios.post("/bookings", data, { headers: { 'Content-Type': 'multipart/form-data' } })
}
