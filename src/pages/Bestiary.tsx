import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookMarked, Info } from 'lucide-react';
import { CommentSection } from '@/components/CommentSection';

const creatures = [
  {
    id: 'unknown-creature',
    name: '归墟封印之物',
    category: '未知生物',
    danger: '极度危险',
    description: '三千年前归墟之战遗留的不可名状之物，被81根镇钉封印。其真实形态无人知晓，是威胁整个世界存亡的禁忌存在。',
    location: '归墟'
  },
  {
    id: 'jiaoren',
    name: '蛟人',
    category: '妖族',
    danger: '中等',
    description: '栖息于北溟的半人半妖生物，擅长水性，具有一定灵智。部分蛟人族群与人类修士保持着微妙的关系。',
    location: '北溟'
  },
];

const Bestiary = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background page-transition">
      {/* 顶部导航 */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                返回首页
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-primary">志怪图鉴</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 介绍区域 */}
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookMarked className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">异兽妖魔录</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              记录云州世界各类异兽、妖魔与未知生物的百科图鉴
            </p>
          </div>

          {/* 种族说明 */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <h3 className="text-2xl font-bold mb-6">主要种族</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
                <h4 className="text-lg font-semibold mb-2">人类</h4>
                <p className="text-muted-foreground">
                  修仙界的主流种族，通过修炼可以突破凡胎，追求长生与飞升。
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-gradient-to-br from-destructive/10 to-secondary/10">
                <h4 className="text-lg font-semibold mb-2">魔族</h4>
                <p className="text-muted-foreground">
                  血统稀少，如司徊。魔族天生具有强大的力量，但往往受到正道的排斥。
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10">
                <h4 className="text-lg font-semibold mb-2">妖兽</h4>
                <p className="text-muted-foreground">
                  修炼有成的野兽，具有各种神通异能，部分可化形为人。
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10">
                <h4 className="text-lg font-semibold mb-2">蛟人</h4>
                <p className="text-muted-foreground">
                  半人半妖的水生种族，主要栖息在北溟等水域。
                </p>
              </div>
            </div>
          </Card>

          {/* 生物列表 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Info className="w-6 h-6 text-primary" />
              已知生物
            </h3>

            {creatures.map((creature) => (
              <Card
                key={creature.id}
                className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-card transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-2xl font-bold mb-2">{creature.name}</h4>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                          {creature.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          creature.danger === '极度危险' 
                            ? 'bg-destructive/20 text-destructive' 
                            : 'bg-accent/20 text-accent'
                        }`}>
                          {creature.danger}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {creature.description}
                  </p>

                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">
                      栖息地：<span className="text-foreground font-medium">{creature.location}</span>
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* 提示信息 */}
          <Card className="p-8 bg-accent/10 border-accent/30 text-center">
            <p className="text-muted-foreground">
              更多生物信息待补充，欢迎探索发现
            </p>
          </Card>

          {/* 评论区 */}
          <CommentSection />
        </div>
      </main>
    </div>
  );
};

export default Bestiary;
