import { useState } from 'react'
import Head from 'next/head'
import { supabase } from 'lib/Store'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const validateInputs = (email, password) => {
    if (!email || !email.trim()) {
      return 'Email is required'
    }
    if (!email.includes('@') || !email.includes('.')) {
      return 'Please enter a valid email address'
    }
    if (!password || password.length < 1) {
      return 'Password is required'
    }
    return null
  }

  const handleResendConfirmation = async () => {
    if (!email.trim()) {
      setError('Please enter your email address first.')
      return
    }
    
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim()
      })
      
      if (error) {
        if (error.message.includes('rate limit') || error.message.includes('too many requests')) {
          setError('A confirmation email was recently sent. Please wait up to 1 hour before requesting another.')
        } else {
          setError('Failed to resend confirmation email: ' + error.message)
        }
      } else {
        setError('') // Clear any existing errors
        setSuccess('Confirmation email resent! Please check your inbox and spam folder.')
      }
    } catch (error) {
      setError('Failed to resend confirmation email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    
    // Clear previous messages
    setError('')
    setSuccess('')
    
    // Validate inputs
    const validationError = validateInputs(email, password)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    
    try {
      const { error, data: { user } } = await supabase.auth.signInWithPassword({ 
        email: email.trim(), 
        password 
      })
      
      if (error) {
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials and try again.')
        } else if (error.message.includes('Email not confirmed')) {
          setError('Please check your email and confirm your account before signing in.')
        } else if (error.message.includes('Too many requests')) {
          setError('Too many login attempts. Please wait a moment before trying again.')
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          setError('Network error. Please check your connection and try again.')
        } else {
          setError('Login failed: ' + error.message)
        }
      } else if (user) {
        // Login successful - user will be redirected by _app.js
        // Clear form
        setEmail('')
        setPassword('')
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Login error:', error)
      }
      if (error.message?.includes('network') || error.message?.includes('fetch')) {
        setError('Network error. Please check your connection and try again.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>SparkChat | Sign In</title>
      </Head>
      <div className="min-h-screen bg-black">
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-black border border-red-500/20 rounded-md hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors font-geist"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
      <div className="flex min-h-screen items-center justify-center py-12 px-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl font-orbitron">S</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 font-orbitron">
              Welcome back
            </h2>
            <p className="text-gray-300 font-geist">
              Sign in to your Spark account
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-black border border-red-500/20 rounded-2xl shadow-xl p-8">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-geist">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-3 py-3 bg-black border border-red-500/20 rounded-md placeholder-gray-500 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 transition-colors font-geist"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setSuccess('') // Clear success message when user types
                  }}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2 font-geist">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-3 py-3 bg-black border border-red-500/20 rounded-md placeholder-gray-500 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 transition-colors font-geist"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setSuccess('') // Clear success message when user types
                  }}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                  {error.includes('Email not confirmed') && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm text-red-600">
                        Your account exists but needs email confirmation. Please check your email and click the confirmation link.
                      </p>
                      <div className="space-y-1">
                        <Link href="/signup" legacyBehavior>
                          <span className="block text-sm text-red-500 hover:text-red-400 underline">
                            Need to create a new account? Sign up here
                          </span>
                        </Link>
                        <button 
                          type="button"
                          onClick={handleResendConfirmation}
                          className="block text-sm text-red-500 hover:text-red-400 underline"
                        >
                          Resend confirmation email
                        </button>
                      </div>
                    </div>
                  )}
                  {error.includes('Invalid email or password') && (
                    <div className="mt-3 text-sm text-red-600">
                      Forgot your password? <a href="mailto:farrellelijah@outlook.com?subject=Password%20Reset%20Request%20-%20Spark%20App&body=Hey%21%20I%20am%20having%20trouble%20logging%20into%20my%20Spark%20account.%20I%20forgot%20my%20password%20and%20need%20assistance%20to%20reset%20it.%0A%0AEmail%20address%20on%20file%3A%20%0A%0AThank%20you%20for%20your%20help%21" className="underline hover:text-red-500">Contact support for assistance</a>
                    </div>
                  )}
                </div>
              )}

              {success && (
                <div className="rounded-xl bg-green-50 border border-green-200 p-4">
                  <div className="text-sm text-green-700">{success}</div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed font-geist"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-red-500/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-400 font-geist">New to Spark?</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/signup"
                  className="w-full flex justify-center py-2 px-4 border border-red-500/20 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-black hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-geist"
                >
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Login
