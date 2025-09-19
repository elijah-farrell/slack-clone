import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'

const NewChannelDialog = ({ open, onOpenChange, onSubmit }) => {
  const [channelName, setChannelName] = useState('')
  const [error, setError] = useState('')

  const validateChannelName = (name) => {
    // Only allow lowercase letters, numbers, and hyphens
    const validPattern = /^[a-z0-9-]+$/
    const hasSpaces = /\s/.test(name)
    const startsOrEndsWithHyphen = /^-|-$/.test(name)
    const hasConsecutiveHyphens = /--/.test(name)
    
    if (hasSpaces) {
      return 'Channel names cannot contain spaces'
    }
    if (!validPattern.test(name)) {
      return 'Channel names can only contain lowercase letters, numbers, and hyphens'
    }
    if (startsOrEndsWithHyphen) {
      return 'Channel names cannot start or end with hyphens'
    }
    if (hasConsecutiveHyphens) {
      return 'Channel names cannot have consecutive hyphens'
    }
    if (name.length < 2) {
      return 'Channel names must be at least 2 characters long'
    }
    if (name.length > 50) {
      return 'Channel names cannot be longer than 50 characters'
    }
    return ''
  }

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase()
    setChannelName(value)
    setError(validateChannelName(value))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationError = validateChannelName(channelName)
    if (!validationError && channelName.trim()) {
      onSubmit(channelName.trim())
      setChannelName('')
      setError('')
      onOpenChange(false)
    }
  }

  const handleCancel = () => {
    setChannelName('')
    setError('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Channel</DialogTitle>
          <DialogDescription>
            Enter a name for your new channel. Channel names should be lowercase and contain only letters, numbers, and hyphens.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="channel-name" className="text-right text-sm font-medium text-gray-300">
                Name
              </label>
              <Input
                id="channel-name"
                value={channelName}
                onChange={handleInputChange}
                placeholder="channel-name"
                className={`col-span-3 bg-black border-red-500/20 text-white placeholder:text-gray-500 focus:ring-red-500 focus:border-red-500 ${
                  error ? 'border-red-500' : ''
                }`}
                autoFocus
              />
            </div>
            {error && (
              <div className="col-span-4 text-sm text-red-400 mt-2">
                {error}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-red-500/20 text-gray-300 hover:bg-red-500/10 hover:text-red-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!channelName.trim() || !!error}
              className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
            >
              Create Channel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewChannelDialog
