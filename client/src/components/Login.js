import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../actions/apiActions";
import { useDispatch, connect } from "react-redux";

/*
MERN-AUTH has a template of redux 
broken up into indiviual files

initial state is defined in the reduces
actions send information and tell reucers what to do
dispatch sends the action to tell the reducers what to do

test wether the same veriable name called by two reducers is unique
or wether global state can be overwritten by a reducers initial state
*/

const Login = (props) => {
   const initialState = {
      email: "",
      password: "",
   };
   const [form, setForm] = useState(initialState);
   // const [loading, setLoading] = useState(false);
   // const [loginSuccess, setLogginSucces] = useState({});
   // const [error, setError] = useState(false);

   const dispatch = useDispatch();

   const handleInput = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleLogin = () => {
      dispatch(loginUser(form));
   };

   if (props.redux.auth.loading)
      return (
         <div className="formContainer">
            <h1>LOADING...</h1>
         </div>
      );
   else if (props.redux.auth.isAuthenticated)
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
            {props.redux.auth.error.name && (
               <div className="errorField">
                  <h3>Login Failed</h3>
               </div>
            )}
         </div>
      );
   }
};

const mapStatetoProps = (state) => {
   return {
      redux: state,
   };
};

export default connect(mapStatetoProps)(Login);
