import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, User, Scroll, Mountain as MountainIcon, Landmark } from 'lucide-react';
import { allSects } from '@/data/sects';
import { zixiaoLandmarks } from '@/data/landmarks';
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
  const isShanhaixuan = sect.id === 'shanhaixuan';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${
      isZixiao ? 'from-purple-950/30 via-amber-950/20 to-purple-950/30' : 
      isShanhaixuan ? 'from-blue-950/30 via-cyan-950/20 to-blue-950/30' :
      'from-background via-muted/30 to-background'
    } page-transition`}>
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
            <h1 className={`text-2xl font-bold ${
              isZixiao ? 'text-purple-400' : 
              isShanhaixuan ? 'text-cyan-400' :
              'text-primary'
            }`}>{sect.name}</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 门派简介 - 左侧图标，右侧文字 */}
          <Card className={`p-8 bg-card/50 backdrop-blur-sm ${
            isZixiao ? 'border-purple-500/30' :
            isShanhaixuan ? 'border-cyan-500/30' :
            'border-border/50'
          } shadow-card`}>
            <div className="flex gap-6 items-start">
              {/* 左侧门派图标 */}
              <div className={`flex-shrink-0 w-32 h-32 rounded-xl bg-gradient-to-br ${isZixiao ? 'from-purple-500/20 to-amber-500/20' : 'from-primary/20 to-accent/20'} flex items-center justify-center`}>
                <Scroll className={`w-16 h-16 ${isZixiao ? 'text-amber-400/60' : 'text-primary/60'}`} />
              </div>
              
              {/* 右侧简介 */}
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  门派简介
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {sect.description}
                </p>
                {sect.specialty && (
                  <div className={`p-3 rounded-lg ${isZixiao ? 'bg-purple-500/5 border border-purple-500/20' : 'bg-primary/5 border border-primary/20'}`}>
                    <p className="text-sm text-foreground">
                      <span className={`font-semibold ${isZixiao ? 'text-purple-400' : 'text-primary'}`}>门派特色：</span>
                      {sect.specialty}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* 门派结构 - 六山峰或掌门/地理位置/门规 */}
          {isZixiao && sect.mountains ? (
            <>
              {/* 紫霄宗六山峰 */}
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-purple-500/30 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <MountainIcon className="w-6 h-6 text-purple-400" />
                    门派结构 · 六山峰
                  </h2>
                  <Link to="/characters">
                    <Button variant="outline" size="sm" className="text-xs">
                      查看所有重要人物 →
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {sect.mountains.map((mountain) => (
                    <Link key={mountain.id} to={`/mountain/${mountain.id}`}>
                      <Card className="group p-6 bg-gradient-to-br from-purple-500/5 to-amber-500/5 border-purple-500/30 hover:border-amber-500/50 transition-all duration-300 hover:shadow-soft hover:-translate-y-1 cursor-pointer">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-400 transition-colors">
                          {mountain.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {mountain.description}
                        </p>
                        <div className="mt-4 text-sm text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          查看详情 →
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </Card>
            </>
          ) : (
            <>
              {/* 其他门派：掌门 */}
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
            </>
          )}

          {/* 地标建筑 - 仅紫霄宗显示 */}
          {isZixiao && (
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-purple-500/30 shadow-card">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Landmark className="w-6 h-6 text-purple-400" />
                地标建筑
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {zixiaoLandmarks.map((landmark) => (
                  <Link key={landmark.id} to={`/landmark/${landmark.id}`}>
                    <Card className="group overflow-hidden bg-gradient-to-br from-purple-500/5 to-amber-500/5 border-purple-500/30 hover:border-amber-500/50 transition-all duration-300 hover:shadow-soft hover:-translate-y-1 cursor-pointer">
                      {/* 缩略图 */}
                      <div className="aspect-video bg-gradient-to-br from-purple-500/10 to-amber-500/10 flex items-center justify-center">
                        {landmark.thumbnail ? (
                          <img 
                            src={landmark.thumbnail} 
                            alt={landmark.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <MapPin className="w-8 h-8 text-amber-400/40" />
                        )}
                      </div>
                      
                      {/* 信息 */}
                      <div className="p-4 space-y-2">
                        <h3 className="text-base font-semibold group-hover:text-amber-400 transition-colors">
                          {landmark.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {landmark.nickname}
                        </p>
                        <div className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          查看详情 →
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </Card>
          )}

          {/* 评论区 */}
          <CommentSection pageType="sect" pageId={id || ''} />
        </div>
      </main>
    </div>
  );
};

export default SectDetail;
