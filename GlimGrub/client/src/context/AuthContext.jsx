import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: JSON.parse(localStorage.getItem('user')),
  })



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    // console.log(user, 'hej');

    if(user) {
      console.log("user.passwordChangePrompt", user.passwordChangePrompt);
      dispatch({ type: 'LOGIN', payload: user})
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
