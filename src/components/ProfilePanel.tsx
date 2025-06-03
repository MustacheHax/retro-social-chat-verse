
import { useState } from 'react';
import { User, Bell, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileData {
  username: string;
  status: string;
  bio: string;
  topFriends: string[];
  customSections: { title: string; content: string }[];
}

const mockProfile: ProfileData = {
  username: 'RetroUser90',
  status: 'Vibing in the neon matrix 🌈',
  bio: 'Love 90s aesthetics, encrypted chats, and retro gaming. Plugin developer by night, synthwave enthusiast by day.',
  topFriends: ['CyberPunk_42', 'NeonDreamer', 'SynthMaster', 'RetroWave_88'],
  customSections: [
    {
      title: 'Favorite Plugins',
      content: 'VoiceEffects Pro, RetroThemes, CyberSecurity Suite'
    },
    {
      title: 'Now Playing',
      content: '🎵 Carpenter Brut - Turbo Killer'
    }
  ]
};

export function ProfilePanel() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile] = useState(mockProfile);

  return (
    <div className="w-80 h-screen bg-darker-bg border-l border-neon-cyan/30 overflow-y-auto">
      {/* Profile Header */}
      <div className="p-6 border-b border-neon-cyan/20 bg-card/30">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full retro-gradient flex items-center justify-center">
            <User className="w-10 h-10 text-darker-bg" />
          </div>
          <h2 className="font-retro font-bold text-xl neon-text mb-2">
            {profile.username}
          </h2>
          <div className="text-sm text-neon-magenta font-mono mb-3">
            {profile.status}
          </div>
          <div className="flex justify-center space-x-2">
            <button className="p-2 hover:bg-neon-cyan/10 rounded">
              <MessageSquare className="w-4 h-4 text-neon-cyan" />
            </button>
            <button className="p-2 hover:bg-neon-cyan/10 rounded">
              <Bell className="w-4 h-4 text-electric-blue" />
            </button>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="p-4 border-b border-neon-cyan/20">
        <h3 className="font-retro font-bold text-neon-magenta mb-2 uppercase tracking-wider text-sm">
          About Me
        </h3>
        <p className="text-foreground font-mono text-sm leading-relaxed">
          {profile.bio}
        </p>
      </div>

      {/* Top Friends (MySpace style) */}
      <div className="p-4 border-b border-neon-cyan/20">
        <h3 className="font-retro font-bold text-electric-blue mb-3 uppercase tracking-wider text-sm">
          Top Friends (4)
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {profile.topFriends.map((friend, index) => (
            <div
              key={friend}
              className={cn(
                "p-2 rounded retro-card text-center hover:retro-glow transition-all duration-200",
                "cursor-pointer"
              )}
            >
              <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-neon-lime flex items-center justify-center">
                <span className="text-xs font-retro font-bold text-darker-bg">
                  {friend.charAt(0)}
                </span>
              </div>
              <div className="text-xs font-mono text-foreground truncate">
                {friend}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Sections */}
      {profile.customSections.map((section, index) => (
        <div key={index} className="p-4 border-b border-neon-cyan/20">
          <h3 className="font-retro font-bold text-retro-purple mb-2 uppercase tracking-wider text-sm">
            {section.title}
          </h3>
          <p className="text-foreground font-mono text-sm">
            {section.content}
          </p>
        </div>
      ))}

      {/* Plugin Status */}
      <div className="p-4 border-b border-neon-cyan/20">
        <h3 className="font-retro font-bold text-neon-lime mb-2 uppercase tracking-wider text-sm">
          Active Plugins
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-mono text-foreground">RetroTheme v2.1</span>
            <span className="text-neon-lime">●</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-mono text-foreground">VoiceEffects</span>
            <span className="text-neon-lime">●</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-mono text-foreground">CryptoChat</span>
            <span className="text-neon-lime">●</span>
          </div>
        </div>
      </div>

      {/* Privacy Status */}
      <div className="p-4">
        <div className="retro-card p-3 text-center">
          <div className="text-neon-lime text-2xl mb-2">🔒</div>
          <div className="font-retro font-bold text-neon-cyan text-sm mb-1">
            ENCRYPTED
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            End-to-end encryption active
          </div>
        </div>
      </div>
    </div>
  );
}
