import { LOGIN_GET, LOGIN_SUCCESS, LOGIN_FAILED } from "../actions/types";

const initialState = {
   isAuthenticated: false,
   token: {},
   loading: false,
   error: {},
};

export default function (state = initialState, action) {
   switch (action.type) {
      case LOGIN_GET:
         return {
            ...state,
            loading: true,
         };
      case LOGIN_SUCCESS:
         return {
            ...state,
            isAuthenticated: true,
            user: action.payload.token,
            loading: false,
         };
      case LOGIN_FAILED:
         return {
            ...state,
            loading: false,
            error: action.payload,
         };
      default:
         return state;
   }
}
