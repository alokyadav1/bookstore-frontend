/* eslint-disable no-unused-vars */
import { toast } from "react-toastify"
const showToast = (message,position="top-center") => {
    toast(message,{
        position:position,
        theme:"light"
    })
}
export {showToast}