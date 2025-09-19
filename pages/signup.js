import { useState } from 'react'
import { supabase } from 'lib/Store'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const validateInputs = (email, password, confirmPassword) => {
    if (!email || !email.trim()) {
      return 'Email is required'
    }
    if (!email.includes('@') || !email.includes('.')) {
      return 'Please enter a valid email address'
    }
    if (!password || password.length < 6) {
      return 'Password must be at least 6 characters long'
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match'
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
        setSuccess('Confirmation email resent! Please check your inbox and spam folder.')
      }
    } catch (error) {
      setError('Failed to resend confirmation email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    
    // Clear previous messages
    setError('')
    setSuccess('')
    
    // Validate inputs
    const validationError = validateInputs(email, password, confirmPassword)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    
    try {
      // First check if email already exists in our database
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email.trim())
        .single()
      
      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error checking email:', checkError)
        setError('Error checking email availability. Please try again.')
        return
      }
      
      if (existingUser) {
        setError('An account with this email already exists. Please try logging in instead.')
        return
      }

      // Email is new, proceed with signup
      const { error, data } = await supabase.auth.signUp({ 
        email: email.trim(), 
        password 
      })
      
      if (error) {
        // Handle specific Supabase errors
        if (error.message.includes('password') || error.message.includes('weak')) {
          setError('Password is too weak. Please choose a stronger password.')
        } else if (error.message.includes('email') || error.message.includes('invalid')) {
          setError('Please enter a valid email address.')
        } else if (error.message.includes('network') || error.message.includes('fetch') || error.message.includes('timeout')) {
          setError('Network error. Please check your connection and try again.')
        } else {
          // Show the actual error message for debugging
          setError('Signup error: ' + error.message)
        }
      } else {
        // Success - Supabase will send confirmation email automatically
        setSuccess('Signup successful! Please check your email for confirmation.')
        // Clear form after successful signup
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      }
    } catch (error) {
      console.log('Caught error:', error)
      if (error.message?.includes('network') || error.message?.includes('fetch')) {
        setError('Network error. Please check your connection and try again.')
      } else {
        setError('An unexpected error occurred: ' + (error.message || 'Unknown error'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="your.email@example.com"
                                      value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setSuccess('') // Clear success message when user types
                    }}
                    disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters long</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

                          {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                  {error.includes('already exists') && (
                    <div className="mt-3 space-y-2">
                      <Link href="/login" className="block text-sm text-indigo-600 hover:text-indigo-500 underline">
                        Sign in to your account ↗
                      </Link>
                      <p className="text-xs text-gray-600">
                        Forgot your password? <a href="mailto:farrellelijah@outlook.com?subject=Password%20Reset%20Request%20-%20Spark%20App&body=Hey%21%20I%20am%20having%20trouble%20logging%20into%20my%20Spark%20account.%20I%20forgot%20my%20password%20and%20need%20assistance%20to%20reset%20it.%0A%0AEmail%20address%20on%20file%3A%20%0A%0AThank%20you%20for%20your%20help%21" className="underline hover:text-gray-500">Contact support for assistance</a>
                      </p>
                    </div>
                  )}
                  {!error.includes('already exists') && (
                    <div className="mt-3">
                      <Link href="/login" className="block text-sm text-indigo-600 hover:text-indigo-500 underline">
                        Already have an account? Sign in here ↗
                      </Link>
                    </div>
                  )}
                </div>
              )}

                          {success && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="text-sm text-green-700">{success}</div>
                  <div className="mt-2 text-sm text-green-600">
                    Didn't receive the email? Check your spam folder or try again in a few minutes.
                  </div>
                  <div className="mt-2 text-xs text-gray-600">
                    Note: If you've signed up before, you may not receive a new email if your account is already confirmed.
                  </div>
                </div>
              )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/login"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
