import Link from 'next/link'
import { useContext } from 'react'
import UserContext from '~/lib/UserContext'
import { addChannel, deleteChannel } from '~/lib/Store'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Plus, Hash, Trash2, LogOut, MessageSquare } from 'lucide-react'
import { cn } from '~/lib/utils'

export default function Layout(props) {
  const { signOut, user } = useContext(UserContext)

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  const newChannel = async () => {
    const slug = prompt('Please enter channel name')
    if (slug) {
      addChannel(slugify(slug), user.id)
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <nav className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">Spark</span>
          </div>
          <Button
            onClick={newChannel}
            className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Channel
          </Button>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-hidden">
          <div className="p-4">
            <h4 className="text-sm font-semibold text-sidebar-foreground/70 mb-3">Channels</h4>
            <ScrollArea className="h-full">
              <div className="space-y-1">
                {props.channels.map((channel) => (
                  <SidebarItem
                    channel={channel}
                    key={channel.id}
                    isActiveChannel={channel.id === props.activeChannelId}
                    user={user}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs">
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
          </div>
          <Button
            onClick={signOut}
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </nav>

      {/* Messages */}
      <div className="flex-1 bg-background h-screen overflow-hidden">
        {props.children}
      </div>
    </div>
  )
}

const SidebarItem = ({ channel, isActiveChannel, user }) => (
  <div className="group flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
    <Link href="/channels/[id]" as={`/channels/${channel.id}`} legacyBehavior>
      <a className={cn(
        "flex items-center gap-2 flex-1 min-w-0",
        isActiveChannel && "font-semibold text-sidebar-accent-foreground"
      )}>
        <Hash className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">{channel.slug}</span>
      </a>
    </Link>
    {channel.id !== 1 && (channel.created_by === user?.id || user?.appRole === 'admin') && (
      <Button
        variant="ghost"
        size="icon"
        className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => deleteChannel(channel.id)}
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    )}
  </div>
)
