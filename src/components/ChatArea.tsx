
import { useState } from 'react';
import { MessageSquare, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMessages } from '@/hooks/useMessages';

interface ChatAreaProps {
  selectedChannelId?: string;
  selectedChannelName?: string;
}

export function ChatArea({ selectedChannelId, selectedChannelName }: ChatAreaProps) {
  const [message, setMessage] = useState('');
  const { messages, loading, sendMessage } = useMessages(selectedChannelId || null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && selectedChannelId) {
      await sendMessage(message);
      setMessage('');
    }
  };

  if (!selectedChannelId) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-neon-cyan/50 mx-auto mb-4" />
          <h2 className="font-retro font-bold text-xl text-neon-cyan mb-2">
            Welcome to RetroComm
          </h2>
          <p className="text-muted-foreground font-mono">
            Select a channel to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Channel Header */}
      <div className="p-4 border-b border-neon-cyan/20 bg-card/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MessageSquare className="w-5 h-5 text-neon-cyan" />
            <h2 className="font-retro font-bold text-lg text-neon-cyan">
              # {selectedChannelName}
            </h2>
            <div className="text-sm text-muted-foreground font-mono">
              Encrypted channel communications
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="font-mono">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scan-lines relative">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-neon-cyan font-retro">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-muted-foreground font-mono mb-2">No messages yet</div>
              <div className="text-sm text-muted-foreground font-mono">
                Be the first to send a message in #{selectedChannelName}
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex space-x-3 hover:bg-neon-cyan/5 p-2 rounded transition-colors">
              <div className="w-10 h-10 rounded-full bg-retro-gradient flex items-center justify-center text-darker-bg font-retro font-bold">
                {msg.user.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline space-x-2 mb-1">
                  <span className="font-retro font-bold text-neon-cyan">{msg.user}</span>
                  <span className="text-xs text-muted-foreground font-mono">{msg.timestamp}</span>
                </div>
                <div className="text-foreground font-mono">{msg.content}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-neon-cyan/20 bg-card/30">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Send encrypted message to #${selectedChannelName}...`}
              className={cn(
                "w-full p-3 rounded-lg bg-darker-bg border border-neon-cyan/30",
                "text-foreground placeholder-muted-foreground font-mono",
                "focus:outline-none focus:border-neon-cyan focus:retro-glow",
                "transition-all duration-200"
              )}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-xs text-neon-lime font-mono">🔒</span>
            </div>
          </div>
          <button
            type="submit"
            className={cn(
              "px-6 py-3 rounded-lg font-retro font-bold",
              "bg-neon-cyan text-darker-bg",
              "hover:bg-neon-cyan/80 hover:retro-glow",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            disabled={!message.trim()}
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}
