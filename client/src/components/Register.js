import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../actions/apiActions";
import { useDispatch, connect } from "react-redux";

const Register = (props) => {
   const initialState = {
      name: "",
      email: "",
      password: "",
      password2: "",
   };
   const [form, setForm] = useState(initialState);

   const dispatch = useDispatch();

   const handleInput = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };
   const handleRegister = () => {
      dispatch(registerUser(form));
   };

   if (props.redux.register.loading)
      return (
         <div className="formContainer">
            <h1>LOADING...</h1>
         </div>
      );
   else if (props.redux.register.user.name)
      return (
         <div className="formContainer">
            <h1>Registration Successfull!</h1>
            <Link className="link" to="/">
               Login
            </Link>
         </div>
      );
   else {
      return (
         <div className="formContainer">
            <h1 className="formHeader">Register with Plaid</h1>
            <form>
               <label>Name:</label>
               <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInput}
               ></input>
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
               <label>Confirm password:</label>
               <input
                  type="password"
                  name="password2"
                  value={form.password2}
                  onChange={handleInput}
               ></input>
            </form>
            <button onClick={handleRegister}>Register</button>
            {props.redux.register.error.name && (
               <div className="errorField">
                  <h3>Registration Failed</h3>
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

export default connect(mapStatetoProps)(Register);
