import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, MapPin } from 'lucide-react';
import { yunhanSects, rongzhouSects } from '@/data/sects';
import { CommentSection } from '@/components/CommentSection';

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 在所有门派中查找人物
  let character = null;
  let sect = null;
  
  for (const s of [...yunhanSects, ...rongzhouSects]) {
    if (s.mountains) {
      for (const mountain of s.mountains) {
        const found = mountain.characters.find(c => c.id === id);
        if (found) {
          character = found;
          sect = s;
          break;
        }
      }
    }
    if (character) break;
  }

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center page-transition">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">人物未找到</h2>
          <Button onClick={() => navigate('/')}>返回首页</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background page-transition">
      {/* 顶部导航 */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
              返回
            </Button>
            <h1 className="text-2xl font-bold text-primary">{character.name}</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 人物头像和基本信息 */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* 头像 */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-soft">
                  {character.avatar ? (
                    <img 
                      src={character.avatar} 
                      alt={character.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <User className="w-24 h-24 text-primary/40" />
                  )}
                </div>
                <p className="text-center text-sm text-muted-foreground mt-3">
                  头像占位
                </p>
              </div>

              {/* 基本信息 */}
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{character.name}</h2>
                  <p className="text-xl text-primary">{character.title}</p>
                  {character.status && (
                    <p className="text-sm text-muted-foreground mt-2">
                      状态：<span className={character.status.includes('已故') ? 'text-destructive' : 'text-accent'}>{character.status}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>所属：</span>
                    <span className="text-foreground font-medium">{character.sect}</span>
                  </div>
                  {character.specialty && (
                    <div className="p-3 rounded-lg bg-primary/10">
                      <p className="text-sm">
                        <span className="font-semibold text-primary">专长：</span>
                        <span className="text-foreground">{character.specialty}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* 人物介绍 */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <h2 className="text-2xl font-bold mb-6">人物介绍</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {character.description}
            </p>
          </Card>

          {/* 评论区 */}
          <CommentSection />
        </div>
      </main>
    </div>
  );
};

export default CharacterDetail;
