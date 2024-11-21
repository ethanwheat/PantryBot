const apiUrl = process.env.API_URL;

if (!apiUrl) {
    throw new Error("API_URL is not defined in the environment variables.");
}

const endpoints = {
    auth: {
        getSession: apiUrl + "/api/auth/getSession",
        register: apiUrl + "/api/auth/register",
        login: apiUrl + "/api/auth/login",
        logout: apiUrl + "/api/auth/logout",
    },
    profile: {
        onboard: apiUrl + "/api/profile/onboard"
    },
    groceryLists: apiUrl + "/api/groceryList",
    groceries: {
        search: apiUrl + "/api/groceries/search"
    },
    recipes: {
      add: apiUrl + "/api/recipes/add",
      get: apiUrl + "/api/recipes/"
    }
}

export default endpoints;
