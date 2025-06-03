
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { ChatArea } from '@/components/ChatArea';
import { ProfilePanel } from '@/components/ProfilePanel';
import { NavigationBar } from '@/components/NavigationBar';
import { CreateServerDialog } from '@/components/CreateServerDialog';
import { SettingsDialog } from '@/components/SettingsDialog';
import { ProfileDialog } from '@/components/ProfileDialog';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedChannelId, setSelectedChannelId] = useState<string>('');
  const [selectedChannelName, setSelectedChannelName] = useState<string>('');
  const [createServerOpen, setCreateServerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [refreshServers, setRefreshServers] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleChannelSelect = (channelId: string, channelName: string) => {
    setSelectedChannelId(channelId);
    setSelectedChannelName(channelName);
  };

  const handleServerCreated = () => {
    setRefreshServers(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-darker-bg text-foreground font-mono dark flex items-center justify-center">
        <div className="text-neon-cyan font-retro text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-darker-bg text-foreground font-mono dark">
      <div className="flex flex-col h-screen w-full">
        <NavigationBar 
          onCreateServer={() => setCreateServerOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenProfile={() => setProfileOpen(true)}
        />
        
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            onChannelSelect={handleChannelSelect}
            selectedChannelId={selectedChannelId}
            refreshTrigger={refreshServers}
          />
          <ChatArea 
            selectedChannelId={selectedChannelId}
            selectedChannelName={selectedChannelName}
          />
          <ProfilePanel />
        </div>
      </div>
      
      {/* Retro grid overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '20px 20px'
             }}>
        </div>
      </div>
      
      {/* Ambient glow effects */}
      <div className="fixed top-10 left-10 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl pointer-events-none z-0"></div>
      
      {/* Dialogs */}
      <CreateServerDialog 
        open={createServerOpen}
        onOpenChange={setCreateServerOpen}
        onServerCreated={handleServerCreated}
      />
      <SettingsDialog 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
      <ProfileDialog 
        open={profileOpen}
        onOpenChange={setProfileOpen}
      />
    </div>
  );
};

export default Index;
