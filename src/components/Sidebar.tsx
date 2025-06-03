
import { useState } from 'react';
import { Users, User, MessageSquare, Bell, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  unread?: number;
}

interface Server {
  id: string;
  name: string;
  icon?: string;
  channels: Channel[];
}

const mockServers: Server[] = [
  {
    id: '1',
    name: 'RetroHub',
    channels: [
      { id: '1', name: 'general', type: 'text', unread: 3 },
      { id: '2', name: 'random', type: 'text' },
      { id: '3', name: 'voice-lounge', type: 'voice' },
      { id: '4', name: 'gaming', type: 'voice' }
    ]
  },
  {
    id: '2',
    name: 'Neon Collective',
    channels: [
      { id: '5', name: 'announcements', type: 'text', unread: 1 },
      { id: '6', name: 'cyberpunk-chat', type: 'text' },
      { id: '7', name: 'synthwave-radio', type: 'voice' }
    ]
  }
];

export function Sidebar() {
  const [selectedServer, setSelectedServer] = useState('1');
  const [selectedChannel, setSelectedChannel] = useState('1');

  const currentServer = mockServers.find(s => s.id === selectedServer);

  return (
    <div className="w-80 h-screen bg-darker-bg border-r border-neon-cyan/30 flex">
      {/* Server List */}
      <div className="w-20 bg-card/50 border-r border-neon-cyan/20 p-2 space-y-2">
        {mockServers.map((server) => (
          <button
            key={server.id}
            onClick={() => setSelectedServer(server.id)}
            className={cn(
              "w-16 h-16 rounded-lg flex items-center justify-center text-xs font-retro font-bold transition-all duration-200",
              "retro-border hover:retro-glow",
              selectedServer === server.id 
                ? "bg-neon-cyan text-darker-bg pulse-glow" 
                : "bg-card/80 text-neon-cyan hover:bg-neon-cyan/10"
            )}
          >
            {server.name.charAt(0)}
          </button>
        ))}
      </div>

      {/* Channels and Users */}
      <div className="flex-1 flex flex-col">
        {/* Server Header */}
        <div className="p-4 border-b border-neon-cyan/20 bg-card/30">
          <h2 className="font-retro font-bold text-lg neon-text flicker">
            {currentServer?.name}
          </h2>
        </div>

        {/* Channels */}
        <div className="flex-1 p-4 space-y-4">
          <div>
            <h3 className="text-neon-magenta font-retro font-bold text-sm mb-2 uppercase tracking-wider">
              Channels
            </h3>
            <div className="space-y-1">
              {currentServer?.channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-2 rounded text-left transition-all duration-200",
                    "hover:bg-neon-cyan/10 hover:border-neon-cyan/30 border border-transparent",
                    selectedChannel === channel.id 
                      ? "bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan" 
                      : "text-muted-foreground hover:text-neon-cyan"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    {channel.type === 'text' ? (
                      <MessageSquare className="w-4 h-4" />
                    ) : (
                      <Users className="w-4 h-4" />
                    )}
                    <span className="font-mono text-sm">{channel.name}</span>
                  </div>
                  {channel.unread && (
                    <span className="bg-neon-magenta text-darker-bg text-xs font-bold px-2 py-1 rounded-full">
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Online Users */}
          <div>
            <h3 className="text-electric-blue font-retro font-bold text-sm mb-2 uppercase tracking-wider">
              Online (12)
            </h3>
            <div className="space-y-1">
              {['CyberPunk_42', 'NeonDreamer', 'RetroWave_88', 'SynthMaster'].map((user) => (
                <div key={user} className="flex items-center space-x-2 p-1 hover:bg-electric-blue/10 rounded">
                  <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse"></div>
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-mono text-sm text-foreground">{user}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Profile Bar */}
        <div className="p-4 border-t border-neon-cyan/20 bg-card/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-neon-cyan rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-darker-bg" />
              </div>
              <div>
                <div className="font-mono text-sm text-neon-cyan">RetroUser90</div>
                <div className="font-mono text-xs text-muted-foreground">#1337</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-neon-cyan/10 rounded">
                <Bell className="w-4 h-4 text-muted-foreground hover:text-neon-cyan" />
              </button>
              <button className="p-2 hover:bg-neon-cyan/10 rounded">
                <Settings className="w-4 h-4 text-muted-foreground hover:text-neon-cyan" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
