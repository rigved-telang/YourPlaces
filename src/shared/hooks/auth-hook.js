import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
  
    const logout = useCallback(() => {
      setToken(null);
      setUserId(null);
      setTokenExpirationDate(null);
      localStorage.removeItem("userDate");
      <Navigate to="/" />;
    }, []);
  
    useEffect(() => {
      if (token && tokenExpirationDate) {
        const time =
          new Date(tokenExpirationDate).getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout, time);
      }else{
        clearTimeout(logoutTimer)
      }
    }, [logout, token, tokenExpirationDate]);
  
    const login = useCallback((uid, token, expirationDate) => {
      setToken(token);
      setUserId(uid);
  
      let tokenExpiry;
      if (expirationDate) {
        tokenExpiry = new Date(expirationDate);
      } else {
        tokenExpiry = new Date(new Date().getTime() + 1000 * 60 * 60);
      }
      setTokenExpirationDate(tokenExpiry.toISOString());
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExpiry.toISOString(),
        })
      );
  
      <Navigate to="/" />;
    }, []);
  
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem("userData"));
      if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
      ) {
        login(storedData.userId, storedData.token, storedData.expiration);
      }
    }, [login]);

    return {token, login, logout, userId};
}