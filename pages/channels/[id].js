import Layout from '~/components/Layout'
import Message from '~/components/Message'
import MessageInput from '~/components/MessageInput'
import { useRouter } from 'next/router'
import { useStore, addMessage } from '~/lib/Store'
import { useContext, useEffect, useRef } from 'react'
import UserContext from '~/lib/UserContext'

const ChannelsPage = (props) => {
  const router = useRouter()
  const { user, userLoaded, signOut } = useContext(UserContext)
  const messagesEndRef = useRef(null)

  // Else load up the page
  const { id: channelId } = router.query
  const { messages, channels } = useStore({ channelId })

  // Authentication guard - redirect to landing if not logged in
  useEffect(() => {
    if (userLoaded && !user) {
      router.push('/')
    }
  }, [userLoaded, user, router])

  // redirect to public channel when current channel is deleted
  useEffect(() => {
    if (!channels.some((channel) => channel.id === Number(channelId))) {
      router.push('/channels/1')
    }
  }, [channels, channelId])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      })
    }
  }, [messages])

  // Show loading state while checking auth
  if (!userLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  // Render the channels and messages
  return (
    <Layout channels={channels} activeChannelId={channelId}>
      <div className="relative h-screen">
        <div className="Messages h-full pb-16">
          <div className="p-2 overflow-y-auto">
            {messages.map((x) => (
              <Message key={x.id} message={x} />
            ))}
            <div ref={messagesEndRef} style={{ height: 0 }} />
          </div>
        </div>
        <div className="p-2 absolute bottom-0 left-0 w-full">
          <MessageInput onSubmit={async (text) => addMessage(text, channelId, user.id)} />
        </div>
      </div>
    </Layout>
  )
}

export default ChannelsPage
