
import { useState } from 'react';
import { Settings, User, LogOut, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface NavigationBarProps {
  onCreateServer?: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
}

export function NavigationBar({ onCreateServer, onOpenSettings, onOpenProfile }: NavigationBarProps) {
  const { signOut } = useAuth();
  const { profile } = useProfile();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="h-16 bg-card/50 border-b border-neon-cyan/30 flex items-center justify-between px-6">
      {/* Left side - Profile */}
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
              <Avatar className="h-10 w-10 border-2 border-neon-cyan/50">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-neon-cyan text-darker-bg font-retro">
                  {profile?.username?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-darker-bg border-neon-cyan/30">
            <DropdownMenuItem onClick={onOpenProfile} className="text-neon-cyan hover:bg-neon-cyan/10">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenSettings} className="text-neon-cyan hover:bg-neon-cyan/10">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-neon-cyan/20" />
            <DropdownMenuItem onClick={handleSignOut} className="text-red-400 hover:bg-red-500/10">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="text-neon-cyan font-retro">
          <div className="font-bold">{profile?.username || 'Loading...'}</div>
          <div className="text-xs text-muted-foreground">{profile?.status}</div>
        </div>
      </div>

      {/* Center - App Title */}
      <div className="flex-1 text-center">
        <h1 className="font-retro font-bold text-2xl neon-text flicker">
          RETROCOMM
        </h1>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-2">
        <Button
          onClick={onCreateServer}
          variant="outline"
          className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Server
        </Button>
      </div>
    </div>
  );
}
