import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, User, Scroll, Mountain as MountainIcon } from 'lucide-react';
import { allSects } from '@/data/sects';
import { CommentSection } from '@/components/CommentSection';

const SectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sect = allSects.find(s => s.id === id);

  if (!sect) {
    return (
      <div className="min-h-screen flex items-center justify-center page-transition">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">门派未找到</h2>
          <Button onClick={() => navigate('/')}>返回首页</Button>
        </div>
      </div>
    );
  }

  const isZixiao = sect.id === 'zixiao';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background page-transition">
      {/* 顶部导航 */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to={sect.region === 'yunhan' ? '/yunhan' : '/rongzhou'}>
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                返回列表
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-primary">{sect.name}</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 门派简介 */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Scroll className="w-6 h-6 text-primary" />
              门派简介
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
              {sect.description}
            </p>
            {sect.specialty && (
              <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-foreground">
                  <span className="font-semibold text-primary">门派特色：</span>
                  {sect.specialty}
                </p>
              </div>
            )}
          </Card>

          {/* 六山峰 - 增加前往重要人物页面的链接 */}
          {isZixiao && sect.mountains && (
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <MountainIcon className="w-6 h-6 text-primary" />
                  六山峰
                </h2>
                <Link to="/characters">
                  <Button variant="outline" size="sm" className="text-xs">
                    查看所有重要人物 →
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sect.mountains.map((mountain) => (
                  <Link key={mountain.id} to={`/mountain/${mountain.id}`}>
                    <Card className="group p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-soft hover:-translate-y-1 cursor-pointer">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {mountain.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {mountain.description}
                      </p>
                      <div className="mt-4 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        查看详情 →
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </Card>
          )}

          {/* 掌门 */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-primary" />
              掌门
            </h2>
            <div className="text-lg">
              <span className="text-primary font-semibold">{sect.leader}</span>
            </div>
          </Card>

          {/* 地理位置 */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              地理位置
            </h2>
            <p className="text-muted-foreground text-lg">{sect.location}</p>
          </Card>

          {/* 门规 */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Scroll className="w-6 h-6 text-primary" />
              门规
            </h2>
            <ul className="space-y-3">
              {sect.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground flex-1">{rule}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* 评论区 */}
          <CommentSection />
        </div>
      </main>
    </div>
  );
};

export default SectDetail;
