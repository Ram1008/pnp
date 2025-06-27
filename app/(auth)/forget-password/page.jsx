"use client"
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');

  // validation for step 1
  const mobileSchema = Yup.object({
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, 'Invalid mobile number')
      .required('Mobile number is required'),
  });

  // validation for step 2
  const resetSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d{6}$/, 'OTP must be 6 digits')
      .required('OTP is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  // step 1 submit handler
  const handleSendOtp = ({ mobile }) => {
    // TODO: call your API to send OTP to `mobile`
    console.log('Send OTP to', mobile);
    setMobileNumber(mobile);
    setStep(2);
  };

  // step 2 submit handler
  const handleReset = ({ otp, password }) => {
    // TODO: call your API to reset password:
    // { mobile: mobileNumber, otp, newPassword: password }
    console.log('Reset', { mobile: mobileNumber, otp, password });
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      {step === 1 ? (
        <Formik
          initialValues={{ mobile: '' }}
          validationSchema={mobileSchema}
          onSubmit={handleSendOtp}
        >
          <Form className="space-y-4">
            <div>
              <label htmlFor="mobile" className="block font-medium">
                Mobile Number
              </label>
              <Field
                type="text"
                id="mobile"
                name="mobile"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Send OTP
            </button>
          </Form>
        </Formik>
      ) : (
        <Formik
          initialValues={{ otp: '', password: '', confirmPassword: '' }}
          validationSchema={resetSchema}
          onSubmit={handleReset}
        >
          <Form className="space-y-4">
            <div>
              <label htmlFor="otp" className="block font-medium">
                OTP
              </label>
              <Field
                type="text"
                id="otp"
                name="otp"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <ErrorMessage name="otp" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="password" className="block font-medium">
                New Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block font-medium">
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Reset Password
            </button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default ForgetPassword;
