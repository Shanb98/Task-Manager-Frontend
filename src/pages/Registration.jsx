import React, {useState, useEffect} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/mod/InputField";
import PrimaryButton from "../components/mod/PrimaryButton";
import config from "../config";
import axios from "axios";

function Registration() {
  const navigate = useNavigate();

 

  const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    contact: Yup.string().required("Required"),
    userID: Yup.string()
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires a uppercase letter")
      .required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires a uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required("Required"),
  });





  const [successMessage, setSuccessMessage] = useState(null);

  const handleUserRegistration = async (values,{ resetForm }) => {
    try {
        console.log('Form Data:', values);
        const response = await axios.post(`${config.baseUrl}/addNewUser`, values);
        console.log('Response:', response.data);
        
        setSuccessMessage("User Registered successfully");
        console.log('Form reset');
        resetForm();

    } catch (error) {
        console.error('Error:', error);
    }
};




return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400">
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        userID: "",
        password: "",
      }}
      validationSchema={RegistrationSchema}
      onSubmit={handleUserRegistration}
    >
      {({ errors, touched, handleChange, values }) => (
        <Form className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-2xl" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-blue-800 font-pacifico">
            My Task Manager
            </h3>
            <br/>
            <p className="text-gray-600 font-handwriting text-lg">
  Welcome aboard! Let's get you all set up. 🚀
</p>

          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputField
                label="First Name"
                name="firstName"
                type="text"
                placeholder="First Name"
                handleChange={handleChange}
                values={values}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <InputField
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Last Name"
                handleChange={handleChange}
                values={values}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                handleChange={handleChange}
                values={values}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <InputField
                label="Contact"
                name="contact"
                type="text"
                placeholder="Contact"
                handleChange={handleChange}
                values={values}
              />
            </div>
          </div>

          <InputField
            label="Username"
            name="userID"
            type="text"
            placeholder="Username"
            handleChange={handleChange}
            values={values}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            handleChange={handleChange}
            values={values}
          />

<PrimaryButton
              label="Register"
              bgcolor="#1D4ED8"
              textcolor="#ffffff"
              type="submit"
            />

          {successMessage && (
            <p className="text-sm text-green-600 mt-2">{successMessage}</p>
          )}

          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-[#6c4cb5] hover:underline">
              Login now
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

}

export default Registration;
