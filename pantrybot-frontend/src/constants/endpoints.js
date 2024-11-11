const apiUrl = process.env.API_URL;

if (!apiUrl) {
    throw new Error("API_URL is not defined in the environment variables.");
}

const endpoints = {
    auth: {
        register: apiUrl + "/api/auth/register",
        login: apiUrl + "/api/auth/login"
    }
}

export default endpoints;