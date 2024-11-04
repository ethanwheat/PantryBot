import { createContext, useContext, useEffect, useState } from "react";
import endpoints from "../constants/endpoints";
import ThemedSpinner from "../components/spinners/ThemedSpinner";
import { useCookies } from 'react-cookie';

const AuthContext = createContext({
    session: null,
    refreshSession: () => null,
    signup: () => null,
    login: () => null,
    logout: () => null,
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export default function AuthProvider({children}) {
  const [ cookies ] = useCookies(['auth'])
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cookies.auth) {
      refreshSession();

      return;
    }

    setSession(null);
  }, [cookies.auth])

  // Refresh the session
  const refreshSession = async () => {
    setLoading(true);

    const res = await fetch(endpoints.auth.getSession, {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();

      setSession(data);
    }

    setLoading(false);
  }

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
    // Put login code here, should be similar to signup.
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
  }

  return (
    <AuthContext.Provider value={{ session, refreshSession, signup, login, logout }}>
        { loading ? 
          <div className="position-absolute top-50 start-50 translate-middle">
            <ThemedSpinner variant="primary"/>
          </div> :
          children
        }
    </AuthContext.Provider>
  )
}
