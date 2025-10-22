import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Image as ImageIcon, Shirt, X } from 'lucide-react';
import { CommentSection } from '@/components/CommentSection';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { zixiaoUniforms, UniformIllustration } from '@/data/illustrations';

const Illustrations = () => {
  const [selectedUniform, setSelectedUniform] = useState<UniformIllustration | null>(null);

  const sectCategories = [
    {
      id: 'zixiao',
      name: '紫霄宗',
      description: '云汉大陆首屈一指的正道大宗',
      region: '云汉',
    },
    {
      id: 'jixiangzong',
      name: '禨祥宗',
      description: '神秘的古老宗门，传承深厚',
      region: '未知',
    },
    {
      id: 'wenqinxiangong',
      name: '问琴仙宫',
      description: '以琴道名震天下的仙宫',
      region: '未知',
    },
    {
      id: 'baiguai',
      name: '白骨哀',
      description: '曾经攻上紫霄的恐怖势力',
      region: '未知',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background page-transition">
      {/* 顶部导航 */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-6 py-2.5 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10">
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">返回首页</span>
                <span className="xs:hidden">返回</span>
              </Button>
            </Link>
            <h1 className="text-base sm:text-xl md:text-2xl font-calligraphy font-bold text-primary">立绘</h1>
            <div className="w-12 sm:w-16 md:w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-6 py-6 sm:py-12">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
          {/* 角色立绘区域 */}
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-2 sm:space-y-4">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                <ImageIcon className="w-5 h-5 sm:w-8 sm:h-8 text-primary" />
                <h2 className="text-xl sm:text-3xl font-calligraphy font-bold">角色立绘</h2>
              </div>
              <p className="text-xs sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed font-serif">
                按门派查看云州世界的重要角色立绘
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
              {sectCategories.map((sect) => (
                <Link key={sect.id} to={`/illustrations/sect/${sect.id}`}>
                  <Card className="group h-full overflow-hidden bg-card/40 backdrop-blur-md border-border/50 active:border-primary/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card active:scale-95 cursor-pointer">
                    <div className="p-4 sm:p-8 space-y-2.5 sm:space-y-4">
                      {/* 门派图标 */}
                      <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto">
                        <ImageIcon className="w-5 h-5 sm:w-8 sm:h-8 text-primary" />
                      </div>

                      {/* 门派名称 */}
                      <div className="text-center space-y-1 sm:space-y-2">
                        <h3 className="text-sm sm:text-2xl font-calligraphy font-bold text-foreground group-hover:text-primary group-active:text-primary transition-colors leading-tight">
                          {sect.name}
                        </h3>
                        <div className="h-0.5 sm:h-1 w-8 sm:w-12 bg-gradient-primary rounded-full mx-auto" />
                      </div>

                      {/* 门派描述 - 手机端隐藏 */}
                      <p className="hidden sm:block text-sm text-muted-foreground text-center leading-relaxed font-serif">
                        {sect.description}
                      </p>

                      {/* 地区标签 */}
                      <div className="pt-2 sm:pt-3 border-t border-border/50 text-center">
                        <span className="text-[10px] sm:text-sm text-muted-foreground font-serif">
                          {sect.region}大陆
                        </span>
                      </div>

                      {/* 查看详情 - 桌面端显示 */}
                      <div className="hidden sm:flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                        <span className="text-sm font-medium font-serif">查看立绘</span>
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* 分隔线 */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* 门派校服立绘区域 */}
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-2 sm:space-y-4">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                <Shirt className="w-5 h-5 sm:w-8 sm:h-8 text-primary" />
                <h2 className="text-xl sm:text-3xl font-calligraphy font-bold">门派校服</h2>
              </div>
              <p className="text-xs sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed font-serif">
                各门派弟子服饰展示（建设中）
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {zixiaoUniforms.map((uniform) => (
                <Card 
                  key={uniform.id}
                  onClick={() => setSelectedUniform(uniform)}
                  className="group h-full overflow-hidden bg-gradient-to-br from-purple-500/10 to-amber-500/10 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card active:scale-95 cursor-pointer"
                >
                  <div className="p-4 sm:p-6 flex items-center justify-center h-full min-h-[100px] sm:min-h-[120px]">
                    <div className="text-center space-y-1 sm:space-y-2">
                      <h3 className="text-sm sm:text-lg font-calligraphy font-bold text-foreground group-hover:text-primary group-active:text-primary transition-colors">
                        {uniform.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground font-serif">校服</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 评论区 */}
          <CommentSection pageType="illustrations" pageId="main" />
        </div>
      </main>

      {/* 校服立绘弹窗 */}
      <Dialog open={!!selectedUniform} onOpenChange={() => setSelectedUniform(null)}>
        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 bg-black/95 border-border/50">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 rounded-full bg-black/50 hover:bg-black/70 text-white z-10"
              onClick={() => setSelectedUniform(null)}
            >
              <X className="w-5 h-5" />
            </Button>
            
            {selectedUniform && (
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <img
                  src={selectedUniform.image}
                  alt={selectedUniform.name}
                  className="max-w-full max-h-[calc(100%-60px)] object-contain"
                />
                <h3 className="text-xl sm:text-2xl font-calligraphy font-bold text-white mt-4">
                  {selectedUniform.name} 校服
                </h3>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Illustrations;
