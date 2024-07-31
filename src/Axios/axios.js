/* eslint-disable no-unused-vars */
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const instance = axios.create({
    baseURL: "http://localhost:8080/"
})

instance.interceptors.request.use(
    async config => {

        const admin = JSON.parse(localStorage.getItem('admin'));
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const userRole = localStorage.getItem('userRole');
        let token = null;
        if (userRole === 'ADMIN') {
            token = admin?.token;
        } else {
            token = user?.token
        }
        if (token) {
            const decoded = jwtDecode(token);
            const now = Math.floor(Date.now() / 1000); // current time in seconds
            const bufferTime = 300; // 5 minutes
            if (decoded.exp - now < bufferTime) {

                try {
                    const res = await axios.post(`http://localhost:8080/auth/refresh-token?token=${token}`)
                    console.log("intercepted response: ", res.data);
                    if (res.status === 200) {
                        if (userRole === 'ADMIN') {
                            const adminData = { ...admin, token: res.data }
                            localStorage.setItem('admin', JSON.stringify(adminData));
                        } else {
                            const userData = { ...user, token: res.data }
                            localStorage.setItem('currentUser', JSON.stringify(userData));
                        }
                        token = res.data.token;
                    }
                } catch (error) {
                    localStorage.clear();
                    window.location.replace('/user/login');
                }

            }
        }
        return config;
    },
    error => Promise.reject(error)
)
export default instance;