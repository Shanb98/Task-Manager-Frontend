import React , { useState} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

function InputPassword({ label , name , handleChange , values }) {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    

  return (
    



<div className="form-field-container flex flex-col sm:mt-5 mt-2 space-y-2 w-full">
<div className="form-field-label flex justify-between w-full">
  <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">{label}</span>
  <ErrorMessage
    name="password"
    component="span"
    className="text-red-600 text-[12px]"
  />
</div>
<div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">
  <div className="form-field-input-icobox bg-[#1D4ED8] h-[38px] w-[38px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex">
    <span className="text-[16px] text-[#ffffff]">
      <FontAwesomeIcon icon={faLock} />
    </span>
  </div>
  <Field
    className="form-field-input w-[90%] h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px]"
    type={passwordVisible ? 'text' : 'password'}
    name="password"
    value={values.password}
    onChange={handleChange}
    required
  />
  <div className="h-[38px] w-[38px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex">
    {passwordVisible ? (
      <span
        className="text-[16px] text-[#1D4ED8] cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        <FontAwesomeIcon icon={faEye} />
      </span>
    ) : (
      <span
        className="text-[16px] text-[#1D4ED8] cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        <FontAwesomeIcon icon={faEyeSlash} />
      </span>
    )}
  </div>
</div>
<ErrorMessage
  name="password"
  component="span"
  className="text-red-600 text-[12px] block sm:hidden"
/>
</div>


  );
}

export default InputPassword;
