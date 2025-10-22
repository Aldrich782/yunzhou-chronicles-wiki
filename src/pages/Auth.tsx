import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "请填写完整信息",
        description: "邮箱和密码不能为空",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "密码过短",
        description: "密码至少需要6个字符",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // 登录
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "登录成功！",
          description: "欢迎回来",
        });
        
        navigate('/');
      } else {
        // 注册
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              nickname: nickname || '访客'
            },
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (error) throw error;

        toast({
          title: "注册成功！",
          description: "欢迎加入",
        });

        navigate('/');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      
      let errorMessage = '操作失败，请稍后再试';
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = '邮箱或密码错误';
      } else if (error.message.includes('User already registered')) {
        errorMessage = '该邮箱已被注册';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = '请先确认邮箱';
      }
      
      toast({
        title: "错误",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">云韩宗门谱</h1>
          <p className="text-muted-foreground">
            {isLogin ? '登录以继续' : '创建新账号'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="nickname">昵称（可选）</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="输入你的昵称"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={loading}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              type="password"
              placeholder="至少6个字符"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLogin ? '登录' : '注册'}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setEmail('');
              setPassword('');
              setNickname('');
            }}
            className="text-sm text-primary hover:underline"
            disabled={loading}
          >
            {isLogin ? '还没有账号？立即注册' : '已有账号？返回登录'}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;