import { useState, useRef, useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { Send } from 'lucide-react'

const MessageInput = ({ onSubmit }) => {
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
    <div className="flex items-end gap-2 p-4 border-t border-border bg-background">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] max-h-[120px]"
          placeholder="Send a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!messageText.trim()}
        size="icon"
        className="h-11 w-11 rounded-lg"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default MessageInput
