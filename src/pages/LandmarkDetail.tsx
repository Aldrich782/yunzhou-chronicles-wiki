import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Users, BookOpen, Info } from 'lucide-react';
import { allLandmarks } from '@/data/landmarks';
import { CommentSection } from '@/components/CommentSection';

const LandmarkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const landmark = allLandmarks.find(l => l.id === id);

  if (!landmark) {
    return (
      <div className="min-h-screen flex items-center justify-center page-transition">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">地标未找到</h2>
          <Button onClick={() => navigate(-1)}>返回</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background page-transition">
      {/* 顶部导航 */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
              返回
            </Button>
            <h1 className="text-2xl font-bold text-primary">{landmark.name}</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 地标缩略图 */}
          <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <div className="aspect-video bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center">
              {landmark.thumbnail ? (
                <img 
                  src={landmark.thumbnail} 
                  alt={landmark.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center space-y-3">
                  <MapPin className="w-16 h-16 text-primary/40 mx-auto" />
                  <p className="text-muted-foreground">图片待上传</p>
                </div>
              )}
            </div>
          </Card>

          {/* 基本信息 */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{landmark.name}</h2>
                  <p className="text-lg text-muted-foreground">
                    弟子别称：<span className="text-primary">{landmark.nickname}</span>
                  </p>
                </div>
              </div>

              {landmark.location && (
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">位置</p>
                      <p className="text-muted-foreground text-sm">{landmark.location}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-border/50">
                <p className="text-muted-foreground leading-relaxed">
                  {landmark.description}
                </p>
              </div>
            </div>
          </Card>

          {/* 官方用途 */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              官方用途
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {landmark.officialUse}
            </p>
          </Card>

          {/* 私下用途 */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              私下用途
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {landmark.privateUse}
            </p>
          </Card>

          {/* 特殊规则 */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              特殊规则
            </h3>
            <ul className="space-y-4">
              {landmark.specialRules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground flex-1">{rule}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* 环境细节 */}
          {landmark.details && landmark.details.length > 0 && (
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
              <h3 className="text-xl font-bold mb-6">环境细节</h3>
              <ul className="space-y-3">
                {landmark.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span className="flex-1 leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* 评论区 */}
          <CommentSection />
        </div>
      </main>
    </div>
  );
};

export default LandmarkDetail;
