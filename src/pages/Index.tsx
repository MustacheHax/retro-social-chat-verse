
import { Sidebar } from '@/components/Sidebar';
import { ChatArea } from '@/components/ChatArea';
import { ProfilePanel } from '@/components/ProfilePanel';

const Index = () => {
  return (
    <div className="min-h-screen bg-darker-bg text-foreground font-mono dark">
      <div className="flex h-screen w-full">
        <Sidebar />
        <ChatArea />
        <ProfilePanel />
      </div>
      
      {/* Retro grid overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
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
      <div className="fixed top-10 left-10 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default Index;
