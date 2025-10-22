import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Map, Image, Scroll, BookMarked } from 'lucide-react';

const sections = [
  {
    id: 'geography',
    title: '地理志',
    description: '云汉戎州，两域风华',
    icon: Map,
    color: 'from-primary/20 to-accent/20',
    path: '/geography'
  },
  {
    id: 'illustrations',
    title: '立绘',
    description: '人物形象',
    icon: Image,
    color: 'from-accent/20 to-secondary/20',
    path: '/illustrations'
  },
  {
    id: 'history',
    title: '云州历史',
    description: '千年纪事',
    icon: Scroll,
    color: 'from-primary/20 to-secondary/20',
    path: '/history'
  },
  {
    id: 'bestiary',
    title: '志怪图鉴',
    description: '异兽妖魔',
    icon: BookMarked,
    color: 'from-secondary/20 to-accent/20',
    path: '/bestiary'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background page-transition">
      {/* 主要内容区 - 垂直居中 */}
      <main className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto w-full py-8 sm:py-12">
          {/* 顶部口号 */}
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-muted-foreground/60 text-xs sm:text-sm tracking-wider">
              时光倒转·命运重启
            </p>
          </div>

          {/* 主标题 */}
          <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent tracking-wide">
              云州纪事
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              仙侠世界的百科全书
            </p>
          </div>

          {/* 板块导航卡片 - 移动端优化 */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.id} to={section.path}>
                  <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card hover:-translate-y-1 cursor-pointer h-full">
                    {/* 背景渐变 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-6 space-y-2 sm:space-y-3 min-h-[120px] sm:min-h-[140px]">
                      {/* 图标 */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-accent transition-colors" />
                      </div>
                      
                      {/* 文字内容 */}
                      <div className="space-y-1 text-center">
                        <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed hidden sm:block">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
