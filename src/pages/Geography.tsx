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
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" className="gap-2 text-sm">
                <ArrowLeft className="w-4 h-4" />
                返回首页
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-primary">地理志</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 介绍区域 */}
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-2xl font-bold">两域风华</h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              云州世界由云汉、戎州两大大陆组成，各有千秋，各展风华
            </p>
          </div>

          {/* 大陆展示 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {continents.map((continent) => {
              const Icon = continent.icon;
              return (
                <Link key={continent.id} to={continent.path}>
                  <Card className="group h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card hover:-translate-y-1 cursor-pointer">
                    {/* 顶部装饰 */}
                    <div className={`h-32 bg-gradient-to-br ${continent.color} flex items-center justify-center relative overflow-hidden`}>
                      <Icon className="w-16 h-16 text-primary/20 absolute" />
                      <Icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-500 relative z-10" />
                    </div>

                    <div className="p-6 space-y-4">
                      {/* 标题 */}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {continent.title}
                        </h3>
                        <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
                      </div>

                      {/* 描述 */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {continent.description}
                      </p>

                      {/* 主要门派 */}
                      <div className="pt-3 border-t border-border/50">
                        <p className="text-xs text-muted-foreground mb-2">主要门派：</p>
                        <div className="flex flex-wrap gap-2">
                          {continent.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 查看详情 */}
                      <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                        <span className="text-xs font-medium">查看门派详情</span>
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
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-soft">
            <h3 className="text-lg font-bold mb-4">地理概况</h3>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
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
