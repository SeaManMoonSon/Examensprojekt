import { useState } from "react";
import { useAuthContext } from "./userAuthContext";
import URL from '../proxyURL.js';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const [users, setUsers] = useState(null)
  const { dispatch } = useAuthContext();
  const [pwChangePrompt, setPwChangePrompt] = useState(null);

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

      // console.log("json in useLogin", json);
      if (json.passwordChangePrompt === true) {
        console.log("json.passwordChangePrompt TRUUUUUUUUE", json.passwordChangePrompt);
        setPwChangePrompt(true);
        // console.log("pwChangePrompt", pwChangePrompt);
      }

      return true;
    }
  };

  return { login, isLoading, pwChangePrompt ,error };
}  