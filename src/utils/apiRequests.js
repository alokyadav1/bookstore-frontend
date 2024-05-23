/* eslint-disable no-unused-vars */
import axios from "../Axios/axios"

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const header = {
    headers: {
        Authorization: `Bearer ${currentUser?.token}`,
    }
}


const request = {
    async get(url) {
        try {
            const res = await axios.get(url, header)
            console.log("add: ", res);
            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default request;
