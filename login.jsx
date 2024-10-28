import React from "react";
import "./login.css";
import useForm from "../hooks/useForm.js";
import validate from "../utils/validate.js";
function Login() {
  const login = useForm({
    init: {
      email: "",
      password: "",
    },
    validate: validate,
  });

  return (
    <div className="page-container login">
      <h1 className="h1">로그인</h1>
      <form className="form ">
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
