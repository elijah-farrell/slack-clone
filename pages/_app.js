import '~/styles/style.scss'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import UserContext from 'lib/UserContext'
import { supabase } from 'lib/Store'
import { jwtDecode } from 'jwt-decode'

export default function SupabaseSlackClone({ Component, pageProps }) {
  const [userLoaded, setUserLoaded] = useState(false)
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const router = useRouter()

  useEffect(() => {
    let authListener = null

    function saveSession(
      /** @type {Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']} */
      session
    ) {
      setSession(session)
      const currentUser = session?.user
      if (session) {
        const jwt = jwtDecode(session.access_token)
        currentUser.appRole = jwt.user_role
        setUser(currentUser)
        setUserLoaded(true)
        // Only redirect to channels if we're not already there
        if (router.pathname === '/') {
          router.push('/channels/[id]', '/channels/1')
        }
      } else {
        // User logged out - redirect to landing page
        setUser(null)
        setUserLoaded(false)
        // Redirect from protected routes to landing page
        if (router.pathname !== '/' && router.pathname !== '/signup' && router.pathname !== '/login') {
          router.push('/')
        }
      }
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => saveSession(session))

    // Set up auth state change listener
    try {
      const { subscription } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth state change:', event, session)
          saveSession(session)
        }
      )
      authListener = subscription
    } catch (error) {
      console.error('Error setting up auth listener:', error)
    }

    return () => {
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe()
      }
    }
  }, [router])

  // Handle direct access to protected routes
  useEffect(() => {
    if (userLoaded && !user && router.pathname.startsWith('/channels')) {
      router.push('/')
    }
  }, [userLoaded, user, router])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/')
    }
  }

  return (
    <div className="antialiased dark">
      <Head>
        <link rel="icon" href="/spark.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <UserContext.Provider
        value={{
          userLoaded,
          user,
          signOut,
        }}
      >
        <Component {...pageProps} />
      </UserContext.Provider>
    </div>
  )
}
