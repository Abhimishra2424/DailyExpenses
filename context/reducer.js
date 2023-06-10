import {
  SET_USER_REGISTER_BEGIN,
  SET_USER_REGISTER_SUCCESS,
  SET_USER_REGISTER_ERROR,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === SET_USER_REGISTER_BEGIN) {
    return {
      ...state,
      user: {
        ...state.user,
        isLoading: true,
      },
    };
  }
  if (action.type === SET_USER_REGISTER_SUCCESS) {
    return {
      ...state,
      user: {
        ...state.user,
        isLoading: false,
        token: action.payload.token,
      },
    };
  }
  if (action.type === SET_USER_REGISTER_ERROR) {
    return {
      ...state,
      user: {
        ...state.user,
        isLoading: false,
        error: action.payload.error,
      },
    };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
