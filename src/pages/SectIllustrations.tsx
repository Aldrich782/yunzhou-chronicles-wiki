import { Link, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { CommentSection } from '@/components/CommentSection';
import { zixiaoIllustrations, jihuozongIllustrations, baishalingIllustrations } from '@/data/illustrations';

const SectIllustrations = () => {
  const { sectId } = useParams<{ sectId: string }>();

  const sectData = {
    zixiao: {
      name: '紫霄宗',
      illustrations: zixiaoIllustrations,
    },
    jihuozong: {
      name: '集火宗',
      illustrations: jihuozongIllustrations,
    },
    baishaling: {
      name: '白沙岭',
      illustrations: baishalingIllustrations,
    },
  };

  const currentSect = sectData[sectId as keyof typeof sectData];

  if (!currentSect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">门派未找到</h2>
          <Link to="/illustrations">
            <Button variant="ghost">返回立绘</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background page-transition">
      {/* 顶部导航 */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/illustrations">
              <Button variant="ghost" className="gap-2 text-sm sm:text-base">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">返回立绘</span>
                <span className="sm:hidden">返回</span>
              </Button>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-primary">{currentSect.name}</h1>
            <div className="w-16 sm:w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 介绍区域 */}
          <div className="text-center space-y-4 mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold">{currentSect.name}角色立绘</h2>
            </div>
          </div>

          {/* 立绘网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {currentSect.illustrations.map((illustration) => (
              <Link
                key={illustration.id}
                to={illustration.characterId ? `/character/${illustration.characterId}` : '#'}
                className={!illustration.characterId ? 'pointer-events-none' : ''}
              >
                <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card cursor-pointer">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                    {illustration.image ? (
                      <img
                        src={illustration.image}
                        alt={illustration.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-center space-y-4 p-4">
                        <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 text-primary/40 mx-auto" />
                        <p className="text-sm sm:text-base text-muted-foreground">立绘占位</p>
                        <p className="text-xs sm:text-sm text-muted-foreground/60">{illustration.name}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 sm:p-6 space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors">
                      {illustration.name}
                    </h3>
                    {illustration.title && (
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {illustration.title}
                      </p>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* 评论区 */}
          <CommentSection pageType="illustrations" pageId={sectId || 'unknown'} />
        </div>
      </main>
    </div>
  );
};

export default SectIllustrations;
