import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import styles from "./UnauthorizedApp.module.css"; // Import the module stylesheet

const UnauthorizedApp = () => {
  const userRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (user.length > 1 || pwd.length > 1) {
      setErrMsg("");
    }
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ username: user, password: pwd }).unwrap();
      dispatch(setCredentials({ ...response, user }));
      localStorage.setItem("auth", JSON.stringify({ token: response, user }));
      setUser("");
      setPwd("");

      if (response?.error) {
        console.log("response.error", response.error);
        setErrMsg(response?.error);
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className={styles.login}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        {errMsg.length ? <h2>{errMsg}</h2> : <h2>Welcome Back!</h2>}

        <label htmlFor="username" className={styles.label}>
          Username:
        </label>
        <input
          className={styles.input}
          type="text"
          id="username"
          ref={userRef}
          value={user}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          className={styles.input}
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={pwd}
          required
        />

        <button className={styles.button}>Sign In</button>
      </form>
    </section>
  );

  return content;
};
export default UnauthorizedApp;
