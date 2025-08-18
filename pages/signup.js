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
      const { error, data: { user } } = await supabase.auth.signUp({ 
        email: email.trim(), 
        password 
      })
      
      // Debug: Log the actual response
      console.log('Signup response:', { error, user })
      
      if (error) {
        // Handle specific error cases with more flexible matching
        const errorMsg = error.message.toLowerCase()
        
        if (errorMsg.includes('already registered') || 
            errorMsg.includes('already exists') || 
            errorMsg.includes('user already registered') ||
            errorMsg.includes('duplicate key') ||
            errorMsg.includes('already been registered')) {
          setError('An account with this email already exists. Please try logging in instead.')
        } else if (errorMsg.includes('password') || errorMsg.includes('weak')) {
          setError('Password is too weak. Please choose a stronger password.')
        } else if (errorMsg.includes('email') || errorMsg.includes('invalid')) {
          setError('Please enter a valid email address.')
        } else if (errorMsg.includes('network') || errorMsg.includes('fetch') || errorMsg.includes('timeout')) {
          setError('Network error. Please check your connection and try again.')
        } else {
          // Show the actual error message for debugging
          setError('Signup error: ' + error.message)
        }
      } else if (!user) {
        // This is the normal case for new signups - Supabase sends confirmation email
        setSuccess('Signup successful! Please check your email for confirmation.')
        // Clear form after successful signup
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      } else if (user) {
        // User object exists - this means the email is already registered
        // Debug: Log the user object to see what we're actually getting
        console.log('User object details:', {
          id: user.id,
          email: user.email,
          email_confirmed_at: user.email_confirmed_at,
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at,
          aud: user.aud,
          role: user.role
        })
        
        // Show appropriate message based on what we can determine
        if (user.email_confirmed_at) {
          // Account is confirmed - tell them to sign in
          setError('An account with this email already exists and is confirmed. Please sign in instead.')
        } else if (user.last_sign_in_at) {
          // If they have a last_sign_in_at, they've probably confirmed their email
          setError('An account with this email already exists and appears to be confirmed. Please sign in instead.')
        } else if (user.aud === 'authenticated' && user.confirmation_sent_at) {
          // If they're authenticated and have a confirmation_sent_at, they're likely confirmed
          setError('An account with this email already exists and appears to be confirmed. Please sign in instead.')
        } else {
          // Account is NOT confirmed - auto-send confirmation email and show message
          try {
            const { error: resendError } = await supabase.auth.resend({
              type: 'signup',
              email: email.trim()
            })
            
            if (resendError) {
              if (resendError.message.includes('rate limit') || resendError.message.includes('too many requests')) {
                setError('A confirmation email was recently sent to this address. Please wait up to 1 hour before requesting another, or check your spam folder.')
              } else {
                setError('We\'ve sent a confirmation email to ' + email.trim() + '. Please check your inbox and spam folder. If you don\'t own this email, you can safely ignore this message.')
              }
            } else {
              setSuccess('We\'ve sent a confirmation email to ' + email.trim() + '. Please check your inbox and spam folder. If you don\'t own this email, you can safely ignore this message.')
            }
          } catch (resendError) {
            setError('We\'ve sent a confirmation email to ' + email.trim() + '. Please check your inbox and spam folder. If you don\'t own this email, you can safely ignore this message.')
          }
        }
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
                  onChange={(e) => setEmail(e.target.value)}
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
                    {error.includes('is confirmed') || error.includes('appears to be confirmed') ? (
                      // Account is confirmed - just show login option
                      <Link href="/login" className="block text-sm text-indigo-600 hover:text-indigo-500 underline">
                        Sign in to your account ↗
                      </Link>
                    ) : (
                      // For unconfirmed accounts, we now auto-send emails, so just show a helpful note
                      <p className="text-xs text-blue-700">
                        We've automatically sent a confirmation email. Please check your inbox and spam folder.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {success && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="text-sm text-green-700">{success}</div>
                <div className="mt-2 text-sm text-green-600">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button 
                    type="button" 
                    onClick={() => setSuccess('')}
                    className="underline hover:text-green-500"
                  >
                    try again
                  </button>
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
