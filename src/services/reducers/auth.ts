import { LOGIN, LOGOUT } from "../actions";

interface IAuth {
  loggedIn: boolean;
}
const initialState: IAuth = {
  loggedIn: false,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        loggedIn: true,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        loggedIn: false,
      };
    }
    default: {
      return state;
    }
  }
};
