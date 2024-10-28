import { useState, useEffect } from "react";

const useForm = ({ init, validate }) => {
  const [values, setValues] = useState(init);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const handleChangeInput = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleBlur = (name) => {
    setTouched({ ...touched, [name]: true });
  };

  const getTextInputProps = (name) => {
    const value = values[name];
    const onChange = (e) => handleChangeInput(name, e.target.value);
    const onBlur = () => handleBlur(name);
    return { value, onChange, onBlur };
  };

  useEffect(() => {
    const newError = validate(values);
    setErrors(newError);
  }, [validate, values]);
  return { values, touched, errors, getTextInputProps };
};

export default useForm;
