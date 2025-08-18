import Link from 'next/link'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
          Spark
        </h1>
        <p className="mt-2 text-center text-lg text-gray-600">
          A modern real-time messaging platform built with Next.js and Supabase
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-200">
          <div className="flex flex-col gap-4">
            <Link
              href="/signup"
              className="w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
            >
              Get Started - Create Account
            </Link>
            
            <Link
              href="/login"
              className="w-full flex justify-center py-2 px-6 border-2 border-indigo-600 rounded-lg shadow-md text-base font-semibold text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
            >
              Sign In to Existing Account
            </Link>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            <Link
              href="/demo"
              className="w-full flex justify-center py-3 px-6 border-2 border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
            >
              View as Guest ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
