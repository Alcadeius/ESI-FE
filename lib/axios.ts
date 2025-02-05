import Axios from "axios";

const getAuthorization = async () => {
    const token = localStorage.getItem("authToken");
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