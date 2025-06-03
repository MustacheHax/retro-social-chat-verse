
import { useState } from 'react';
import { MessageSquare, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    user: 'CyberPunk_42',
    content: 'Welcome to the retro future! 🌃',
    timestamp: '14:23'
  },
  {
    id: '2',
    user: 'NeonDreamer',
    content: 'Love the new theme! This feels like the 90s but better ✨',
    timestamp: '14:24'
  },
  {
    id: '3',
    user: 'RetroWave_88',
    content: 'Anyone up for some gaming? Got a new plugin that adds voice effects!',
    timestamp: '14:25'
  },
  {
    id: '4',
    user: 'SynthMaster',
    content: 'The encryption on this platform is solid 🔒 Privacy first!',
    timestamp: '14:26'
  }
];

export function ChatArea() {
  const [message, setMessage] = useState('');
  const [messages] = useState(mockMessages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message to the server
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Channel Header */}
      <div className="p-4 border-b border-neon-cyan/20 bg-card/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MessageSquare className="w-5 h-5 text-neon-cyan" />
            <h2 className="font-retro font-bold text-lg text-neon-cyan"># general</h2>
            <div className="text-sm text-muted-foreground font-mono">
              The main hangout spot for RetroHub
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="font-mono">12 online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scan-lines relative">
        {messages.map((msg) => (
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
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-neon-cyan/20 bg-card/30">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send encrypted message to #general..."
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
