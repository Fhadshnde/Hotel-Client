import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  try {
    return JSON.parse(user);
  } catch (e) {
    return null;
  }
};

const INITIAL_STATE = {
  user: getUserFromLocalStorage(),
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    case "REGISTER_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "REGISTER_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "REGISTER_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const register = async (userDetails) => {
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("/auth/register", userDetails);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
        register, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
