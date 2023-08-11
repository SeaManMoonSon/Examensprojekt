import { useState } from "react";
import { useAuthContext } from "./userAuthContext";
import URL from '../proxyURL.js';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [userRole, setUserRole] = useState(null)
  const { dispatch } = useAuthContext();

  const login = async (ssn, password) => {
    setIsLoading(true);
    setError(null);
  
    try {    
      const response = await fetch(`${URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ssn, password }),
    });
    const json = await response.json();
    console.log("Server response: ", json);
  
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return false;
    }

    setUserRole(json.user.role);

    dispatch({
      type: "LOGIN",
      payload: json
    });

    localStorage.setItem("user", JSON.stringify(json));
    setIsLoading(false);
    return { loginSuccessful: true, userRole: json.user.role}
  } catch (error) {
    setIsLoading(false);
    setError(error.message);
    return {loginSuccessful: false, userRole: null};
  }

    // if (response.ok) {
    //   dispatch({ type: "LOGIN", payload: json });
    //   localStorage.setItem("user", JSON.stringify(json));
    //   setIsLoading(false);
    //   return true;
    // }
  };

  return { login, isLoading, error, userRole };
}  