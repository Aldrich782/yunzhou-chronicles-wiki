import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { BookOpen, Map, Image, Scroll, BookMarked } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* 顶部标题区 */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            云州纪事
          </h1>
          <p className="text-center text-muted-foreground mt-1.5 text-sm">
            仙侠世界的百科全书
          </p>
        </div>
      </header>

      {/* 主要内容区 */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* 欢迎文字 */}
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              探索云州世界
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
              时光倒转的仙侠世界，新旧天道之争撕裂苍穹
            </p>
          </div>

          {/* 板块导航卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.id} to={section.path}>
                  <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card hover:-translate-y-1 cursor-pointer h-full">
                    {/* 背景渐变 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative p-6 space-y-3">
                      {/* 图标 */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                      </div>
                      
                      {/* 文字内容 */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {section.description}
                        </p>
                      </div>

                      {/* 箭头指示 */}
                      <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-1">
                        <span className="text-xs font-medium">查看详情</span>
                        <svg
                          className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform"
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
              );
            })}
          </div>

          {/* 底部装饰 */}
          <div className="mt-16 text-center text-muted-foreground/50 text-xs">
            <p>「时光倒转，命运重启」</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
