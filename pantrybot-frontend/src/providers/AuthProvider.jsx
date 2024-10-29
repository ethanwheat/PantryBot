import { createContext, useContext, useEffect, useState } from "react";
import endpoints from "../constants/endpoints";
import Cookies from "js-cookie"
import ThemedSpinner from "../components/spinners/ThemedSpinner";
import { useNavigate } from "react-router-dom";
import routes from "../constants/routes";

const AuthContext = createContext({
    token: null,
    signup: () => null,
    login: () => null,
    logout: () => null,
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export default function AuthProvider({children}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(Cookies.get("auth"));

  useEffect(() => {
    // Check to see if the session is valid and delete token if not valid.
    const checkSession = async () => {
      setLoading(true);

      const res = await fetch(endpoints.auth.validateToken, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setToken(null);
        navigate(routes.welcome)
      }

      setLoading(false);
    }

    checkSession();
  }, [])

  // Function that signs up a user with the API and then stores the jwt in a cookie.
  const signup = async (username, email, password) => {
    try {
      const res = await fetch(endpoints.auth.register, {
        method: "POST",
        credentials: "include",
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
  
      return { errorMessage: null }
    } catch (e) {
      return { errorMessage: "Something went wrong." }
    }
  }

  // Function that logins a user with the API and then stores the jwt in a cookie.
  const login = () => {
    // Put login code here, should be simular to login.
  }

  // Function to logout the user, removes the cookie, and redirects to the welcome page.
  const logout = async () => {
    await fetch(endpoints.auth.logout, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setToken(null);
    navigate(routes.welcome);
  }

  return (
    <AuthContext.Provider value={{ token, signup, login, logout }}>
        { loading ? 
        <div className="position-absolute top-50 start-50 translate-middle">
          <ThemedSpinner variant="primary"/>
        </div> :
        children}
    </AuthContext.Provider>
  )
}
