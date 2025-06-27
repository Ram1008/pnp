import React from 'react'

export const metadata = {
  title: 'Authentication - Print N Parcel',
  description: 'Login or sign up to access your Print N Parcel account',
  keywords: 'authentication, login, signup, print n parcel'
}

const AuthLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center">
      <header className="w-full flex justify-center py-6">
        <h1 className="text-2xl font-bold">
        <span className="text-4xl">Welcome to </span> <br/><span className="color-secondary text-3xl"> Print N Parcel</span>
        </h1>
      </header>

      <main className="w-full  flex items-center justify-center px-4">
        {children}
      </main>

      <footer className="absolute w-full bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-center py-4">
        <p>By signing in, you agree to our</p>
        <p>
          <span className="color-secondary">Terms &amp; Conditions</span> and{' '}
          <span className="color-secondary">Privacy Policy</span>
        </p>
      </footer>
    </div>
  )
}

export default AuthLayout
