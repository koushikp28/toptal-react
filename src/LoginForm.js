import { performLogin } from "./util";
import styles from "./LoginForm.module.css";
import React, { useState } from 'react'

// ================ LOGIN FORM ====================
//
// You are provided with an incomplete login form.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.
//
// Tasks:
//  * Login button should trigger the performLogin() action imported above and pass required data to it.
//  * Disable the Login button if email is blank OR if password is under 6 letters
//  * Disable the Login button while login action is being performed
//  * Show an error message from the performLogin() if login fails. The error should be cleared every time user re-attempts to log in.
//  * Show an alert box (native Javascript alert) if login succeeds. Investigate the performLogin function to find out how to log in successfully.

export default function LoginForm() {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ isLoginEnabled, setIsLoginEnabled ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState(false)

  const handleLogin = () => {
    setIsLoginEnabled(false)
    performLogin({email, password}).then(res => {
      setIsLoginEnabled(true)
      alert("Login Successful")
    }).catch(err => {
      setIsLoginEnabled(true)
      setErrorMessage("Login Failed")
      document.getElementById("error-message").innerHTML = "Login Failed"
      alert("Login Failed")
    })
  }

  const handleEmail = (value) => {
    setEmail(value)
    let isDisabled = (email.length === 0 || password.length < 6)
    setIsLoginEnabled(isDisabled)
    errorMessage.length > 0 && setErrorMessage("")
  }

  const handlePassword = (value) => {
    setPassword(value)
    let isDisabled = (email.length === 0 || password.length < 6)
    setIsLoginEnabled(isDisabled)
    errorMessage.length > 0 && setErrorMessage("")
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <label htmlFor={"email"}>Email</label>
        <input id={"email"} type={"email"} value={email} onChange={ (e) => handleEmail(e.target.value)} />
      </div>
      <div className={styles.row}>
        <label htmlFor={"password"}>Password</label>
        <input id={"password"} type={"password"} value={password} onChange={ (e) => handlePassword(e.target.value)} />
      </div>

      {/* Place login error inside this div. Show the div ONLY if there are login errors. */}
      {errorMessage && <div id="error-message" className={styles.errorMessage} />}

      <div className={styles.row}>
        <button disabled={isLoginEnabled} onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
