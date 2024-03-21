import React, {useState, useEffect} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/mod/InputField";
import SelectField from "../components/mod/SelectField";
import PrimaryButton from "../components/mod/PrimaryButton";
import config from "../config";
import axios from "axios";
import Modal from 'react-modal';
import Success from "../assets/Success.gif";

function Registration() {
  const navigate = useNavigate();
  const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    user: Yup.string().required("Required"),
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleUserRegistration = async (values,{ resetForm }) => {
    try {
        console.log('Form Data:', values);
        console.log('Form Data:', values.user);

        const response = await axios.post('http://localhost:5001/api/users/register', {
          firstname: values.firstName,
          lastname: values.lastName,
          username: values.userID,
          password: values.password,
          email: values.email,
          userRole: values.user
        });
        setModalIsOpen(true);
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
          user: "",
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
                <SelectField
                  label="Select User"
                  name='user'
                  icon="Person"
                  boxcolor="transparent"
                  handleChange={handleChange}
                  options={["Admin", "Regular"]}
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
            <div className="w-full flex flex-row justify-between mt-3">
              <h5 className="text-[12px]">
                Already have an account?{" "}
                <span className="text-[#6c4cb5]">
                  <Link to="/">Login now</Link>
                </span>
              </h5>
            </div>

            <Modal
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out"
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel="Success Modal"
              ariaHideApp={false}
            >
              <div className="flex flex-col items-center justify-center bg-white w-full max-w-md p-8 rounded-xl shadow-2xl animate-bounce-in">
                <img
                  src={Success} 
                  alt="Beautiful"
                  className="w-40 h-40 mb-4 rounded-full"
                />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">User Registered!</h2>
                <p className="text-gray-600 mb-6">{successMessage}</p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:ring focus:ring-blue-300 transition-all duration-300 ease-in-out animate-pulse"
                  onClick={() => {
                        setModalIsOpen(false);
                        navigate("/"); // Navigate to the login page
                  }}
                >
                  Login Now
                </button>
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Registration;
