import { createContext, useContext, useEffect, useState } from "react";
import endpoints from "../constants/endpoints";
import Cookies from 'js-cookie'
import ThemedSpinner from "../components/spinners/ThemedSpinner";

const AuthContext = createContext({
    user: null,
    signup: () => null,
    login: () => null,
    logout: () => null
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export default function AuthProvider({children}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  // Set user to current cookie if it exists.
  useEffect(() => {
    handleUserRefresh();
    setLoading(false);
  }, [])

  // Set the auth token cookie.
  const setAuthCookie = (jwt) => {
    const jwtJSONString = JSON.stringify(jwt)
    Cookies.set("auth", jwtJSONString, { expires: 3600 })
    handleUserRefresh();
  }

  // Remove the auth token cookie.
  const removeAuthCookie = () => {
    Cookies.remove("auth");
    handleUserRefresh();
  }

  // Refresh the user state with the current auth token cookie if it exists, else set the user to null.
  const handleUserRefresh = () => {
    const authCookie = Cookies.get("auth");

    if (authCookie) {
      const authCookieJSON = JSON.parse(authCookie);
      setUser(authCookieJSON);

      return;
    }

    setUser(null);
  }

  // Function that signs up a user with the API and then stores the jwt in a cookie.
  const signup = async (username, email, password) => {
    try {
      const res = await fetch(endpoints.auth.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password })
      });
  
      if (!res.ok) {
        if (res.status === 400) {
          const { msg } = await res.json();
  
          return {errorMessage: msg}
        }
  
        throw new Error(res.statusText)
      }
  
      const jwt = await res.json();
  
      setAuthCookie(jwt);
  
      return { errorMessage: null }
    } catch (e) {
      return { errorMessage: "Something went wrong." }
    }
  }

  // Function that logins a user with the API and then stores the jwt in a cookie.
  const login = () => {
    // Put login code here, should be pretty simular to login.
  }

  // Function to logout the user, removes the cookie, and redirects to the welcome page.
  const logout = () => {
    removeAuthCookie();
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
        { loading ? 
        <div className="position-absolute top-50 start-50 translate-middle">
          <ThemedSpinner variant="primary"/>
        </div> :
        children}
    </AuthContext.Provider>
  )
}
