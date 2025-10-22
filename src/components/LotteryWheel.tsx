import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const LotteryWheel = () => {
  const [canDraw, setCanDraw] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [reward, setReward] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkDrawAvailability();
  }, []);

  const checkDrawAvailability = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('lottery_draws')
        .select('*')
        .eq('user_id', user.id)
        .eq('draw_date', today)
        .maybeSingle();

      setCanDraw(!data);
    } catch (error) {
      console.error('Error checking lottery availability:', error);
    }
  };

  const handleDraw = async () => {
    setIsDrawing(true);
    setReward(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "请先登录",
          description: "您需要登录才能参与抽奖",
          variant: "destructive",
        });
        return;
      }

      // Simulate drawing animation
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate random reward between 1-100
      const rewardAmount = Math.floor(Math.random() * 100) + 1;
      setReward(rewardAmount);

      // Record the draw
      const { error: drawError } = await supabase
        .from('lottery_draws')
        .insert({
          user_id: user.id,
          reward_amount: rewardAmount,
        });

      if (drawError) throw drawError;

      // Update user's spirit stones
      const { data: profile } = await supabase
        .from('profiles')
        .select('spirit_stones')
        .eq('user_id', user.id)
        .single();

      await supabase
        .from('profiles')
        .update({ spirit_stones: (profile?.spirit_stones || 0) + rewardAmount })
        .eq('user_id', user.id);

      toast({
        title: "🎉 恭喜中奖！",
        description: `获得 ${rewardAmount} 灵石`,
      });

      setCanDraw(false);
    } catch (error) {
      console.error('Error drawing lottery:', error);
      toast({
        title: "抽奖失败",
        description: "请稍后再试",
        variant: "destructive",
      });
    } finally {
      setIsDrawing(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-ink">
          <Sparkles className="w-5 h-5 text-cinnabar" />
          每日抽奖
        </CardTitle>
        <CardDescription>
          每天可抽取一次，获得1-100灵石
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-square max-w-[200px] mx-auto">
          <div 
            className={`w-full h-full rounded-full bg-gradient-to-br from-cinnabar/20 to-primary/20 flex items-center justify-center border-4 border-cinnabar/30 transition-transform duration-1000 ${
              isDrawing ? 'animate-spin' : ''
            }`}
          >
            <div className="text-center">
              {reward !== null ? (
                <div className="animate-in fade-in zoom-in duration-500">
                  <div className="text-4xl font-calligraphy font-bold text-cinnabar">
                    {reward}
                  </div>
                  <div className="text-sm text-muted-foreground">灵石</div>
                </div>
              ) : (
                <Sparkles className="w-12 h-12 text-cinnabar" />
              )}
            </div>
          </div>
        </div>

        <Button
          onClick={handleDraw}
          disabled={!canDraw || isDrawing}
          className="w-full bg-gradient-to-r from-cinnabar to-cinnabar/80 hover:from-cinnabar/90 hover:to-cinnabar/70"
        >
          {isDrawing ? '抽奖中...' : canDraw ? '立即抽奖' : '今日已抽奖'}
        </Button>

        {!canDraw && !isDrawing && (
          <p className="text-sm text-center text-muted-foreground">
            明天再来吧！
          </p>
        )}
      </CardContent>
    </Card>
  );
};
