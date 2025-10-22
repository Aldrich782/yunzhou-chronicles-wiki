import { Link, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Image as ImageIcon, X } from 'lucide-react';
import { CommentSection } from '@/components/CommentSection';
import { zixiaoIllustrations, jixiangzongIllustrations, baiguaiIllustrations, wenqinxiangongIllustrations } from '@/data/illustrations';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { useState } from 'react';

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

  const sectData = {
    zixiao: {
      name: '紫霄宗',
      illustrations: zixiaoIllustrations,
    },
    jixiangzong: {
      name: '禨祥宗',
      illustrations: jixiangzongIllustrations,
    },
    baiguai: {
      name: '白骨哀',
      illustrations: baiguaiIllustrations,
    },
    wenqinxiangong: {
      name: '问琴仙宫',
      illustrations: wenqinxiangongIllustrations,
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {currentSect.illustrations.map((illustration) => (
              <div key={illustration.id}>
                <Card 
                  className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card cursor-pointer"
                  onClick={() => setSelectedIllustration(illustration)}
                >
                  <div className="h-32 sm:h-40 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-end justify-center overflow-hidden relative">
                    {illustration.image ? (
                      <img
                        src={illustration.image}
                        alt={illustration.name}
                        className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-center space-y-2 p-4 absolute inset-0 flex flex-col items-center justify-center">
                        <ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 text-primary/40 mx-auto" />
                        <p className="text-xs sm:text-sm text-muted-foreground">立绘占位</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 sm:p-4 space-y-1">
                    <h3 className="text-sm sm:text-base font-semibold group-hover:text-primary transition-colors line-clamp-1">
                      {illustration.name}
                    </h3>
                    {illustration.title && (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {illustration.title}
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* 立绘弹窗 */}
          <Dialog open={!!selectedIllustration} onOpenChange={(open) => !open && setSelectedIllustration(null)}>
            <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 bg-black/95 border-primary/20">
              {selectedIllustration && (
                <div className="relative w-full h-full flex flex-col">
                  {/* 关闭按钮 */}
                  <DialogClose className="absolute top-4 left-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors">
                    <X className="w-5 h-5" />
                  </DialogClose>

                  {/* 图片区域 */}
                  <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
                    {selectedIllustration.image ? (
                      <img
                        src={selectedIllustration.image}
                        alt={selectedIllustration.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-center space-y-4">
                        <ImageIcon className="w-16 h-16 text-primary/40 mx-auto" />
                        <p className="text-muted-foreground">暂无立绘</p>
                      </div>
                    )}
                  </div>

                  {/* 信息栏 */}
                  <div className="bg-gradient-to-t from-black via-black/90 to-transparent p-4 sm:p-6 space-y-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {selectedIllustration.name}
                      </h3>
                      {selectedIllustration.title && (
                        <p className="text-sm sm:text-base text-primary mt-1">
                          {selectedIllustration.title}
                        </p>
                      )}
                    </div>
                    
                    {selectedIllustration.characterId && (
                      <Link to={`/character/${selectedIllustration.characterId}`}>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-primary/50 hover:border-primary hover:bg-primary/10"
                        >
                          查看角色详情 →
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* 评论区 */}
          <CommentSection pageType="illustrations" pageId={sectId || 'unknown'} />
        </div>
      </main>
    </div>
  );
};

export default SectIllustrations;
