import { createContext, useState, useEffect } from "react";

export const Context = createContext();

export function ContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState("게스트");

  const login = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsLogin(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLogin(false);
  };

  /*useEffect(() => {
    console.log("isLogin 상태 변경:", isLogin);
  }, [isLogin]);
  useEffect(() => {
    console.log("nickname 상태 변경:", nickname);
  }, [nickname]);*/

  return (
    <Context.Provider value={{ isLogin, login, logout, nickname, setNickname }}>
      {children}
    </Context.Provider>
  );
}
