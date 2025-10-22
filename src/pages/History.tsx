import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Scroll, Clock } from 'lucide-react';
import { CommentSection } from '@/components/CommentSection';

const historyEvents = [
  {
    id: '归墟之战',
    time: '3000年前',
    title: '归墟之战',
    description: '原初天道陨落，被外神"祂"所取代。修仙界强者献身化为81根镇钉，封印归墟的不可名状之物，这是关乎世界存亡的禁地。',
    color: 'from-destructive/20 to-destructive/10'
  },
  {
    id: '青鸾山之役',
    time: '100年前',
    title: '青鸾山之役',
    description: '白骨哀趁紫霄宗修复护山大阵时突袭，二长老席微的道侣云非堇为保护妻儿弟子而战死，这场战役给正道联盟带来沉重打击。',
    color: 'from-primary/20 to-primary/10'
  },
  {
    id: '时光倒转',
    time: '百年前',
    title: '时光倒转',
    description: '李扶光飞升时发现"祂"的真相，与旧天道合作，以自身为代价逆转时间，并拉入戴月槐作为破局的变数，开启了新的时间线。',
    color: 'from-accent/20 to-accent/10'
  },
  {
    id: '新旧天道之争',
    time: '当前',
    title: '新旧天道之争',
    description: '戴月槐改变了司徊的成长环境，引发"祂"的警觉。"祂"投放新棋子（洛云卿、柳玄之、天道之书），双方势力展开新一轮博弈。',
    color: 'from-secondary/20 to-secondary/10'
  }
];

const History = () => {
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
            <h1 className="text-2xl font-bold text-primary">云州历史</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 介绍区域 */}
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Scroll className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">千年纪事，时光流转</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              这是一个经历过时光倒转的世界，新旧天道之争撕裂苍穹。
              在三千年的漫长岁月中，无数英雄豪杰书写了属于这个世界的传奇。
            </p>
          </div>

          {/* 世界核心设定 */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <h3 className="text-2xl font-bold mb-6">世界核心设定</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <span className="font-semibold text-primary">世界类型：</span>
                仙侠/修真/穿书/多重博弈
              </p>
              <p className="text-lg">
                本世界经历过一次由原掌门李扶光以自身为代价发起的"时光倒转"。
                其核心冲突源于"新旧天道之争"：三千年前，原初天道在归墟之战中陨落，
                被一意图吞噬万物飞升者的外神"祂"所取代。
              </p>
              <p>
                为了拨乱反正，幸存的旧天道势力（李扶光化身的"系统"与天道转世的袁霄强）
                从异世界拉来读者"戴月槐"，试图修正被"祂"蛊惑的魔子"司徊"的命运。
                与此同时，"祂"也投放"天道之书"等工具，引诱并操控本土修士与另一位穿书者"席沐逍"，
                试图剿灭旧天道势力，完成对世界的彻底侵蚀。
              </p>
            </div>
          </Card>

          {/* 时间线 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              重要历史事件
            </h3>
            
            <div className="relative">
              {/* 时间线竖线 */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary" />
              
              <div className="space-y-8">
                {historyEvents.map((event, index) => (
                  <div key={event.id} className="relative pl-20">
                    {/* 时间点 */}
                    <div className="absolute left-4 top-6 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-soft">
                      <div className="w-3 h-3 rounded-full bg-background" />
                    </div>
                    
                    <Card className={`p-6 bg-gradient-to-br ${event.color} border-border/50 shadow-soft hover:shadow-card transition-all duration-300`}>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                            {event.time}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold">{event.title}</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 地理环境 */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <h3 className="text-2xl font-bold mb-6">地理环境</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-primary mb-2">世界整体形态</h4>
                <p className="text-muted-foreground leading-relaxed">
                  由云汉、戎州两大大陆及周边零散岛屿（如归墟）构成的世界。
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
                  <h4 className="text-lg font-semibold mb-3">云汉大陆</h4>
                  <p className="text-muted-foreground">
                    位于世界左侧，灵气充沛，名山大川遍布，是正道门派的核心区域。
                  </p>
                </div>
                
                <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10">
                  <h4 className="text-lg font-semibold mb-3">戎州大陆</h4>
                  <p className="text-muted-foreground">
                    位于世界右侧，地势复杂，既有适合剑修的险峻山脉，也有魔气滋生的昆仑死地。
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-primary mb-3">特殊地域</h4>
                <ul className="space-y-3">
                  <li className="p-4 rounded-lg bg-muted/30">
                    <span className="font-semibold">归墟：</span>
                    <span className="text-muted-foreground ml-2">
                      位于戎州之北的独立岛屿，封印着三千年前大战遗留的、不可名状的未知生物。
                      由81根修仙强者献身化作的镇钉维持封印，是关乎世界存亡的禁地。
                    </span>
                  </li>
                  <li className="p-4 rounded-lg bg-muted/30">
                    <span className="font-semibold">昆仑：</span>
                    <span className="text-muted-foreground ml-2">
                      戎州北部的广袤区域，环境恶劣，是白骨哀（魔修）与禨祥宗（天道使者）的所在地。
                    </span>
                  </li>
                  <li className="p-4 rounded-lg bg-muted/30">
                    <span className="font-semibold">北溟：</span>
                    <span className="text-muted-foreground ml-2">
                      位于云汉大陆极北，常年潮湿多雨，有蛟人出没。
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* 评论区 */}
          <CommentSection />
        </div>
      </main>
    </div>
  );
};

export default History;
