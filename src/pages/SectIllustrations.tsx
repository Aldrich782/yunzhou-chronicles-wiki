import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Flower, Egg } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { CommentSection } from '@/components/CommentSection';
import { zixiaoIllustrations, jixiangzongIllustrations, wenqinxiangongIllustrations, baiguaiIllustrations } from '@/data/illustrations';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Illustration {
  id: string;
  name: string;
  sect: string;
  title?: string;
  image?: string;
  characterId?: string;
}

const SectIllustrations = () => {
  const { sectId } = useParams<{ sectId: string }>();
  const [selectedIllustration, setSelectedIllustration] = useState<Illustration | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [voteCounts, setVoteCounts] = useState<Record<string, { flowers: number; eggs: number }>>({});
  const [userBalances, setUserBalances] = useState({ flowers: 0, eggs: 0 });
  const { toast } = useToast();

  const sectData: Record<string, { name: string; illustrations: Illustration[] }> = {
    zixiao: { name: '紫霄宗', illustrations: zixiaoIllustrations },
    jixiangzong: { name: '禨祥宗', illustrations: jixiangzongIllustrations },
    wenqinxiangong: { name: '问琴仙宫', illustrations: wenqinxiangongIllustrations },
    baiguai: { name: '白骨哀', illustrations: baiguaiIllustrations },
  };

  useEffect(() => {
    checkUser();

    const fetchVoteCounts = async () => {
      const illustrations = sectData[sectId]?.illustrations || [];
      const counts: Record<string, { flowers: number; eggs: number }> = {};

      for (const ill of illustrations) {
        const { data: flowerVotes } = await supabase
          .from('character_votes')
          .select('*')
          .eq('character_id', ill.id)
          .eq('vote_type', 'flower');

        const { data: eggVotes } = await supabase
          .from('character_votes')
          .select('*')
          .eq('character_id', ill.id)
          .eq('vote_type', 'egg');

        counts[ill.id] = {
          flowers: flowerVotes?.length || 0,
          eggs: eggVotes?.length || 0,
        };
      }

      setVoteCounts(counts);
    };

    fetchVoteCounts();
  }, [sectId]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return;
    }

    setUserId(session.user.id);
    await fetchUserBalances(session.user.id);
  };

  const fetchUserBalances = async (uid: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('flowers_balance, eggs_balance')
      .eq('user_id', uid)
      .single();
    
    if (data) {
      setUserBalances({ flowers: data.flowers_balance || 0, eggs: data.eggs_balance || 0 });
    }
  };

  const handleVote = async (characterId: string, voteType: 'flower' | 'egg') => {
    if (!userId) {
      toast({ title: "请先登录", description: "登录后才能投票", variant: "destructive" });
      return;
    }
    
    if (voteType === 'flower' && userBalances.flowers <= 0) {
      toast({ title: "鲜花不足", description: "请先签到获取鲜花", variant: "destructive" });
      return;
    }
    if (voteType === 'egg' && userBalances.eggs <= 0) {
      toast({ title: "鸡蛋不足", description: "请先签到获取鸡蛋", variant: "destructive" });
      return;
    }

    try {
      // Insert vote
      const { error: voteError } = await supabase
        .from('character_votes')
        .insert([{ character_id: characterId, user_id: userId, vote_type: voteType }]);

      if (voteError) throw voteError;

      // Update user balance
      const newBalance = voteType === 'flower' 
        ? { flowers_balance: userBalances.flowers - 1 }
        : { eggs_balance: userBalances.eggs - 1 };

      const { error: updateError } = await supabase
        .from('profiles')
        .update(newBalance)
        .eq('user_id', userId);

      if (updateError) throw updateError;

      // Update local state
      setUserBalances(prev => ({
        flowers: voteType === 'flower' ? prev.flowers - 1 : prev.flowers,
        eggs: voteType === 'egg' ? prev.eggs - 1 : prev.eggs,
      }));

      setVoteCounts(prev => ({
        ...prev,
        [characterId]: {
          flowers: voteType === 'flower' ? (prev[characterId]?.flowers || 0) + 1 : (prev[characterId]?.flowers || 0),
          eggs: voteType === 'egg' ? (prev[characterId]?.eggs || 0) + 1 : (prev[characterId]?.eggs || 0),
        }
      }));

      toast({
        title: voteType === 'flower' ? "献花成功！🌸" : "投蛋成功！🥚",
        description: `已为 ${currentSect.illustrations.find(i => i.id === characterId)?.name} ${voteType === 'flower' ? '献花' : '投蛋'}`,
      });
    } catch (error) {
      console.error('Error voting:', error);
      toast({ title: "操作失败", description: "请稍后再试", variant: "destructive" });
    }
  };

  const currentSect = sectData[sectId as string];

  if (!currentSect) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">门派未找到</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background page-transition">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/illustrations">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                返回立绘
              </Button>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold">{currentSect.name}</h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1">
                <Flower className="w-4 h-4 text-pink-400" />
                {userBalances.flowers}
              </span>
              <span className="flex items-center gap-1">
                <Egg className="w-4 h-4 text-amber-400" />
                {userBalances.eggs}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentSect.illustrations.map((illustration) => (
                <Card
                  key={illustration.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div 
                    className="aspect-[3/4] relative bg-gradient-to-br from-primary/5 to-accent/5 cursor-pointer"
                    onClick={() => setSelectedIllustration(illustration)}
                  >
                    {illustration.image ? (
                      <img
                        src={illustration.image}
                        alt={illustration.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        暂无图片
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold mb-1">{illustration.name}</h3>
                      {illustration.title && (
                        <p className="text-sm text-muted-foreground">{illustration.title}</p>
                      )}
                    </div>
                    
                    {/* Vote counts */}
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Flower className="w-4 h-4 text-pink-400" />
                        <span className="text-pink-400 font-medium">{voteCounts[illustration.id]?.flowers || 0}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Egg className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 font-medium">{voteCounts[illustration.id]?.eggs || 0}</span>
                      </span>
                    </div>

                    {/* Vote buttons */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 hover:bg-pink-500/10 hover:border-pink-500 text-xs px-2 py-1 h-8"
                        onClick={() => handleVote(illustration.id, 'flower')}
                      >
                        <Flower className="w-3 h-3 mr-1" />
                        献花
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 hover:bg-amber-500/10 hover:border-amber-500 text-xs px-2 py-1 h-8"
                        onClick={() => handleVote(illustration.id, 'egg')}
                      >
                        <Egg className="w-3 h-3 mr-1" />
                        投蛋
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>

          {/* Modal */}
          <Dialog open={!!selectedIllustration} onOpenChange={(open) => !open && setSelectedIllustration(null)}>
            <DialogContent className="max-w-4xl">
              {selectedIllustration && (
                <div className="space-y-4">
                  {selectedIllustration.image && (
                    <img
                      src={selectedIllustration.image}
                      alt={selectedIllustration.name}
                      className="w-full h-auto"
                    />
                  )}
                  <div>
                    <h3 className="text-2xl font-bold">{selectedIllustration.name}</h3>
                    {selectedIllustration.title && (
                      <p className="text-muted-foreground">{selectedIllustration.title}</p>
                    )}
                  </div>
                  {selectedIllustration.characterId && (
                    <Link to={`/character/${selectedIllustration.characterId}`}>
                      <Button>查看角色详情 →</Button>
                    </Link>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>

          <CommentSection pageType="illustrations" pageId={sectId || 'unknown'} />
        </div>
      </main>
    </div>
  );
};

export default SectIllustrations;
