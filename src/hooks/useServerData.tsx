
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Server {
  id: string;
  name: string;
  description?: string;
  channels: Channel[];
}

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  unread?: number;
}

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

export function useServerData() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setServers([]);
      setLoading(false);
      return;
    }

    const fetchServers = async () => {
      try {
        // Fetch servers the user is a member of
        const { data: serverMembers, error: membersError } = await supabase
          .from('server_members')
          .select(`
            server_id,
            servers (
              id,
              name,
              description
            )
          `)
          .eq('user_id', user.id);

        if (membersError) {
          console.error('Error fetching servers:', membersError);
          return;
        }

        if (!serverMembers?.length) {
          setServers([]);
          setLoading(false);
          return;
        }

        // Fetch channels for each server
        const serversWithChannels = await Promise.all(
          serverMembers.map(async (member: any) => {
            const server = member.servers;
            
            const { data: channels, error: channelsError } = await supabase
              .from('channels')
              .select('id, name, type')
              .eq('server_id', server.id);

            if (channelsError) {
              console.error('Error fetching channels:', channelsError);
              return { ...server, channels: [] };
            }

            return {
              ...server,
              channels: channels || []
            };
          })
        );

        setServers(serversWithChannels);
      } catch (error) {
        console.error('Error in fetchServers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, [user]);

  return { servers, loading };
}
