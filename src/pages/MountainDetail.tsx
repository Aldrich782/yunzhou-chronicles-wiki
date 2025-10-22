import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mountain as MountainIcon, User } from 'lucide-react';
import { yunhanSects } from '@/data/sects';
import { CommentSection } from '@/components/CommentSection';

const MountainDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 从紫霄宗获取山峰信息
  const zixiaoSect = yunhanSects.find(s => s.id === 'zixiao');
  const mountain = zixiaoSect?.mountains?.find(m => m.id === id);

  if (!mountain) {
    return (
      <div className="min-h-screen flex items-center justify-center page-transition">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">山峰未找到</h2>
          <Button onClick={() => navigate('/sect/zixiao')}>返回紫霄宗</Button>
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
            <Link to="/sect/zixiao">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                返回紫霄宗
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-primary">{mountain.name}</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 山峰简介 */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MountainIcon className="w-6 h-6 text-primary" />
              简介
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {mountain.description}
            </p>
          </Card>

          {/* 重要人物 */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-primary" />
              重要人物
            </h2>
            
            {mountain.characters.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                暂无人物信息
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mountain.characters.map((character) => (
                  <Link key={character.id} to={`/character/${character.id}`}>
                    <Card className="group p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-soft hover:-translate-y-1 cursor-pointer">
                      {/* 头像占位 */}
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4 flex items-center justify-center">
                        <User className="w-12 h-12 text-primary/40" />
                      </div>
                      
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {character.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {character.title}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2 pt-2">
                          {character.description}
                        </p>
                      </div>

                      <div className="mt-4 text-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        查看详情 →
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </Card>

          {/* 评论区 */}
          <CommentSection />
        </div>
      </main>
    </div>
  );
};

export default MountainDetail;
