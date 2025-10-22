import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mountain, Swords } from 'lucide-react';

const continents = [
  {
    id: 'yunhan',
    name: '云汉',
    title: '云汉大陆',
    description: '位于世界左侧，灵气充沛，名山大川遍布。这里是正道门派的核心区域，以紫霄宗为首的正道联盟共同维护着修仙界的秩序。',
    icon: Mountain,
    color: 'from-primary/10 to-accent/10',
    path: '/yunhan',
    features: ['紫霄宗', '山海轩', '半月楼', '水云洞天', '天音寺']
  },
  {
    id: 'rongzhou',
    name: '戎州',
    title: '戎州大陆',
    description: '位于世界右侧，地势复杂险峻。既有适合剑修的峻峭山脉，也有魔气滋生的昆仑死地。这里是剑道与魔修的交锋之地，充满了未知与危险。',
    icon: Swords,
    color: 'from-secondary/10 to-primary/10',
    path: '/rongzhou',
    features: ['长生门', '问琴仙宫', '白骨哀', '禨祥宗']
  }
];

const Geography = () => {
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
            <h1 className="text-base sm:text-xl font-calligraphy font-bold text-primary">地理志</h1>
            <div className="w-12 sm:w-20" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-6 py-6 sm:py-12">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* 介绍区域 */}
          <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-calligraphy font-bold">两域风华</h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed font-serif">
              云州世界由云汉、戎州两大大陆组成，各有千秋，各展风华
            </p>
          </div>

          {/* 大陆展示 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {continents.map((continent) => {
              const Icon = continent.icon;
              return (
                <Link key={continent.id} to={continent.path}>
                  <Card className="group h-full overflow-hidden bg-card/40 backdrop-blur-md border-border/50 active:border-primary/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card active:scale-95 cursor-pointer">
                    {/* 顶部装饰 */}
                    <div className={`h-20 sm:h-32 bg-gradient-to-br ${continent.color} flex items-center justify-center relative overflow-hidden`}>
                      <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-primary/20 absolute" />
                      <Icon className="w-8 h-8 sm:w-12 sm:h-12 text-primary group-hover:scale-110 group-active:scale-105 transition-transform duration-500 relative z-10" />
                    </div>

                    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      {/* 标题 */}
                      <div className="space-y-1.5 sm:space-y-2">
                        <h3 className="text-lg sm:text-2xl font-calligraphy font-bold text-foreground group-hover:text-primary group-active:text-primary transition-colors">
                          {continent.title}
                        </h3>
                        <div className="h-0.5 sm:h-1 w-8 sm:w-12 bg-gradient-primary rounded-full" />
                      </div>

                      {/* 描述 */}
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-serif">
                        {continent.description}
                      </p>

                      {/* 主要门派 */}
                      <div className="pt-2.5 sm:pt-3 border-t border-border/50">
                        <p className="text-[10px] sm:text-xs text-muted-foreground mb-1.5 sm:mb-2 font-serif">主要门派：</p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {continent.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-serif"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 查看详情 */}
                      <div className="hidden sm:flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                        <span className="text-xs font-medium font-serif">查看门派详情</span>
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

          {/* 地理概况 */}
          <Card className="p-4 sm:p-6 bg-card/40 backdrop-blur-sm border-border/50 shadow-soft">
            <h3 className="text-base sm:text-lg font-calligraphy font-bold mb-3 sm:mb-4">地理概况</h3>
            <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed font-serif">
              <p>
                云州世界由云汉、戎州两大大陆及周边零散岛屿（如归墟）构成。
                两大陆隔海相望，各自发展出独特的修仙文化与门派体系。
              </p>
              <p>
                除两大陆外，还有北溟、归墟等特殊地域。
                北溟位于云汉大陆极北，常年潮湿多雨，有蛟人出没；
                归墟则是位于戎州之北的禁地，封印着三千年前大战遗留的不可名状之物。
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Geography;
