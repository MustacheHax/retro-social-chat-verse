
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

export function useMessages(channelId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!channelId || !user) {
      setMessages([]);
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select(`
            id,
            content,
            created_at,
            user_id,
            profiles!inner (
              username
            )
          `)
          .eq('channel_id', channelId)
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error fetching messages:', error);
          return;
        }

        const formattedMessages = data?.map((msg: any) => ({
          id: msg.id,
          user: msg.profiles?.username || 'Unknown User',
          content: msg.content,
          timestamp: new Date(msg.created_at).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })
        })) || [];

        setMessages(formattedMessages);
      } catch (error) {
        console.error('Error in fetchMessages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Set up real-time subscription
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `channel_id=eq.${channelId}`
        },
        (payload) => {
          // Fetch the new message with profile data
          supabase
            .from('messages')
            .select(`
              id,
              content,
              created_at,
              user_id,
              profiles!inner (
                username
              )
            `)
            .eq('id', payload.new.id)
            .single()
            .then(({ data }) => {
              if (data) {
                const newMessage = {
                  id: data.id,
                  user: data.profiles?.username || 'Unknown User',
                  content: data.content,
                  timestamp: new Date(data.created_at).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })
                };
                setMessages(prev => [...prev, newMessage]);
              }
            });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelId, user]);

  const sendMessage = async (content: string) => {
    if (!channelId || !user || !content.trim()) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          channel_id: channelId,
          user_id: user.id,
          content: content.trim()
        });

      if (error) {
        console.error('Error sending message:', error);
      }
    } catch (error) {
      console.error('Error in sendMessage:', error);
    }
  };

  return { messages, loading, sendMessage };
}
