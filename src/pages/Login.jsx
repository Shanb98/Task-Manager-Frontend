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
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);



  const handleLogin = async (values) => {
    try {

      const response = await axios.post('http://localhost:5001/api/users/login', {
        username: values.userID,
        password: values.password,
      });
  
      // Extract the JWT token from the response
      const jwtToken = response.data.accessToken;
  
      // Log the user
      console.log('Logged in user:', values.username);
  
      // Log the JWT token
      console.log('JWT Token:', jwtToken);
  
      Cookies.set('jwtToken', jwtToken);

      // Set a timer to remove the token from localStorage after 10 minutes
      setTimeout(() => {
        localStorage.removeItem('token');
      }, 10 * 60 * 1000); // 10 minutes in milliseconds

      // Redirect to the home page or perform other actions
      navigate("/Home");
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
  //    .matches(/[0-9]/, "Password requires a number")
    //  .matches(/[a-z]/, "Password requires a lowercase letter")
    //  .matches(/[A-Z]/, "Password requires a uppercase letter")
     // .matches(/[^\w]/, "Password requires a symbol")
      .required("Required"),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400">
      <Formik
        initialValues={{
          userID: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-2xl">
            <div className="flex flex-col items-center">
              <img src={logo} alt="Logo" className="h-24 w-24" />
              <br/>     
              <h2 className="text-4xl font-bold text-blue-800 font-pacifico">My Task Manager</h2>
            </div>
  
            <InputField 
              label="Username"
              name="userID"
              type="text"
              placeholder="Enter your username"
              handleChange={handleChange}
              values={values}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
  
            <InputPassword
              label="Password"
              name="password"
              placeholder="Enter your password"
              handleChange={handleChange}
              values={values}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
  
            <PrimaryButton
              label="Login"
              bgcolor="#1D4ED8"
              textcolor="#ffffff"
              type="submit"
            />
  
            {loginError && <p className="text-sm text-red-600">{loginError}</p>}
  
            <div className="flex items-center justify-between">
              <Link to="/Registration" className="text-sm text-blue-700 hover:underline">
                Register Now
              </Link>
              <a href="#" className="text-sm text-blue-700 hover:underline">
                Forgot Password?
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
  
};

export default Login;
