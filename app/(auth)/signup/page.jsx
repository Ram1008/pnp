"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/GlobalContext";

const Signup = () => {
  const router = useRouter();
  const { signup, sendPhoneOtp, verifyOtp, loading } = useGlobal();
  const [step, setStep] = useState(1); // 1: signup form, 2: OTP verification
  const [signupData, setSignupData] = useState(null);
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const initialValues = {
    name: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    otp: "",
  };

  const validationSchemaStep1 = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
      .required("Mobile number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const validationSchemaStep2 = Yup.object({
    otp: Yup.string()
      .length(6, "OTP must be 6 digits")
      .required("OTP is required"),
  });

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSignupSubmit = async (values) => {
    try {
      setSignupData(values);
      setMobile(values.mobile);

      // First send OTP to the mobile number
      await sendPhoneOtp(values.mobile);
      setOtpSent(true);
      setCountdown(30); // 30 seconds countdown
      setStep(2);
    } catch (error) {
      console.error("OTP sending error:", error);
      alert(error.message || "Failed to send OTP. Please try again.");
    }
  };

  const handleOtpSubmit = async (values) => {
    try {
      // Verify OTP first
      await verifyOtp(mobile, values.otp, "phone");

      // If OTP verification succeeds, proceed with signup
      const { confirmPassword, ...signupPayload } = signupData;
      await signup(signupPayload);

      alert("Signup successful! Redirecting to dashboard...");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message || "Signup failed. Please try again.");
    }
  };

  const resendOtp = async () => {
    try {
      if (countdown > 0) return;

      await sendPhoneOtp(mobile);
      setOtpSent(true);
      setCountdown(30);
      alert("OTP has been resent to your mobile number");
    } catch (error) {
      console.error("Resend OTP error:", error);
      alert(error.message || "Failed to resend OTP. Please try again.");
    }
  };

  const OtpInput = ({ value, onChange, hasError }) => {
    const [otp, setOtp] = useState(
      value ? value.split("") : ["", "", "", "", "", ""]
    );
    const inputRefs = useRef([]);

    useEffect(() => {
      setOtp(value ? value.split("") : ["", "", "", "", "", ""]);
    }, [value]);

    const handleChange = (index, val) => {
      if (!/^\d*$/.test(val)) return; // Only allow numbers
      if (val.length > 1) return;

      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);
      onChange(newOtp.join(""));

      // Auto-focus next input
      if (val && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index, e) => {
      // Handle backspace
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      // Handle arrow keys
      if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      if (e.key === "ArrowRight" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);
      const newOtp = pastedData
        .split("")
        .concat(["", "", "", "", "", ""])
        .slice(0, 6);
      setOtp(newOtp);
      onChange(newOtp.join(""));

      // Focus the next empty input or last input
      const nextEmptyIndex = newOtp.findIndex((val) => !val);
      const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
      inputRefs.current[focusIndex]?.focus();
    };

    return (
      <div className="flex justify-center gap-2 sm:gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`w-10 h-12 sm:w-12 text-center text-lg font-semibold border-2 rounded-lg transition-all duration-200 ${
              hasError
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200"
            } hover:border-gray-400 focus:outline-none`}
            maxLength={1}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-sm mx-auto p-4 sm:p-6 w-full">
      {step === 1 ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemaStep1}
          onSubmit={handleSignupSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Admin Sign Up
              </h1>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                  disabled={loading}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mobile Number
                </label>
                <Field
                  type="tel"
                  id="mobile"
                  name="mobile"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                  disabled={loading}
                />
                <ErrorMessage
                  name="mobile"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                  disabled={loading}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                  disabled={loading}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 mt-4"
              >
                {loading || isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ otp: "" }}
          validationSchema={validationSchemaStep2}
          onSubmit={handleOtpSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Verify Mobile Number
                </h2>
                <p className="text-gray-600 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
                  We've sent a 6-digit verification code to{" "}
                  <span className="font-medium text-gray-900">{mobile}</span>
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 text-center"
                >
                  Verification Code
                </label>
                <Field name="otp">
                  {({ field, form }) => (
                    <OtpInput
                      value={field.value}
                      onChange={(otp) => form.setFieldValue("otp", otp)}
                      hasError={form.errors.otp && form.touched.otp}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-500 text-xs mt-1 flex items-center gap-1 justify-center"
                >
                  {(msg) => (
                    <>
                      <svg
                        className="w-3 h-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {msg}
                    </>
                  )}
                </ErrorMessage>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={resendOtp}
                  disabled={countdown > 0}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                    countdown > 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-green-600 hover:text-green-700"
                  }`}
                >
                  <svg
                    className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Change Number
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 mt-4"
              >
                {loading || isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify & Complete Signup"
                )}
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-gray-500">
                  Didn't receive the code? Check your spam folder or try again
                  in a few moments.
                </p>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Signup;
