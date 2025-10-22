import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { CommentSection } from '@/components/CommentSection';

const Illustrations = () => {
  // 占位的立绘数据
  const illustrationSlots = Array.from({ length: 6 }, (_, i) => ({
    id: `illust-${i + 1}`,
    name: `角色 ${i + 1}`,
  }));

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
            <h1 className="text-2xl font-bold text-primary">立绘</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 介绍区域 */}
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ImageIcon className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">角色立绘</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              云州世界的重要角色立绘展示
            </p>
          </div>

          {/* 立绘网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {illustrationSlots.map((slot) => (
              <Card
                key={slot.id}
                className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card cursor-pointer"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <ImageIcon className="w-16 h-16 text-primary/40 mx-auto" />
                    <p className="text-muted-foreground">立绘占位</p>
                    <p className="text-sm text-muted-foreground/60">{slot.name}</p>
                  </div>
                </div>
                
                <div className="p-6 space-y-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {slot.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    点击查看详情
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* 提示信息 */}
          <Card className="p-8 bg-accent/10 border-accent/30 text-center">
            <p className="text-muted-foreground">
              立绘内容待添加，敬请期待
            </p>
          </Card>

          {/* 评论区 */}
          <CommentSection />
        </div>
      </main>
    </div>
  );
};

export default Illustrations;
