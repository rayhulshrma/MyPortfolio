import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/users";
import "./Login.css";
import { useAlert } from "react-alert";
export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, message, error } = useSelector((state) => state.login);
  
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch({ type: "CLEAR_ERRORS" });
      }
      if (message) {
        alert.success(message);
        dispatch({ type: "CLEAR_MESSAGE" });
      }
    }, [alert, error, message, dispatch]);
  

    return (
        <div className="forms">
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form"  onSubmit={submitHandler}>
                <label htmlFor="email">email</label>
                <input value={email}onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />

                <button type="submit" variant="contained" disabled={loading}>Log In</button>
            </form>
        </div>
        </div>
    )
}