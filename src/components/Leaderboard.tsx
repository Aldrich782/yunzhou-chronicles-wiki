import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Flower, Egg, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { 
  zixiaoIllustrations, 
  jixiangzongIllustrations, 
  wenqinxiangongIllustrations, 
  baiguaiIllustrations 
} from '@/data/illustrations';

interface CharacterRank {
  id: string;
  name: string;
  image?: string;
  votes: number;
}

export const Leaderboard = () => {
  const [flowerRanks, setFlowerRanks] = useState<CharacterRank[]>([]);
  const [eggRanks, setEggRanks] = useState<CharacterRank[]>([]);

  // Combine all illustrations
  const allCharacters = [
    ...zixiaoIllustrations,
    ...jixiangzongIllustrations,
    ...wenqinxiangongIllustrations,
    ...baiguaiIllustrations
  ];

  const getCharacterInfo = (id: string) => {
    const character = allCharacters.find(c => c.id === id);
    return character || { id, name: id, image: undefined };
  };

  useEffect(() => {
    loadRankings();

    // 订阅实时更新
    const channel = supabase
      .channel('character_votes_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'character_votes'
        },
        () => {
          loadRankings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadRankings = async () => {
    // Load flower rankings
    const { data: flowerVotes } = await supabase
      .from('character_votes')
      .select('character_id')
      .eq('vote_type', 'flower');

    // Load egg rankings
    const { data: eggVotes } = await supabase
      .from('character_votes')
      .select('character_id')
      .eq('vote_type', 'egg');

    // Count votes
    const flowerCounts: Record<string, number> = {};
    const eggCounts: Record<string, number> = {};

    flowerVotes?.forEach(vote => {
      flowerCounts[vote.character_id] = (flowerCounts[vote.character_id] || 0) + 1;
    });

    eggVotes?.forEach(vote => {
      eggCounts[vote.character_id] = (eggCounts[vote.character_id] || 0) + 1;
    });

    // Convert to arrays with character info and sort
    const flowerRankings = Object.entries(flowerCounts)
      .map(([id, votes]) => {
        const charInfo = getCharacterInfo(id);
        return { id, name: charInfo.name, image: charInfo.image, votes };
      })
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 10);

    const eggRankings = Object.entries(eggCounts)
      .map(([id, votes]) => {
        const charInfo = getCharacterInfo(id);
        return { id, name: charInfo.name, image: charInfo.image, votes };
      })
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 10);

    setFlowerRanks(flowerRankings);
    setEggRanks(eggRankings);
  };

  const getRankColor = (rank: number) => {
    if (rank === 0) return 'text-yellow-500';
    if (rank === 1) return 'text-gray-400';
    if (rank === 2) return 'text-amber-600';
    return 'text-muted-foreground';
  };

  const getRankIcon = (rank: number) => {
    if (rank < 3) return <Trophy className={`w-5 h-5 ${getRankColor(rank)}`} />;
    return <span className="text-sm font-bold text-muted-foreground">#{rank + 1}</span>;
  };

  const renderRankList = (ranks: CharacterRank[], icon: 'flower' | 'egg') => (
    <div className="space-y-2">
      {ranks.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">暂无排名数据</p>
      ) : (
        ranks.map((character, index) => (
          <Card key={character.id} className="p-3 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 flex justify-center">
                {getRankIcon(index)}
              </div>
              
              <Avatar className="w-10 h-10">
                <AvatarImage src={character.image} />
                <AvatarFallback>
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{character.name}</p>
              </div>

              <div className="flex items-center gap-1">
                {icon === 'flower' ? (
                  <Flower className="w-4 h-4 text-pink-500" />
                ) : (
                  <Egg className="w-4 h-4 text-amber-500" />
                )}
                <span className="font-bold text-lg">{character.votes}</span>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );

  return (
    <Card className="relative overflow-hidden bg-card/95 backdrop-blur-sm border-primary/20 shadow-elegant w-full max-w-sm">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold">角色排行榜</h3>
        </div>

        <Tabs defaultValue="flowers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="flowers" className="gap-2">
              <Flower className="w-4 h-4" />
              鲜花榜
            </TabsTrigger>
            <TabsTrigger value="eggs" className="gap-2">
              <Egg className="w-4 h-4" />
              鸡蛋榜
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="flowers" className="mt-4">
            {renderRankList(flowerRanks, 'flower')}
          </TabsContent>
          
          <TabsContent value="eggs" className="mt-4">
            {renderRankList(eggRanks, 'egg')}
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};