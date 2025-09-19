import { useContext, useState } from 'react'
import UserContext from '~/lib/UserContext'
import { deleteMessage } from '~/lib/Store'
import { Button } from '~/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Trash2 } from 'lucide-react'
import { cn } from '~/lib/utils'
import DeleteConfirmationDialog from '~/components/DeleteConfirmationDialog'

const Message = ({ message }) => {
  const { user } = useContext(UserContext)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const canDelete = user?.id === message.user_id || ['admin', 'moderator'].includes(user?.appRole)

  const handleDelete = () => {
    deleteMessage(message.id)
  }

  return (
    <div className="group flex items-start gap-3 p-4 hover:bg-[#171717] transition-colors rounded-lg">
      <Avatar className="w-10 h-10 flex-shrink-0">
        <AvatarImage src="" />
        <AvatarFallback className="bg-red-500 text-white text-sm font-semibold">
          {message?.author?.username?.charAt(0).toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-semibold text-white">
            {message?.author?.username || 'Unknown User'}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(message.inserted_at).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        <p className="text-sm text-gray-200 leading-relaxed break-words">
          {message.message}
        </p>
      </div>

      {canDelete && (
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 hover:bg-red-500/20 hover:text-red-400"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
      
      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Message"
        description="Are you sure you want to delete this message? This action cannot be undone."
        itemName="message"
      />
    </div>
  )
}

export default Message
