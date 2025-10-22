import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Upload, Save } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const UserProfile = () => {
  const [userId] = useState(() => {
    let id = localStorage.getItem('chat_user_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('chat_user_id', id);
    }
    return id;
  });
  const [nickname, setNickname] = useState('访客');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [tempNickname, setTempNickname] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (data) {
        setNickname(data.nickname);
        setAvatarUrl(data.avatar_url);
        setTempNickname(data.nickname);
      } else {
        await supabase
          .from('profiles')
          .insert({ user_id: userId, nickname: '访客' });
        setTempNickname('访客');
      }
    };
    loadProfile();
  }, [userId]);

  const updateProfile = async () => {
    if (!tempNickname.trim()) return;

    const { error } = await supabase
      .from('profiles')
      .update({ nickname: tempNickname.trim() })
      .eq('user_id', userId);

    if (error) {
      toast({
        title: "保存失败",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setNickname(tempNickname.trim());
      toast({
        title: "资料已保存",
        description: "您的个人信息已更新"
      });
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: base64 })
        .eq('user_id', userId);

      if (error) {
        toast({
          title: "上传失败",
          description: error.message,
          variant: "destructive"
        });
      } else {
        setAvatarUrl(base64);
        toast({
          title: "头像已更新"
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="relative overflow-hidden bg-card/95 backdrop-blur-sm border-primary/20 shadow-elegant w-full max-w-sm">
      <div className="relative p-4">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">个人主页</h3>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatarUrl || undefined} />
              <AvatarFallback>
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="outline"
              className="absolute bottom-0 right-0 h-8 w-8 p-0 rounded-full bg-background border-primary/30 hover:bg-primary/10"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>

          <div className="w-full space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">昵称</label>
              <Input
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                placeholder="输入昵称"
                className="text-sm"
              />
            </div>

            <Button
              onClick={updateProfile}
              className="w-full"
              size="sm"
            >
              <Save className="w-4 h-4 mr-2" />
              保存修改
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            <p>您的ID: {userId.slice(0, 8)}...</p>
            <p className="mt-1">修改后将在评论区和聊天室同步显示</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
