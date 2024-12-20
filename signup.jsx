import React from "react";
import "./login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

function Signup() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("유효한 이메일 형식이 아닙니다")
      .required("이메일을 반드시 입력해주세요"),
    password: yup
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다")
      .max(16, "비밀번호는 16자 이하이어야 합니다")
      .required("비밀번호를 반드시 입력해주세요"),
    passwordCheck: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다")
      .required("비밀번호를 반드시 입력해주세요"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const postTodo = async (signupData) => {
    const { data } = await axios.post(
      "http://localhost:3000/auth/register",
      signupData
    );
    return data;
  };

  const postMutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      console.log("postTodo연결성공");
      queryClient.invalidateQueries({ queryKey: ["signup"] });
    },
    onError: (error) => {
      console.error("postMutation에러", error.message);
    },
  });

  const onSubmit = async (data) => {
    postMutation.mutate(data);
    navigate("/login");
  };

  /*const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        data
      );
      navigate("/login");
    } catch (error) {
      console.error("회원가입 API 호출 오류:", error);
    }
  };*/
  return (
    <div className="page-container login ">
      <h1 className="h1">회원가입</h1>
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
        <label>PasswordCheck</label>
        <input
          className="input"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register("passwordCheck")}
        />
        {errors.passwordCheck && (
          <p className="p">{errors.passwordCheck?.message}</p>
        )}
        <input className="input" type={"submit"} />
      </form>
    </div>
  );
}
export default Signup;
