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
    pantry: {
        get: apiUrl + "/api/pantry",               // GET: fetch pantry items
        add: apiUrl + "/api/pantry/items",         // POST: add a new item
        updateQuantity: apiUrl + "/api/pantry/items", // PUT: update item quantity
        delete: apiUrl + "/api/pantry/items",      // DELETE: remove an item
    }
}

export default endpoints;