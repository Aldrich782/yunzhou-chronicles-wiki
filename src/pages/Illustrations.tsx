import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Image as ImageIcon, Shirt } from 'lucide-react';
import { CommentSection } from '@/components/CommentSection';

const Illustrations = () => {
  const sectCategories = [
    {
      id: 'zixiao',
      name: '紫霄宗',
      description: '云汉大陆首屈一指的正道大宗',
      region: '云汉',
    },
    {
      id: 'jihuozong',
      name: '集火宗',
      description: '荣州大陆的火修圣地',
      region: '荣州',
    },
    {
      id: 'baishaling',
      name: '白沙岭',
      description: '荣州大陆的邪修势力',
      region: '荣州',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background page-transition">
      {/* 顶部导航 */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" className="gap-2 text-sm sm:text-base">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">返回首页</span>
                <span className="sm:hidden">返回</span>
              </Button>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-primary">立绘</h1>
            <div className="w-16 sm:w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* 角色立绘区域 */}
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-bold">角色立绘</h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                按门派查看云州世界的重要角色立绘
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {sectCategories.map((sect) => (
                <Link key={sect.id} to={`/illustrations/sect/${sect.id}`}>
                  <Card className="group h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card hover:-translate-y-1 cursor-pointer">
                    <div className="p-6 sm:p-8 space-y-4">
                      {/* 门派图标 */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto">
                        <ImageIcon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                      </div>

                      {/* 门派名称 */}
                      <div className="text-center space-y-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {sect.name}
                        </h3>
                        <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
                      </div>

                      {/* 门派描述 */}
                      <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
                        {sect.description}
                      </p>

                      {/* 地区标签 */}
                      <div className="pt-3 border-t border-border/50 text-center">
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {sect.region}大陆
                        </span>
                      </div>

                      {/* 查看详情 */}
                      <div className="flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                        <span className="text-xs sm:text-sm font-medium">查看立绘</span>
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
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shirt className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-bold">门派校服</h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                各门派弟子服饰展示（建设中）
              </p>
            </div>

            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                <Shirt className="w-10 h-10 text-primary/40" />
              </div>
              <p className="text-muted-foreground">敬请期待...</p>
            </div>
          </div>

          {/* 评论区 */}
          <CommentSection pageType="illustrations" pageId="main" />
        </div>
      </main>
    </div>
  );
};

export default Illustrations;
