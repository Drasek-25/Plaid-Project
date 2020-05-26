import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { Link } from "react-router-dom";

/*
MERN-AUTH has a template of redux 
broken up into indiviual files

initial state is defined in the reduces
actions send information and tell reucers what to do
dispatch sends the action to tell the reducers what to do

test wether the same veriable name called by two reducers is unique
or wether global state can be overwritten by a reducers initial state
*/

const Login = () => {
   const initialState = {
      email: "",
      password: "",
   };
   const [form, setForm] = useState(initialState);
   const [loading, setLoading] = useState(false);
   const [loginSuccess, setLogginSucces] = useState({});
   const [error, setError] = useState(false);

   const handleInput = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleLogin = () => {
      //handle validation
      setLoading(true);
   };

   useEffect(() => {
      const attemptLogin = async () => {
         const result = await axios({
            method: "post",
            url: "http://localhost:5000/api/users/login",
            data: qs.stringify(form),
            headers: {
               "content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
            },
         })
            .then((result) => {
               setForm(initialState);
               setLogginSucces(result.data);
               setLoading(false);
               setError(false);
            })
            .catch((error) => {
               setError(error);
               setLoading(false);
            });
      };
      loading && attemptLogin();
   }, [loading]);
   if (loading)
      return (
         <div className="formContainer">
            <h1>LOADING...</h1>
         </div>
      );
   else if (loginSuccess.success === true)
      return (
         <div className="formContainer">
            <h1>Login Successfull!</h1>
         </div>
      );
   else {
      return (
         <div className="formContainer">
            <h1 className="formHeader">Log-In to Plaid</h1>
            <form>
               <label>Email:</label>
               <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleInput}
               ></input>
               <label>Password:</label>
               <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleInput}
               ></input>
            </form>
            <button onClick={handleLogin}>Login</button>
            <Link className="link" to="/register">
               Register
            </Link>
            {error && (
               <div className="errorField">
                  {Object.keys(error.response.data).map((errorKey, i) => {
                     console.log(errorKey);
                     console.log(error.response.data[`${errorKey}`]);
                     return (
                        <h3 key={i}>{error.response.data[`${errorKey}`]}</h3>
                     );
                  })}
               </div>
            )}
         </div>
      );
   }
};

export default Login;
