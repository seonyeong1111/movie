import React from "react";
import "./login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Login() {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // 각 필드의 포커스를 벗어날 때마다 유효성 검사
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="page-container login">
      <h1 className="h1">로그인</h1>
      <form className="form " onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          className="input"
          type={"text"}
          placeholder="이메일을 입력해주세요"
          {...register("email")}
        />
        {errors.email && <p className="p">{errors.email?.message}</p>}
        <label>Password</label>
        <input
          className="input"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register("password")}
        />
        {errors.password && <p className="p">{errors.password?.message}</p>}
        <input className="input" type={"submit"} />
      </form>
    </div>
  );
}
export default Login;
