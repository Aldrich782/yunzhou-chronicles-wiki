import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mountain, Waves } from 'lucide-react';
import { yunhanSects } from '@/data/sects';

const Yunhan = () => {
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
            <h1 className="text-2xl font-bold text-primary">云汉大陆</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 介绍区域 */}
          <div className="text-center space-y-4 mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mountain className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold">云汉大陆</h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              位于世界左侧，灵气充沛，名山大川遍布。这里是正道门派的核心区域，
              以紫霄宗为首的正道联盟共同维护着修仙界的秩序。
            </p>
          </div>

          {/* 门派列表 */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">门派</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {yunhanSects.map((sect) => (
                <Link key={sect.id} to={`/sect/${sect.id}`}>
                  <Card className="group h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card hover:-translate-y-1 cursor-pointer">
                    <div className="p-6 sm:p-8 space-y-4">
                      {/* 门派名称 */}
                      <div className="space-y-2">
                        <h4 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {sect.name}
                        </h4>
                        <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
                      </div>

                      {/* 门派描述 */}
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                        {sect.description}
                      </p>

                      {/* 掌门信息 */}
                      <div className="pt-4 border-t border-border/50">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          掌门：<span className="text-foreground font-medium">{sect.leader}</span>
                        </p>
                      </div>

                      {/* 查看详情 */}
                      <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                        <span className="text-xs sm:text-sm font-medium">查看详情</span>
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
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
              ))}
            </div>
          </div>

          {/* 分隔线 */}
          <div className="flex items-center gap-3 my-8 sm:my-12">
            <div className="h-px flex-1 bg-border" />
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* 山川河流 */}
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Waves className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h3 className="text-xl sm:text-2xl font-bold">山川河流</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6">
                <h4 className="text-lg sm:text-xl font-bold mb-3 text-foreground">紫霄山脉</h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  云汉中央的巍峨山脉，六峰耸立，云雾缭绕，是紫霄宗的根基所在。山脉灵气充沛，
                  自古便是修仙圣地。
                </p>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6">
                <h4 className="text-lg sm:text-xl font-bold mb-3 text-foreground">北溟之海</h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  云汉北部的广袤海域，常年云雾缭绕，海中栖息着神秘的鲲鹏和危险的蛟人。
                  山海轩世代守护于此。
                </p>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6">
                <h4 className="text-lg sm:text-xl font-bold mb-3 text-foreground">天瀑江</h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  云汉大陆最大的河流，源自紫霄山脉，蜿蜒数千里，滋养着大陆上的无数生灵。
                  江水清澈，富含灵气。
                </p>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6">
                <h4 className="text-lg sm:text-xl font-bold mb-3 text-foreground">云梦泽</h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  位于云汉东南的广阔湿地，终年云雾缭绕，如梦似幻。泽中生长着许多珍贵的灵草灵药，
                  但也栖息着不少妖兽。
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Yunhan;
