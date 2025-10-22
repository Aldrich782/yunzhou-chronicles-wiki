import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Scroll, Clock, ChevronDown } from 'lucide-react';
import { CommentSection } from '@/components/CommentSection';
import { historyEvents, worldCore } from '@/data/history';
import { useState } from 'react';

const History = () => {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

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
            <h3 className="text-2xl font-bold mb-6">{worldCore.title}</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <span className="font-semibold text-primary">世界类型：</span>
                {worldCore.type}
              </p>
              <p className="text-base">
                {worldCore.description}
              </p>
              
              <div className="mt-6 space-y-4">
                {worldCore.details.map((detail, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/30">
                    <h4 className="font-semibold text-primary mb-2">{detail.title}</h4>
                    <p className="text-sm">{detail.content}</p>
                  </div>
                ))}
              </div>
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
                    
                    <Card 
                      className={`p-6 bg-gradient-to-br ${event.color} border-border/50 shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer`}
                      onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                              {event.time}
                            </span>
                          </div>
                          {event.details && (
                            <ChevronDown 
                              className={`w-5 h-5 text-primary transition-transform duration-300 ${
                                expandedEvent === event.id ? 'rotate-180' : ''
                              }`}
                            />
                          )}
                        </div>
                        <h4 className="text-xl font-bold">{event.title}</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                        
                        {/* 详细信息 */}
                        {event.details && expandedEvent === event.id && (
                          <div className="mt-4 pt-4 border-t border-border/50 space-y-2 animate-fade-in">
                            <h5 className="text-sm font-semibold text-primary mb-3">详细内容：</h5>
                            <ul className="space-y-2">
                              {event.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
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
          <CommentSection pageType="sect" pageId="history" />
        </div>
      </main>
    </div>
  );
};

export default History;
