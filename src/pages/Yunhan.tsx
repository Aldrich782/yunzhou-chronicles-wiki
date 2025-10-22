import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mountain } from 'lucide-react';
import { yunhanSects } from '@/data/sects';

const Yunhan = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
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

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 介绍区域 */}
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mountain className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">云汉大陆</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              位于世界左侧，灵气充沛，名山大川遍布。这里是正道门派的核心区域，
              以紫霄宗为首的正道联盟共同维护着修仙界的秩序。
            </p>
          </div>

          {/* 门派列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {yunhanSects.map((sect) => (
              <Link key={sect.id} to={`/sect/${sect.id}`}>
                <Card className="group h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card hover:-translate-y-1 cursor-pointer">
                  <div className="p-8 space-y-4">
                    {/* 门派名称 */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {sect.name}
                      </h3>
                      <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
                    </div>

                    {/* 门派描述 */}
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                      {sect.description}
                    </p>

                    {/* 掌门信息 */}
                    <div className="pt-4 border-t border-border/50">
                      <p className="text-sm text-muted-foreground">
                        掌门：<span className="text-foreground font-medium">{sect.leader}</span>
                      </p>
                    </div>

                    {/* 查看详情 */}
                    <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                      <span className="text-sm font-medium">查看详情</span>
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
      </main>
    </div>
  );
};

export default Yunhan;
