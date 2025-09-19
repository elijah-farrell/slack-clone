import { useContext } from 'react'
import UserContext from '~/lib/UserContext'
import { deleteMessage } from '~/lib/Store'
import { Button } from '~/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Trash2 } from 'lucide-react'
import { cn } from '~/lib/utils'

const Message = ({ message }) => {
  const { user } = useContext(UserContext)
  const canDelete = user?.id === message.user_id || ['admin', 'moderator'].includes(user?.appRole)

  return (
    <div className="group flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src="" />
        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
          {message?.author?.username?.charAt(0).toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-foreground">
            {message?.author?.username || 'Unknown User'}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(message.inserted_at).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        <p className="text-sm text-foreground leading-relaxed break-words">
          {message.message}
        </p>
      </div>

      {canDelete && (
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
          onClick={() => deleteMessage(message.id)}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      )}
    </div>
  )
}

export default Message
