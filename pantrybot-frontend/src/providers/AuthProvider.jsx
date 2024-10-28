import { createContext, useContext, useEffect, useState } from "react";
import endpoints from "../constants/endpoints";
import Cookies from 'js-cookie'
import ThemedSpinner from "../components/spinners/ThemedSpinner";

const AuthContext = createContext({
    user: null,
    logout: () => null
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export default function AuthProvider({children}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    handleUserRefresh();
    setLoading(false);
  }, [])

  const setAuthCookie = (jwt) => {
    const jwtJSONString = JSON.stringify(jwt)
    Cookies.set("auth", jwtJSONString, { expires: 3600 })
    handleUserRefresh();
  }

  const removeAuthCookie = () => {
    Cookies.remove("auth");
    handleUserRefresh();
  }

  const handleUserRefresh = () => {
    const authCookie = Cookies.get("auth");

    if (authCookie) {
      const authCookieJSON = JSON.parse(authCookie)
      setUser(authCookieJSON)
    } else {
      setUser(null);
    }
  }

  const signup = async (username, email, password) => {
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

      return { errorMessage: "Something went wrong." }
    }

    const jwt = await res.json();

    setAuthCookie(jwt);

    return { errorMessage: null }
  }

  const login = () => {

  }

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
