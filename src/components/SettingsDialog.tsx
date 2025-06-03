
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Profile settings
  const [username, setUsername] = useState(profile?.username || '');
  const [status, setStatus] = useState(profile?.status || '');
  const [bio, setBio] = useState(profile?.bio || '');
  
  // Account settings
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: username.trim(),
          status: status.trim(),
          bio: bio.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile updated!",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "Password updated!",
        description: "Your password has been changed successfully.",
      });
      
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-darker-bg border-neon-cyan/30">
        <DialogHeader>
          <DialogTitle className="text-neon-cyan font-retro">Settings</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Manage your account settings and preferences.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card/50">
            <TabsTrigger value="profile" className="text-neon-cyan">Profile</TabsTrigger>
            <TabsTrigger value="account" className="text-neon-cyan">Account</TabsTrigger>
            <TabsTrigger value="appearance" className="text-neon-cyan">Appearance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-neon-cyan">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-card/50 border-neon-cyan/30 text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-neon-cyan">Status</Label>
                <Input
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-card/50 border-neon-cyan/30 text-foreground"
                  placeholder="What's your status?"
                />
              </div>
              <div>
                <Label htmlFor="bio" className="text-neon-cyan">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-card/50 border-neon-cyan/30 text-foreground"
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>
              <Button 
                onClick={handleUpdateProfile}
                disabled={loading}
                className="bg-neon-cyan text-darker-bg hover:bg-neon-cyan/90"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-neon-cyan">Email</Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-card/30 border-neon-cyan/20 text-muted-foreground"
                />
              </div>
              <div>
                <Label htmlFor="newPassword" className="text-neon-cyan">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-card/50 border-neon-cyan/30 text-foreground"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-neon-cyan">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-card/50 border-neon-cyan/30 text-foreground"
                  placeholder="Confirm new password"
                />
              </div>
              <Button 
                onClick={handleChangePassword}
                disabled={loading || !newPassword || newPassword !== confirmPassword}
                className="bg-neon-cyan text-darker-bg hover:bg-neon-cyan/90"
              >
                {loading ? 'Updating...' : 'Change Password'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <div className="space-y-4">
              <div className="text-center p-8 border border-neon-cyan/30 rounded">
                <div className="text-neon-cyan font-retro mb-2">Theme Settings</div>
                <div className="text-muted-foreground text-sm">
                  The retro cyberpunk theme is currently active.
                  <br />
                  Additional themes coming soon!
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
