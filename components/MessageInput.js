import { useState, useRef, useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { Send } from 'lucide-react'

const MessageInput = ({ onSubmit, channelName }) => {
  const [messageText, setMessageText] = useState('')
  const textareaRef = useRef(null)

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }

  useEffect(() => {
    adjustHeight()
  }, [messageText])

  const handleSubmit = () => {
    if (messageText.trim()) {
      onSubmit(messageText.trim())
      setMessageText('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="px-4 py-4 bg-black message-input">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <textarea
            ref={textareaRef}
            className="w-full resize-none rounded-2xl border border-red-500/30 bg-black px-4 py-3 pr-12 text-sm text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[52px] max-h-[200px] overflow-hidden shadow-2xl shadow-red-500/10"
            placeholder={`Message ${channelName || 'Spark Chat'}...`}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <Button
            onClick={handleSubmit}
            disabled={!messageText.trim()}
            size="icon"
            className="absolute right-1 top-1 h-10 w-10 rounded-xl bg-red-500 hover:bg-red-600 text-white flex-shrink-0 shadow-lg transition-all duration-200 hover:scale-105"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MessageInput
