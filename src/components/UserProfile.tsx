import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Upload, Save, LogOut } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [nickname, setNickname] = useState('访客');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [tempNickname, setTempNickname] = useState('');
  const [flowersBalance, setFlowersBalance] = useState(0);
  const [eggsBalance, setEggsBalance] = useState(0);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        loadProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      setUser(session.user);
      await loadProfile(session.user.id);
    }
  };

  const loadProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (data) {
      setNickname(data.nickname);
      setAvatarUrl(data.avatar_url);
      setTempNickname(data.nickname);
      setFlowersBalance(data.flowers_balance || 0);
      setEggsBalance(data.eggs_balance || 0);
    }

    await checkTodayCheckIn(userId);
  };

  const checkTodayCheckIn = async (userId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('check_ins')
      .select('*')
      .eq('user_id', userId)
      .eq('check_in_date', today)
      .single();
    
    setHasCheckedIn(!!data);
  };

  const updateProfile = async () => {
    if (!user || !tempNickname.trim()) return;

    const { error } = await supabase
      .from('profiles')
      .update({ nickname: tempNickname.trim() })
      .eq('user_id', user.id);

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
    if (!user) return;
    
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: base64 })
        .eq('user_id', user.id);

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

  const handleCheckIn = async () => {
    if (!user || hasCheckedIn || isCheckingIn) return;

    setIsCheckingIn(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { error: checkInError } = await supabase
        .from('check_ins')
        .insert([{ user_id: user.id, check_in_date: today }]);

      if (checkInError) throw checkInError;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          flowers_balance: flowersBalance + 10,
          eggs_balance: eggsBalance + 10
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setFlowersBalance(flowersBalance + 10);
      setEggsBalance(eggsBalance + 10);
      setHasCheckedIn(true);
      toast({
        title: "签到成功！",
        description: "获得 10 朵鲜花🌸和 10 个鸡蛋🥚",
      });
    } catch (error) {
      console.error('Error checking in:', error);
      toast({
        title: "签到失败",
        description: "请稍后再试",
        variant: "destructive",
      });
    } finally {
      setIsCheckingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "已登出" });
    navigate('/auth');
  };

  if (!user) {
    return (
      <Card className="relative overflow-hidden bg-card/95 backdrop-blur-sm border-primary/20 shadow-elegant w-full max-w-sm p-6">
        <p className="text-center text-muted-foreground mb-4">请先登录</p>
        <Button onClick={() => navigate('/auth')} className="w-full">
          前往登录
        </Button>
      </Card>
    );
  }

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

            {/* Balances */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="text-xl mb-1">🌸</div>
                <div className="text-xs text-muted-foreground">鲜花</div>
                <div className="text-base font-bold text-primary">{flowersBalance}</div>
              </div>
              <div className="text-center">
                <div className="text-xl mb-1">🥚</div>
                <div className="text-xs text-muted-foreground">鸡蛋</div>
                <div className="text-base font-bold text-primary">{eggsBalance}</div>
              </div>
            </div>

            {/* Check-in Button */}
            <Button
              onClick={handleCheckIn}
              disabled={hasCheckedIn || isCheckingIn}
              className="w-full"
              size="sm"
              variant={hasCheckedIn ? "outline" : "default"}
            >
              {hasCheckedIn ? '今日已签到 ✓' : '每日签到 (+10🌸 +10🥚)'}
            </Button>

            <Button
              onClick={updateProfile}
              className="w-full"
              size="sm"
            >
              <Save className="w-4 h-4 mr-2" />
              保存修改
            </Button>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full"
              size="sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              登出
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>修改后将在评论区和聊天室同步显示</p>
            <p className="text-amber-600 dark:text-amber-400">
              签到获得的鲜花和鸡蛋可在角色立绘页面使用
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};