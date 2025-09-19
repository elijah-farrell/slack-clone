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
      <div className="flex flex-col h-full">
        {/* Messages Area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                  <p className="text-sm">Start the conversation by sending a message!</p>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                {messages.map((message) => (
                  <Message key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} style={{ height: 0 }} />
              </div>
            )}
          </div>
        </div>
        
        {/* Message Input */}
        <MessageInput onSubmit={async (text) => addMessage(text, channelId, user.id)} />
      </div>
    </Layout>
  )
}

export default ChannelsPage
