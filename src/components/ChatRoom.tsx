import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  user_id: string;
  nickname: string;
  avatar_url: string | null;
  message: string;
  created_at: string;
}

export const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState<string>('');
  const [nickname, setNickname] = useState('访客');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // 加载用户资料
  useEffect(() => {
    const loadProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        return;
      }

      setUserId(session.user.id);

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (data) {
        setNickname(data.nickname);
        setAvatarUrl(data.avatar_url);
      }
    };
    loadProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (data) {
          setNickname(data.nickname);
          setAvatarUrl(data.avatar_url);
        }
      } else {
        setUserId('');
        setNickname('访客');
        setAvatarUrl(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 加载消息
  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(50);

      if (data) setMessages(data);
    };
    loadMessages();

    // 订阅实时消息
    const channel = supabase
      .channel('chat_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages'
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !userId) return;

    const { error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        nickname,
        avatar_url: avatarUrl,
        message: newMessage.trim()
      });

    if (error) {
      toast({
        title: "发送失败",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setNewMessage('');
    }
  };

  if (!userId) {
    return (
      <Card className="relative overflow-hidden bg-card/95 backdrop-blur-sm border-primary/20 shadow-elegant w-full max-w-sm p-6">
        <p className="text-center text-muted-foreground mb-4">请先登录使用聊天室</p>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden bg-card/95 backdrop-blur-sm border-primary/20 shadow-elegant w-full max-w-sm flex flex-col h-[400px]">
      <div className="relative p-3 border-b border-border/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">聊天室</h3>
          </div>
        </div>

        {/* 用户信息 */}
        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
          <Avatar className="w-8 h-8">
            <AvatarImage src={avatarUrl || undefined} />
            <AvatarFallback>
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium">{nickname}</span>
          <span className="text-xs text-muted-foreground ml-auto">在个人中心修改</span>
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.user_id === userId ? 'flex-row-reverse' : ''}`}
          >
            <Avatar className="w-6 h-6 flex-shrink-0">
              <AvatarImage src={msg.avatar_url || undefined} />
              <AvatarFallback>
                <User className="w-3 h-3" />
              </AvatarFallback>
            </Avatar>
            <div className={`flex flex-col ${msg.user_id === userId ? 'items-end' : 'items-start'}`}>
              <span className="text-xs text-muted-foreground">{msg.nickname}</span>
              <div
                className={`mt-1 px-3 py-1.5 rounded-lg text-xs max-w-[200px] break-words ${
                  msg.user_id === userId
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {msg.message}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入框 */}
      <div className="p-3 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="输入消息..."
            className="text-xs h-8"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            size="sm"
            className="h-8 px-3"
          >
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};