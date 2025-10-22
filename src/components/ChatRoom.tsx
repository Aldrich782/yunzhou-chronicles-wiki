import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, User, Upload, X, Minus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  user_id: string;
  nickname: string;
  avatar_url: string | null;
  message: string;
  created_at: string;
}

interface Profile {
  user_id: string;
  nickname: string;
  avatar_url: string | null;
}

export const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState<string>('');
  const [profile, setProfile] = useState<Profile>({ user_id: '', nickname: '访客', avatar_url: null });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editNickname, setEditNickname] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // 生成或获取用户ID
  useEffect(() => {
    let storedUserId = localStorage.getItem('chat_user_id');
    if (!storedUserId) {
      storedUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chat_user_id', storedUserId);
    }
    setUserId(storedUserId);
    loadProfile(storedUserId);
  }, []);

  // 加载用户资料
  const loadProfile = async (uid: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', uid)
      .maybeSingle();

    if (error) {
      console.error('Error loading profile:', error);
      return;
    }

    if (data) {
      setProfile(data);
      setEditNickname(data.nickname);
    } else {
      // 创建新资料
      const newProfile = {
        user_id: uid,
        nickname: `访客${Math.floor(Math.random() * 1000)}`,
        avatar_url: null,
      };
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([newProfile]);
      
      if (!insertError) {
        setProfile(newProfile);
        setEditNickname(newProfile.nickname);
      }
    }
  };

  // 加载消息
  useEffect(() => {
    if (!userId) return;

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(100);

      if (!error && data) {
        setMessages(data);
      }
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
          table: 'chat_messages',
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 发送消息
  const sendMessage = async () => {
    if (!newMessage.trim() || !userId) return;

    const { error } = await supabase.from('chat_messages').insert([
      {
        user_id: userId,
        nickname: profile.nickname,
        avatar_url: profile.avatar_url,
        message: newMessage.trim(),
      },
    ]);

    if (error) {
      toast({
        title: '发送失败',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setNewMessage('');
    }
  };

  // 更新昵称
  const updateNickname = async () => {
    if (!editNickname.trim() || !userId) return;

    const { error } = await supabase
      .from('profiles')
      .update({ nickname: editNickname.trim() })
      .eq('user_id', userId);

    if (error) {
      toast({
        title: '更新失败',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setProfile({ ...profile, nickname: editNickname.trim() });
      setIsEditingProfile(false);
      toast({
        title: '昵称已更新',
      });
    }
  };

  // 上传头像
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    // 创建本地URL
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: base64 })
        .eq('user_id', userId);

      if (error) {
        toast({
          title: '上传失败',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setProfile({ ...profile, avatar_url: base64 });
        toast({
          title: '头像已更新',
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed bottom-24 right-3 sm:bottom-28 sm:right-4 z-40 w-[calc(100vw-1.5rem)] max-w-sm sm:w-96">
      {isMinimized ? (
        <Button
          onClick={() => setIsMinimized(false)}
          size="lg"
          className="rounded-full h-12 w-12 sm:h-14 sm:w-14 shadow-elegant bg-gradient-to-br from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 ml-auto block"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      ) : (
        <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card/95 to-accent/5 backdrop-blur-sm border-accent/20 shadow-elegant animate-fade-in">
          {/* 装饰性背景 */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            {/* 头部 */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                <h3 className="text-sm sm:text-base font-bold text-foreground">聊天室</h3>
              </div>
              <div className="flex gap-1">
                <Button
                  onClick={() => setIsMinimized(true)}
                  size="sm"
                  variant="ghost"
                  className="rounded-full h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-accent/10"
                >
                  <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>

            {/* 用户资料区 */}
            <div className="p-3 border-b border-border/50 bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-primary/20">
                    <AvatarImage src={profile.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary/10">
                      <User className="w-5 h-5 sm:w-6 sm:h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="sm"
                    variant="ghost"
                    className="absolute -bottom-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 p-0 rounded-full bg-card border border-border/50 hover:bg-accent/10"
                  >
                    <Upload className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
                {isEditingProfile ? (
                  <div className="flex-1 flex gap-2">
                    <Input
                      value={editNickname}
                      onChange={(e) => setEditNickname(e.target.value)}
                      placeholder="输入昵称"
                      className="h-8 text-xs sm:text-sm"
                      onKeyDown={(e) => e.key === 'Enter' && updateNickname()}
                    />
                    <Button onClick={updateNickname} size="sm" className="h-8 px-2 sm:px-3 text-xs">
                      保存
                    </Button>
                  </div>
                ) : (
                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-semibold text-foreground">{profile.nickname}</p>
                    <Button
                      onClick={() => setIsEditingProfile(true)}
                      size="sm"
                      variant="ghost"
                      className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                    >
                      修改昵称
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* 消息列表 */}
            <ScrollArea className="h-64 sm:h-80 p-3 sm:p-4">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${msg.user_id === userId ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 border border-border/30">
                      <AvatarImage src={msg.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary/10 text-xs">
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex-1 ${msg.user_id === userId ? 'text-right' : ''}`}>
                      <p className="text-xs text-muted-foreground mb-1">{msg.nickname}</p>
                      <div
                        className={`inline-block max-w-[85%] rounded-lg px-3 py-2 text-xs sm:text-sm ${
                          msg.user_id === userId
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* 输入区 */}
            <div className="p-3 sm:p-4 border-t border-border/50">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="输入消息..."
                  className="text-xs sm:text-sm h-9 sm:h-10"
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button
                  onClick={sendMessage}
                  size="sm"
                  className="h-9 w-9 sm:h-10 sm:w-10 p-0 flex-shrink-0"
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};