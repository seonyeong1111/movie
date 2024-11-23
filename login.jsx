import React from "react";
import "./login.css";
import useForm from "../hooks/useForm.js";
import validate from "../utils/validate.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/context.jsx";
import { useContext } from "react";
import { queryClient } from "../main.jsx";
import { useMutation } from "@tanstack/react-query";

function Login() {
  const login = useForm({
    init: {
      email: "",
      password: "",
    },
    validate: validate,
  });

  const navigate = useNavigate();
  const { login: setlogin, setNickname } = useContext(Context);

  const postTodo = async () => {
    const { data } = await axios.post(
      "http://localhost:3000/auth/login",
      login.values
    );
    return data;
  };

  const postMutation = useMutation({
    mutationFn: postTodo,
    onSuccess: (data) => {
      console.log("postTodo연결성공");
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
    onError: (error) => {
      console.error("postMutation에러", error.message);
    },
  });

  const handPressLogin = async (event) => {
    event.preventDefault();
    const data = await postMutation.mutateAsync();
    const { accessToken, refreshToken } = data;
    setlogin(accessToken, refreshToken);
    await fetchUserData(accessToken);
    navigate("/");
  };
  /*const handPressLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        login.values
      );

      const { accessToken, refreshToken } = response.data;
      setlogin(accessToken, refreshToken);
      await fetchUserData(accessToken);
      navigate("/");
    } catch (error) {
      console.error("로그인 API 호출 오류:", error);
    }
  };*/

  const fetchUserData = async (accessToken) => {
    try {
      const response = await axios.get("http://localhost:3000/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userNickname = response.data.email.split("@")[0];
      setNickname(userNickname);
    } catch (error) {
      console.error("유저 정보를 가져오는 데 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="page-container login">
      <h1 className="h1">로그인</h1>
      <form className="form" onSubmit={handPressLogin}>
        <label>Email</label>
        <input
          className="input"
          type={"text"}
          placeholder="이메일을 입력해주세요"
          {...login.getTextInputProps("email")}
        />
        {login.touched.email && login.errors.email && (
          <p className="p">{login.errors.email}</p>
        )}
        <label>Password</label>
        <input
          className="input"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...login.getTextInputProps("password")}
        />
        {login.touched.password && login.errors.password && (
          <p className="p">{login.errors.password}</p>
        )}
        <input className="input" type={"submit"} />
      </form>
    </div>
  );
}
export default Login;
