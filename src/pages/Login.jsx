import React, {useState} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/mod/InputField";
import PrimaryButton from "../components/mod/PrimaryButton";
import axios from 'axios';
import config from "../config";
import InputPassword from "../components/mod/InputPassword";
import logo from "../assets/logo.jpeg";
const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);



  const handleLogin = async (values) => {
    try {
      const response = await axios.post(`${config.baseUrl}/userLogin`, values);

      const token = response.data.token;

      // Save the token in localStorage
      localStorage.setItem('token', token);
      console.log('Auth Token', token)

      // Set a timer to remove the token from localStorage after 10 minutes
      setTimeout(() => {
        localStorage.removeItem('token');
      }, 10 * 60 * 1000); // 10 minutes in milliseconds

      // Redirect to the home page or perform other actions
      navigate("/");
    } catch (error) {
      if (error.response.status === 401) {
        // Check the error response for the specific error messages
        if (error.response.data.error === 'user Not Found') {
          setLoginError('User not found. Please check your credentials.');
        } else if (error.response.data.error === 'Invalid password') {
          setLoginError('Invalid password. Please check your credentials.');
        } else {
          console.error('Login failed:', error.response.data.error);
        }
      }
    }
  };



  const LoginSchema = Yup.object().shape({
    userID: Yup.string()
    .required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires a uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required("Required"),
  });

  return (
    <div className="w-full p-5 h-screen flex justify-center items-center relative ">
      <Formik
        initialValues={{
          userID: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form className="flex flex-col lg:w-1/2 md:w-1/2 w-full">
            
          <div className="w-1/2 mx-auto flex items-center justify-center">
            <img src="logo" alt="Your Photo" className="mr-4" />
            <h3 className="text-4xl text-[#6c4cb5] font-bold">My Task Manager</h3>
          </div>

           

<InputField 
label="username"
name="userID"
type="text"
placeholder="Username"
handleChange={handleChange}
values={values}
/>



<InputPassword
label="Password"
name="password"
handleChange={handleChange}
values={values}
/>

<PrimaryButton
label="Login"
bgcolor="#6c4cb5"
textcolor="#ffffff"
type="submit"
/>

{loginError && <p className="text-red-600 text-[12px]">{loginError}</p>}

<div className="w-full flex flex-row justify-between mt-3">
<h5 className="text-[12px]">
    Don't have an account? {" "}
    <span className="text-[#6c4cb5]">

        <Link to="/Registration">
         Register Now
        </Link>

    </span>
</h5>


<h5 className="text-[12px]">
   
    <span className="text-[#6c4cb5]">
Forgot Password?

    </span>
</h5>


</div>
           

           



          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
