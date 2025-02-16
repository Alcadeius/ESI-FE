import Axios from "axios";
import Cookies from "js-cookie";
export const getAuthorization = async () => {
    const token = Cookies.get("authToken");
    if(token){
        return `Bearer ${token}`;
    }
    return null;
}

const axiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers:{
        "Content-Type": "application/json",
        "Accept" : "application/json",
    },
    withXSRFToken: true
});

axiosInstance.interceptors.request.use(async (config) => {
    const token = await getAuthorization();
    if (token) {
        config.headers["Authorization"] = token;
    }
    return config;
});

export default axiosInstance;