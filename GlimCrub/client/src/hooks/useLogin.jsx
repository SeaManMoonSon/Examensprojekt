import { useState } from "react";
import { useAuthContext } from "./userAuthContext";
import URL from "../../src/proxyURL.js"

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const [users, setUsers] = useState(null)
  const { dispatch } = useAuthContext();

  const login = async (ssn, password) => {
    setIsLoading(true);
    setError(null);
  
    const response = await fetch(`${URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ssn, password }),
    });
    const json = await response.json();
  
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return false;
    }
    if (response.ok) {
      dispatch({ type: "LOGIN", payload: json });
      localStorage.setItem("user", JSON.stringify(json));
      setIsLoading(false);
      return true;
    }
  };

  return { login, isLoading, error };
}  
