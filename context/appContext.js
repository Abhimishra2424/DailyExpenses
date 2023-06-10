import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import { SET_USER_REGISTER_BEGIN, SET_USER_REGISTER_ERROR } from "./actions";
import axios from "axios";
import { RefreshControlBase } from "react-native";

const initialState = {
    user: {
        isLoading: false,
        token: null,
        error: null,
    }
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);


    const registerUser = async (payload) => {
        console.log("payload", payload)
        dispatch({ type: SET_USER_REGISTER_BEGIN });
        try {

            const res = await axios.post('http://localhost:5000/api/register', payload)
            console.log("res ", res)
        } catch (error) {
            dispatch({
                type: SET_USER_REGISTER_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
    }


    return (
        <AppContext.Provider
            value={{
                ...state,
                registerUser
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };