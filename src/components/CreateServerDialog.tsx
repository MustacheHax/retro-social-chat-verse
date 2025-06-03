
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CreateServerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onServerCreated?: () => void;
}

export function CreateServerDialog({ open, onOpenChange, onServerCreated }: CreateServerDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !name.trim()) return;

    setLoading(true);
    try {
      // Create server
      const { data: server, error: serverError } = await supabase
        .from('servers')
        .insert({
          name: name.trim(),
          description: description.trim() || null,
          owner_id: user.id
        })
        .select()
        .single();

      if (serverError) throw serverError;

      // Add creator as member
      const { error: memberError } = await supabase
        .from('server_members')
        .insert({
          server_id: server.id,
          user_id: user.id
        });

      if (memberError) throw memberError;

      // Create default channels
      const { error: channelsError } = await supabase
        .from('channels')
        .insert([
          { server_id: server.id, name: 'general', type: 'text' },
          { server_id: server.id, name: 'random', type: 'text' }
        ]);

      if (channelsError) throw channelsError;

      toast({
        title: "Server created!",
        description: `${name} has been created successfully.`,
      });

      setName('');
      setDescription('');
      onOpenChange(false);
      onServerCreated?.();
    } catch (error) {
      console.error('Error creating server:', error);
      toast({
        title: "Error",
        description: "Failed to create server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-darker-bg border-neon-cyan/30">
        <DialogHeader>
          <DialogTitle className="text-neon-cyan font-retro">Create Server</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create a new server for your community to chat and collaborate.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-neon-cyan">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3 bg-card/50 border-neon-cyan/30 text-foreground"
                placeholder="My Awesome Server"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right text-neon-cyan">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3 bg-card/50 border-neon-cyan/30 text-foreground"
                placeholder="A place to hang out and chat..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-neon-cyan/30 text-muted-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !name.trim()}
              className="bg-neon-cyan text-darker-bg hover:bg-neon-cyan/90"
            >
              {loading ? 'Creating...' : 'Create Server'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
