import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { Link } from "react-router-dom";

const Register = () => {
   const initialState = {
      name: "",
      email: "",
      password: "",
      password2: "",
   };
   const [form, setForm] = useState(initialState);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [reg, setReg] = useState(false);

   const handleInput = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };
   const handleRegister = () => {
      setLoading(true);
   };

   useEffect(() => {
      const attemptLogin = async () => {
         const result = await axios({
            method: "post",
            url: "http://localhost:5000/api/users/register",
            data: qs.stringify(form),
            headers: {
               "content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
            },
         })
            .then((result) => {
               setLoading(false);
               setError(false);
               setReg(result);
            })
            .catch((error) => {
               setLoading(false);
               setError(error);
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
   else if (reg)
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

export default Register;
