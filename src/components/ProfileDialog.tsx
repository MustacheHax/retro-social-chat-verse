
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProfile } from '@/hooks/useProfile';
import { Badge } from '@/components/ui/badge';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] bg-darker-bg border-neon-cyan/30">
          <div className="flex items-center justify-center p-8">
            <div className="text-neon-cyan font-retro">Loading profile...</div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-darker-bg border-neon-cyan/30">
        <DialogHeader>
          <DialogTitle className="text-neon-cyan font-retro">Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Avatar and basic info */}
          <div className="text-center space-y-4">
            <Avatar className="h-24 w-24 mx-auto border-4 border-neon-cyan/50">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-neon-cyan text-darker-bg font-retro text-2xl">
                {profile?.username?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="font-retro font-bold text-xl neon-text mb-2">
                {profile?.username || 'Unknown User'}
              </h2>
              <Badge variant="outline" className="border-neon-magenta text-neon-magenta">
                {profile?.status || 'No status'}
              </Badge>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <h3 className="font-retro font-bold text-neon-magenta uppercase tracking-wider text-sm">
              About
            </h3>
            <p className="text-foreground font-mono text-sm leading-relaxed bg-card/30 p-3 rounded border border-neon-cyan/20">
              {profile?.bio || 'No bio available.'}
            </p>
          </div>

          {/* Joined date */}
          <div className="space-y-2">
            <h3 className="font-retro font-bold text-neon-lime uppercase tracking-wider text-sm">
              Member Since
            </h3>
            <p className="text-foreground font-mono text-sm">
              {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Unknown'}
            </p>
          </div>

          {/* Status indicators */}
          <div className="space-y-2">
            <h3 className="font-retro font-bold text-electric-blue uppercase tracking-wider text-sm">
              Status
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-neon-lime rounded-full animate-pulse"></div>
              <span className="text-sm font-mono text-neon-lime">Online</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
