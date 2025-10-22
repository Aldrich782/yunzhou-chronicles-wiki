import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PasswordGateProps {
  onSuccess: () => void;
}

export const PasswordGate = ({ onSuccess }: PasswordGateProps) => {
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'mitianmen') {
      localStorage.setItem('site_access', 'granted');
      onSuccess();
      toast({
        title: "欢迎",
        description: "密钥验证成功，欢迎来到云州纪事"
      });
    } else {
      toast({
        title: "密钥错误",
        description: "请输入正确的密钥",
        variant: "destructive"
      });
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cloud-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M50,50 Q60,30 80,40 Q100,20 120,40 Q130,30 140,50 Q130,70 120,60 Q100,80 80,60 Q60,70 50,50 Z" fill="currentColor" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cloud-pattern)" className="text-primary"/>
        </svg>
      </div>

      <Card className="relative w-full max-w-md bg-card/95 backdrop-blur-sm border-primary/30 shadow-elegant">
        <div className="p-8">
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-calligraphy text-foreground mb-2">
              云州纪事
            </h1>
            <p className="text-sm text-muted-foreground">
              请输入密钥以访问
            </p>
          </div>

          {/* 密码输入表单 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="输入密钥..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-center text-lg tracking-widest bg-background/50 border-primary/30 focus:border-primary/50"
                autoFocus
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-soft"
              size="lg"
            >
              进入
            </Button>
          </form>

          {/* 装饰性文字 */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground/60 font-calligraphy">
              仙门秘境 · 唯有缘者可入
            </p>
          </div>
        </div>

        {/* 装饰性边角 */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-lg"></div>
      </Card>
    </div>
  );
};