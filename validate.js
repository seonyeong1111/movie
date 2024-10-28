const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {
    email: "",
    password: "",
  };
  if (emailRegex.test(values.email) === false) {
    errors.email = "올바른 이메일 형식이 아닙니다";
  }

  if (values.password.length < 8 || values.password.length > 16) {
    errors.password = "비밀번호는 8~16자 사이로 입력해주세요";
  }
  return errors;
}

export default validate;
