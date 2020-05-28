import { REG_GET, REG_SUCCESS, REG_FAILED } from "../actions/types";

const initialState = {
   user: {},
   loading: false,
   error: {},
};

export default function (state = initialState, action) {
   switch (action.type) {
      case REG_GET:
         return {
            ...state,
            loading: true,
         };
      case REG_SUCCESS:
         return {
            ...state,
            user: action.payload,
            loading: false,
         };
      case REG_FAILED:
         return {
            ...state,
            loading: false,
            error: action.payload,
         };
      default:
         return state;
   }
}
