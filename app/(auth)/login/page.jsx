"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGlobal } from "@/context/GlobalContext";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const { login, loading, } = useGlobal();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState(null);

  // Login form
  const initialValues = {
    identifier: "", // Can be email or mobile
    password: "",
  };

  // Forgot password form
  const forgotPasswordValues = {
    identifier: "",
  };

  const validationSchema = Yup.object({
    identifier: Yup.string().required("Mobile or email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const forgotPasswordSchema = Yup.object({
    identifier: Yup.string().required("Mobile or email is required"),
  });

  const handleLogin = async (values) => {
    try {
      setError(null);
      await login(values);
      // On successful login, the GlobalContext will handle redirection
    } catch (err) {
      // Error is already set in the GlobalContext
      console.error("Login error:", err);
    }
  };

  const handleForgotPassword = async (values, { resetForm }) => {
    try {
      setError(null);
      // You would call forgotPassword here if implemented in your API
      // await forgotPassword(values.identifier);
      console.log("Password reset requested for:", values.identifier);
      setResetSent(true);
      resetForm();
    } catch (err) {
      setError(err.message || "Failed to send reset instructions");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Login to Your Account
      </h1>

      {!showForgotPassword ? (
        <>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="identifier"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mobile Number or Email
                  </label>
                  <Field
                    type="text"
                    id="identifier"
                    name="identifier"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter mobile or email"
                  />
                  <ErrorMessage
                    name="identifier"
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
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    loading || isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
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
                      Logging in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </div>
        </>
      ) : (
        <>
          {resetSent ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-100 text-green-700 rounded-md">
                Password reset instructions sent to your email/mobile
              </div>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetSent(false);
                }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <Formik
              initialValues={forgotPasswordValues}
              validationSchema={forgotPasswordSchema}
              onSubmit={handleForgotPassword}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <h2 className="text-xl font-semibold">Reset Password</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Enter your mobile number or email to receive reset
                    instructions
                  </p>

                  {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                      {error}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="forgotIdentifier"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mobile Number or Email
                    </label>
                    <Field
                      type="text"
                      id="forgotIdentifier"
                      name="identifier"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter mobile or email"
                    />
                    <ErrorMessage
                      name="identifier"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || isSubmitting}
                      className={`flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 ${
                        loading || isSubmitting
                          ? "opacity-70 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {loading || isSubmitting
                        ? "Sending..."
                        : "Send Reset Link"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </>
      )}
    </div>
  );
};

export default Login;
