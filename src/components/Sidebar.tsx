
import { useState, useEffect } from 'react';
import { Users, User, MessageSquare, Bell, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useServerData } from '@/hooks/useServerData';
import { useProfile } from '@/hooks/useProfile';

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  unread?: number;
}

interface Server {
  id: string;
  name: string;
  channels: Channel[];
}

interface SidebarProps {
  onChannelSelect?: (channelId: string, channelName: string) => void;
  selectedChannelId?: string;
  refreshTrigger?: number;
}

export function Sidebar({ onChannelSelect, selectedChannelId, refreshTrigger }: SidebarProps) {
  const [selectedServer, setSelectedServer] = useState<string>('');
  const { signOut } = useAuth();
  const { servers, loading, refetch } = useServerData();
  const { profile } = useProfile();

  useEffect(() => {
    if (refreshTrigger && refetch) {
      refetch();
    }
  }, [refreshTrigger, refetch]);

  useEffect(() => {
    if (servers.length > 0 && !selectedServer) {
      setSelectedServer(servers[0].id);
    }
  }, [servers, selectedServer]);

  const currentServer = servers.find(s => s.id === selectedServer);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-80 h-full bg-darker-bg border-r border-neon-cyan/30 flex items-center justify-center">
        <div className="text-neon-cyan font-retro">Loading...</div>
      </div>
    );
  }

  if (servers.length === 0) {
    return (
      <div className="w-80 h-full bg-darker-bg border-r border-neon-cyan/30 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-neon-cyan font-retro mb-2">No Servers Found</div>
          <div className="text-muted-foreground font-mono text-sm">
            Create your first server to get started!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 h-full bg-darker-bg border-r border-neon-cyan/30 flex">
      {/* Server List */}
      <div className="w-20 bg-card/50 border-r border-neon-cyan/20 p-2 space-y-2">
        {servers.map((server) => (
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
            {currentServer?.name || 'No Server'}
          </h2>
        </div>

        {/* Channels */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {currentServer && (
            <div>
              <h3 className="text-neon-magenta font-retro font-bold text-sm mb-2 uppercase tracking-wider">
                Channels
              </h3>
              <div className="space-y-1">
                {currentServer.channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => onChannelSelect?.(channel.id, channel.name)}
                    className={cn(
                      "w-full flex items-center justify-between p-2 rounded text-left transition-all duration-200",
                      "hover:bg-neon-cyan/10 hover:border-neon-cyan/30 border border-transparent",
                      selectedChannelId === channel.id 
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
          )}
        </div>

        {/* User Profile Bar */}
        <div className="p-4 border-t border-neon-cyan/20 bg-card/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-neon-cyan rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-darker-bg" />
              </div>
              <div>
                <div className="font-mono text-sm text-neon-cyan">
                  {profile?.username || 'Loading...'}
                </div>
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
              <button 
                onClick={handleSignOut}
                className="p-2 hover:bg-red-500/10 rounded"
              >
                <LogOut className="w-4 h-4 text-muted-foreground hover:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
