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
    <div className="w-full p-5 h-screen flex justify-center items-center relative ">
      <Formik
        initialValues={{
          firstName:"",
          lastName:"",
          email:"",
          contact:"",
          userID: "",
          password: "",
        }}
        validationSchema={RegistrationSchema}
        onSubmit={handleUserRegistration}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form className="flex flex-col lg:w-1/2 md:w-1/2 w-full">
            <div className="w-1/2 text-center flex justify-center items-center mx-auto flex-col">
              <h3 className="text-[4rem] text-[#6c4cb5] font-bold">
                Future Tech
              </h3>
              <p>Please register to continue</p>
            </div>

            <div className="w-full justify-between flex-row flex space-x-3">
              <div className="w-1/2">
                <InputField
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  handleChange={handleChange}
                  values={values}
                />
              </div>

              <div className="w-1/2">
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


            <div className="w-full justify-between flex-row flex space-x-3">
              <div className="w-1/2">
                <InputField
                  label="Email"
                  name="email"
                  type="text"
                  placeholder="Email"
                  handleChange={handleChange}
                  values={values}
                />
              </div>

              <div className="w-1/2">
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
              label="userID"
              name="userID"
              type="text"
              placeholder="UserID"
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
              bgcolor="#6c4cb5"
              textcolor="#ffffff"
              type="submit"
            />

            <div className="w-full flex flex-row justify-between mt-3">
              <h5 className="text-[12px]">
                Already have an account?{" "}
                <span className="text-[#6c4cb5]">
                  <Link to="/">Login now</Link>
                </span>
              </h5>
            </div>

            {successMessage && (
              <span className="text-green-600 text-[12px] mt-2">{successMessage}</span>
            )}


          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Registration;
