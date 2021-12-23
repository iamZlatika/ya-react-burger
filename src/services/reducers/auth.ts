import { LOGIN, LOGOUT } from "../actions";
import { TActions } from "../actions/index";

interface IAuth {
  loggedIn: boolean;
}
const initialState: IAuth = {
  loggedIn: false,
};

export const authReducer = (state = initialState, action: TActions) => {
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
