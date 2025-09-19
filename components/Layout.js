import Link from 'next/link'
import { useContext, useState, useRef, useEffect } from 'react'
import UserContext from '~/lib/UserContext'
import { addChannel, deleteChannel } from '~/lib/Store'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Plus, Hash, Trash2, LogOut, MessageSquare, PanelLeftOpen, PanelLeftClose, ChevronUp } from 'lucide-react'
import { cn } from '~/lib/utils'
import NewChannelDialog from '~/components/NewChannelDialog'
import DeleteConfirmationDialog from '~/components/DeleteConfirmationDialog'

export default function Layout(props) {
  const { signOut, user } = useContext(UserContext)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [newChannelDialogOpen, setNewChannelDialogOpen] = useState(false)
  const [deleteChannelDialogOpen, setDeleteChannelDialogOpen] = useState(false)
  const [channelToDelete, setChannelToDelete] = useState(null)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

  const newChannel = async (channelName) => {
    await addChannel(slugify(channelName), user.id)
  }

  const handleDeleteChannel = (channel) => {
    setChannelToDelete(channel)
    setDeleteChannelDialogOpen(true)
  }

  const confirmDeleteChannel = async () => {
    if (channelToDelete) {
      await deleteChannel(channelToDelete.id)
      setChannelToDelete(null)
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <nav 
        className={cn(
          "text-white flex flex-col transition-all duration-300 bg-[#171717]",
          sidebarOpen ? "w-64" : "w-0 overflow-hidden"
        )}
      >
        {sidebarOpen && (
          <div className="flex flex-col h-full border-r border-red-500/20">
            {/* Header */}
            <div className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-lg">Spark</span>
              </div>
            </div>

            {/* Channels */}
            <div className="flex-1 overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-sidebar-foreground/70">Channels</h4>
                  <Button
                    onClick={() => setNewChannelDialogOpen(true)}
                    className="h-6 px-2 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                    size="sm"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    New
                  </Button>
                </div>
                <ScrollArea className="h-full">
                  <div className="space-y-1">
                    {props.channels.map((channel) => (
                      <SidebarItem
                        channel={channel}
                        key={channel.id}
                        isActiveChannel={channel.id === props.activeChannelId}
                        user={user}
                        onDelete={handleDeleteChannel}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* User Section */}
            <div className="p-4 relative" ref={dropdownRef}>
              <div 
                className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50 cursor-pointer hover:bg-red-500/10 transition-colors"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-red-500 text-white text-xs">
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {user?.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">
                    {user?.email}
                  </p>
                </div>
                <ChevronUp className="w-4 h-4 text-sidebar-foreground/60" />
              </div>
              
              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute bottom-full left-4 right-4 mb-2 bg-black border border-red-500/20 rounded-lg shadow-lg overflow-hidden">
                  <Button
                    onClick={signOut}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-white hover:bg-red-500/10 hover:text-red-400 rounded-none"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Messages */}
      <div className="flex-1 bg-black h-screen overflow-hidden relative">
        {/* Sidebar Toggle Button */}
        <Button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4 z-10 bg-black/80 hover:bg-red-500/20 text-white border border-red-500/20 rounded-lg transition-all duration-200"
          title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
        >
          {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
        </Button>
        {props.children}
      </div>
      
      {/* New Channel Dialog */}
      <NewChannelDialog
        open={newChannelDialogOpen}
        onOpenChange={setNewChannelDialogOpen}
        onSubmit={newChannel}
      />
      
      {/* Delete Channel Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteChannelDialogOpen}
        onOpenChange={setDeleteChannelDialogOpen}
        onConfirm={confirmDeleteChannel}
        title="Delete Channel"
        description={`Are you sure you want to delete the channel "${channelToDelete?.slug}"? This will permanently remove the channel and all its messages.`}
        itemName="channel"
      />
    </div>
  )
}

const SidebarItem = ({ channel, isActiveChannel, user, onDelete }) => (
  <div className="group flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-red-500/10 hover:text-red-400 text-gray-300">
    <Link 
      href="/channels/[id]" 
      as={`/channels/${channel.id}`}
      className={cn(
        "flex items-center gap-2 flex-1 min-w-0",
        isActiveChannel && "font-semibold text-red-400"
      )}
    >
      <Hash className="w-4 h-4 flex-shrink-0" />
      <span className="truncate">{channel.slug}</span>
    </Link>
    {channel.id !== 1 && (channel.created_by === user?.id || user?.appRole === 'admin') && (
      <Button
        variant="ghost"
        size="icon"
        className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onDelete(channel)}
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    )}
  </div>
)
