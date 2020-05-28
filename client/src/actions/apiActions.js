import axios from "axios";
import qs from "qs";
import {
   LOGIN_GET,
   LOGIN_SUCCESS,
   LOGIN_FAILED,
   REG_GET,
   REG_SUCCESS,
   REG_FAILED,
} from "./types";

export const loginUser = (loginInfo) => (dispatch) => {
   dispatch({
      type: LOGIN_GET,
   });

   axios({
      method: "post",
      url: "http://localhost:5000/api/users/login",
      data: qs.stringify(loginInfo),
      headers: {
         "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
   })
      .then((res) => {
         dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch({
            type: LOGIN_FAILED,
            payload: err,
         });
      });
};

export const registerUser = (regInfo) => (dispatch) => {
   dispatch({
      type: REG_GET,
   });

   axios({
      method: "post",
      url: "http://localhost:5000/api/users/register",
      data: qs.stringify(regInfo),
      headers: {
         "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
   })
      .then((res) => {
         dispatch({
            type: REG_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch({
            type: REG_FAILED,
            payload: err,
         });
      });
};
