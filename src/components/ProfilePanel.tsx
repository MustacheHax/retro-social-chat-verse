
import { useState } from 'react';
import { User, Bell, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProfile } from '@/hooks/useProfile';

export function ProfilePanel() {
  const [isEditing, setIsEditing] = useState(false);
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="w-80 h-screen bg-darker-bg border-l border-neon-cyan/30 flex items-center justify-center">
        <div className="text-neon-cyan font-retro">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="w-80 h-screen bg-darker-bg border-l border-neon-cyan/30 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-neon-cyan font-retro mb-2">Profile Not Found</div>
          <div className="text-muted-foreground font-mono text-sm">
            Unable to load profile data
          </div>
        </div>
      </div>
    );
  }

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
