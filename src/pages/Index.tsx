import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Map, Image, Scroll, BookMarked, Sparkles } from 'lucide-react';

const sections = [
  {
    id: 'geography',
    title: '地理志',
    description: '云汉戎州，两域风华',
    icon: Map,
    color: 'from-primary/20 via-accent/10 to-primary/20',
    path: '/geography',
    size: 'large',
  },
  {
    id: 'illustrations',
    title: '立绘',
    description: '人物形象',
    icon: Image,
    color: 'from-accent/20 via-secondary/10 to-accent/20',
    path: '/illustrations',
    size: 'medium',
  },
  {
    id: 'history',
    title: '云州历史',
    description: '千年纪事',
    icon: Scroll,
    color: 'from-primary/20 via-primary-glow/10 to-secondary/20',
    path: '/history',
    size: 'medium',
  },
  {
    id: 'bestiary',
    title: '志怪图鉴',
    description: '异兽妖魔',
    icon: BookMarked,
    color: 'from-secondary/20 via-accent/10 to-primary/20',
    path: '/bestiary',
    size: 'medium',
  }
];

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden page-transition">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-muted/30 to-background">
        {/* Floating Ornaments */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-secondary/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center relative z-10">
        <div className="max-w-6xl mx-auto w-full py-8 sm:py-12">
          {/* Slogan with Ornament */}
          <div className="text-center mb-6 sm:mb-8 relative">
            <div className="inline-block relative">
              <Sparkles className="absolute -top-2 -left-6 w-4 h-4 text-primary/40 animate-pulse" />
              <p className="text-muted-foreground/70 text-xs sm:text-sm tracking-[0.3em] font-serif">
                时光倒转·命运重启
              </p>
              <Sparkles className="absolute -bottom-2 -right-6 w-4 h-4 text-accent/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          {/* Main Title with Calligraphy */}
          <div className="text-center mb-12 sm:mb-16 space-y-4 sm:space-y-6">
            <div className="relative inline-block">
              {/* Decorative lines */}
              <div className="absolute -left-12 top-1/2 w-8 h-[2px] bg-gradient-to-r from-transparent to-primary/30" />
              <div className="absolute -right-12 top-1/2 w-8 h-[2px] bg-gradient-to-l from-transparent to-primary/30" />
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-calligraphy font-bold bg-gradient-to-br from-primary via-primary-glow to-accent bg-clip-text text-transparent tracking-wider relative">
                云州纪事
                {/* Glow effect */}
                <span className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-br from-primary via-primary-glow to-accent -z-10" />
              </h1>
            </div>
            <p className="text-muted-foreground text-base sm:text-lg font-serif tracking-wide">
              仙侠世界的百科全书
            </p>
          </div>

          {/* Section Cards - Asymmetric Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isLarge = section.size === 'large';
              
              return (
                <Link 
                  key={section.id} 
                  to={section.path}
                  className={`${isLarge ? 'md:col-span-2 lg:col-span-2' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className={`group relative overflow-hidden bg-card/40 backdrop-blur-md border-border/50 hover:border-primary/50 hover-lift cursor-pointer h-full ${isLarge ? 'min-h-[240px] sm:min-h-[280px]' : 'min-h-[200px] sm:min-h-[240px]'}`}>
                    {/* Animated Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-100 transition-all duration-700`} />
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                    
                    {/* Decorative Corner */}
                    <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-500" />
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-500" />
                    
                    <div className={`relative h-full flex ${isLarge ? 'flex-row items-center gap-6 sm:gap-8 p-6 sm:p-10' : 'flex-col items-center justify-center p-6 sm:p-8'}`}>
                      {/* Icon */}
                      <div className={`flex-shrink-0 ${isLarge ? 'w-20 h-20 sm:w-28 sm:h-28' : 'w-16 h-16 sm:w-20 sm:h-20'} rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner relative overflow-hidden`}>
                        {/* Inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Icon className={`${isLarge ? 'w-10 h-10 sm:w-14 sm:h-14' : 'w-8 h-8 sm:w-10 sm:h-10'} text-primary group-hover:text-primary-glow transition-all duration-500 relative z-10`} />
                      </div>
                      
                      {/* Text Content */}
                      <div className={`space-y-2 ${isLarge ? 'text-left flex-1' : 'text-center'}`}>
                        <h3 className={`${isLarge ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-lg sm:text-xl'} font-calligraphy font-bold text-foreground group-hover:text-primary transition-colors duration-500`}>
                          {section.title}
                        </h3>
                        <p className={`${isLarge ? 'text-base sm:text-lg' : 'text-sm sm:text-base'} text-muted-foreground leading-relaxed font-serif tracking-wide group-hover:text-card-foreground transition-colors duration-500`}>
                          {section.description}
                        </p>
                        
                        {/* Arrow indicator */}
                        <div className={`pt-2 text-sm text-primary/0 group-hover:text-primary/100 transition-all duration-500 ${isLarge ? 'text-left' : 'text-center'}`}>
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

          {/* Footer Ornament */}
          <div className="mt-16 text-center opacity-30">
            <div className="inline-flex items-center gap-2 text-xs text-primary font-serif tracking-widest">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-primary" />
              云州世界
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-primary" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
