const apiUrl = process.env.API_URL;

if (!apiUrl) {
    throw new Error("API_URL is not defined in the environment variables.");
}

const endpoints = {
    auth: {
        getSession: apiUrl + "/api/auth/getSession",
        register: apiUrl + "/api/auth/register",
        login: apiUrl + "/api/auth/login",
        logout: apiUrl + "/api/auth/logout"
    },
    profile: {
        tempOnboard: apiUrl + "/api/profile/tempOnboard",
    }
}

export default endpoints;