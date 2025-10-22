import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Map, Image, Scroll, BookMarked, Sparkles, User } from 'lucide-react';
import { PasswordGate } from '@/components/PasswordGate';

const sections = [
  {
    id: 'geography',
    title: '地理志',
    description: '云汉戎州',
    icon: Map,
    color: 'from-primary/20 via-accent/10 to-primary/20',
    path: '/geography',
  },
  {
    id: 'illustrations',
    title: '立绘',
    description: '人物形象',
    icon: Image,
    color: 'from-accent/20 via-secondary/10 to-accent/20',
    path: '/illustrations',
  },
  {
    id: 'history',
    title: '云州历史',
    description: '千年纪事',
    icon: Scroll,
    color: 'from-primary/20 via-primary-glow/10 to-secondary/20',
    path: '/history',
  },
  {
    id: 'bestiary',
    title: '志怪图鉴',
    description: '异兽妖魔',
    icon: BookMarked,
    color: 'from-secondary/20 via-accent/10 to-primary/20',
    path: '/bestiary',
  }
];

const Index = () => {
  const [hasAccess, setHasAccess] = useState(false);

  if (!hasAccess) {
    return <PasswordGate onSuccess={() => setHasAccess(true)} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden page-transition">
      {/* Paper Background with Ink Wash Effect */}
      <div className="fixed inset-0">
        {/* Ink wash clouds */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl float-cloud" />
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-cinnabar/5 rounded-full blur-3xl float-cloud" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-bamboo/5 rounded-full blur-2xl float-cloud" style={{ animationDelay: '4s' }} />
        
        {/* Traditional cloud pattern */}
        <div className="absolute top-40 right-1/4 w-32 h-32 opacity-5">
          <svg viewBox="0 0 100 100" className="text-primary">
            <path d="M20,50 Q30,30 50,40 Q70,30 80,50 Q70,70 50,60 Q30,70 20,50" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 opacity-5">
          <svg viewBox="0 0 100 100" className="text-cinnabar">
            <path d="M20,50 Q30,30 50,40 Q70,30 80,50 Q70,70 50,60 Q30,70 20,50" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-6 min-h-screen flex items-center justify-center relative z-10">
        <div className="max-w-6xl mx-auto w-full py-6 sm:py-12">
          {/* Slogan with Ornament - More compact on mobile */}
          <div className="text-center mb-3 sm:mb-8 relative">
            <div className="inline-block relative">
              <Sparkles className="hidden sm:block absolute -top-2 -left-6 w-4 h-4 text-primary/40 animate-pulse" />
              <p className="text-muted-foreground/70 text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] font-serif">
                时光倒转·命运重启
              </p>
              <Sparkles className="hidden sm:block absolute -bottom-2 -right-6 w-4 h-4 text-accent/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          {/* Main Title with Calligraphy - Smaller on mobile */}
          <div className="text-center mb-6 sm:mb-16 space-y-2 sm:space-y-6">
            <div className="relative inline-block">
              {/* Decorative lines - hidden on mobile */}
              <div className="hidden sm:block absolute -left-12 top-1/2 w-8 h-[2px] bg-gradient-to-r from-transparent to-primary/30" />
              <div className="hidden sm:block absolute -right-12 top-1/2 w-8 h-[2px] bg-gradient-to-l from-transparent to-primary/30" />
              
              <h1 className="text-4xl sm:text-7xl md:text-8xl font-calligraphy font-bold text-ink tracking-wide sm:tracking-wider relative drop-shadow-sm">
                云州纪事
                {/* Ink effect */}
                <span className="absolute inset-0 blur-sm opacity-20 text-primary -z-10">云州纪事</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-xs sm:text-lg font-serif tracking-wide">
              仙侠世界的百科全书
            </p>
          </div>

          {/* Section Cards - Compact mobile grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 max-w-5xl mx-auto">
            {sections.map((section, index) => {
              const Icon = section.icon;
              
              return (
                <Link 
                  key={section.id} 
                  to={section.path}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="group relative overflow-hidden bg-card/60 backdrop-blur-sm border-border hover:border-primary/60 cursor-pointer h-full min-h-[140px] sm:min-h-[200px] transition-all duration-300 active:scale-95 hover:shadow-card paper-texture">
                    {/* Animated Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-500`} />
                    
                    {/* Shimmer Effect - Only on desktop */}
                    <div className="hidden sm:block absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                    
                    {/* Decorative Corner - Traditional style */}
                    <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-4 h-4 sm:w-8 sm:h-8 border-l-2 border-t-2 border-primary/30 group-hover:border-primary/60 group-active:border-primary/70 transition-colors duration-500 rounded-tl-sm" />
                    <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-4 h-4 sm:w-8 sm:h-8 border-r-2 border-b-2 border-primary/30 group-hover:border-primary/60 group-active:border-primary/70 transition-colors duration-500 rounded-br-sm" />
                    
                    <div className="relative h-full flex flex-col items-center justify-center p-3 sm:p-8 gap-2 sm:gap-3">
                      {/* Icon - Seal stamp style */}
                      <div className="flex-shrink-0 w-10 h-10 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cinnabar/15 via-primary/10 to-cinnabar/15 flex items-center justify-center group-hover:scale-110 group-active:scale-105 transition-all duration-500 border-2 border-primary/20 group-hover:border-cinnabar/40 relative overflow-hidden">
                        {/* Seal texture */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cinnabar/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
                        <Icon className="w-5 h-5 sm:w-10 sm:h-10 text-primary group-hover:text-cinnabar group-active:text-cinnabar transition-all duration-500 relative z-10" />
                      </div>
                      
                      {/* Text Content - Compact on mobile */}
                      <div className="space-y-0.5 sm:space-y-2 text-center">
                        <h3 className="text-sm sm:text-xl font-calligraphy font-bold text-foreground group-hover:text-primary group-active:text-primary transition-colors duration-500 leading-tight">
                          {section.title}
                        </h3>
                        <p className="text-[10px] sm:text-base text-muted-foreground leading-tight sm:leading-relaxed font-serif tracking-wide group-hover:text-card-foreground group-active:text-card-foreground transition-colors duration-500">
                          {section.description}
                        </p>
                        
                        {/* Arrow indicator - Hidden on mobile */}
                        <div className="hidden sm:block pt-2 text-sm text-primary/0 group-hover:text-primary/100 transition-all duration-500 text-center">
                          <span className="inline-flex items-center gap-1 font-serif">
                            进入 <span className="inline-block group-hover:translate-x-1 transition-transform duration-500">→</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Footer Ornament - Smaller on mobile */}
          <div className="mt-8 sm:mt-16 text-center opacity-30">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs text-primary font-serif tracking-wider sm:tracking-widest">
              <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-primary" />
              云州世界
              <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-primary" />
            </div>
          </div>

          {/* Profile Button */}
          <div className="mt-8 text-center">
            <Link to="/profile">
              <Button
                variant="outline"
                className="group hover:bg-primary/10 hover:border-primary/60 transition-all duration-300"
              >
                <User className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                <span className="font-serif">个人中心</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
