import { useState, useEffect } from 'react'
import { supabase } from 'lib/Store'
import Link from 'next/link'

const Demo = () => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Sample demo messages
    const demoMessages = [
      {
        id: 1,
        content: "Welcome to Spark! 👋 This is a demo channel where you can see how real-time messaging works.",
        user: { name: "Spark Team", avatar: "🌟" },
        created_at: new Date(Date.now() - 300000).toISOString() // 5 minutes ago
      },
      {
        id: 2,
        content: "See how messages appear instantly? That's the power of Supabase real-time! ⚡",
        user: { name: "Demo User", avatar: "👤" },
        created_at: new Date(Date.now() - 240000).toISOString() // 4 minutes ago
      },
      {
        id: 3,
        content: "Try typing in the input below... oh wait, you're just a guest! 😄",
        user: { name: "Chat Bot", avatar: "🤖" },
        created_at: new Date(Date.now() - 180000).toISOString() // 3 minutes ago
      },
      {
        id: 4,
        content: "Want to join the conversation? Create an account and start chatting with real people!",
        user: { name: "Spark Team", avatar: "🌟" },
        created_at: new Date(Date.now() - 120000).toISOString() // 2 minutes ago
      },
      {
        id: 5,
        content: "This demo shows off our beautiful UI, real-time updates, and secure messaging platform.",
        user: { name: "Demo User", avatar: "👤" },
        created_at: new Date(Date.now() - 60000).toISOString() // 1 minute ago
      }
    ]
    
    setMessages(demoMessages)
    setIsLoading(false)
  }, [])

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Spark</h1>
              <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Demo Mode
              </span>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                ← Back to Home
              </Link>
              <Link
                href="/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Channel Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900"># demo-channel</h2>
              <p className="text-sm text-gray-500">Welcome to Spark! This is a demo of our real-time chat platform.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Demo Mode</p>
              <p className="text-xs text-gray-400">Read-only access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading demo messages...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
                    {message.user.avatar}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">{message.user.name}</p>
                    <span className="text-xs text-gray-500">{formatTime(message.created_at)}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upgrade Prompts */}
        <div className="mt-8 space-y-4">
          {/* Main Upgrade Banner */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                Ready to join the conversation? 🚀
              </h3>
              <p className="text-indigo-700 mb-4">
                Create your account to start chatting with real people, join channels, and experience the full power of Spark!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Create Free Account
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4 text-center">What you get with a real account:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Real-time messaging</p>
                  <p className="text-xs text-gray-500">Chat with others instantly</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Join channels</p>
                  <p className="text-xs text-gray-500">Create and participate in discussions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Secure & private</p>
                  <p className="text-xs text-gray-500">Your data is protected</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Custom profile</p>
                  <p className="text-xs text-gray-500">Personalize your experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center py-6">
            <p className="text-gray-600 mb-3">Still not convinced? Create an account and see for yourself!</p>
            <Link
              href="/signup"
              className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
            >
              Get Started Now ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Demo
