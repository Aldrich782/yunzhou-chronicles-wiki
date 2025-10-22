import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, User } from 'lucide-react';
import { importantCharacters, formerElders } from '@/data/sects';

const Characters = () => {
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
            <h1 className="text-xl font-bold text-primary">重要人物</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 介绍区域 */}
          <div className="text-center space-y-3 mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">关键人物录</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              影响云州世界命运走向的重要人物
            </p>
          </div>

          {/* 重要人物 */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              关键变数
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {importantCharacters.map((character) => (
                <Card
                  key={character.id}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-card transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* 头像占位 */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto flex items-center justify-center">
                      <User className="w-10 h-10 text-primary/40" />
                    </div>
                    
                    <div className="text-center space-y-2">
                      <h4 className="text-xl font-bold">{character.name}</h4>
                      <p className="text-sm text-primary">{character.title}</p>
                      {character.status && (
                        <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs">
                          {character.status}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {character.description}
                    </p>

                    {character.specialty && (
                      <div className="pt-3 border-t border-border/50">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold text-primary">特殊能力：</span>
                          {character.specialty}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 上一代长老 */}
          <div className="space-y-6 mt-12">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              紫霄宗上一代长老
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {formerElders.map((elder) => (
                <Card
                  key={elder.id}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-card transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* 头像占位 */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-muted/40 to-muted/20 mx-auto flex items-center justify-center">
                      <User className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                    
                    <div className="text-center space-y-2">
                      <h4 className="text-lg font-bold">{elder.name}</h4>
                      <p className="text-xs text-primary">{elder.title}</p>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground text-xs">
                        {elder.status}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {elder.description}
                    </p>

                    {elder.specialty && (
                      <div className="pt-3 border-t border-border/50">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold">专长：</span>
                          {elder.specialty}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Characters;
