import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2, User, Target, Users, Sparkles } from 'lucide-react';
import { allSects } from '@/data/sects';
import { CommentSection } from '@/components/CommentSection';

const DivisionDetail = () => {
  const { sectId, divisionId } = useParams();
  const navigate = useNavigate();
  
  // 查找门派和分支
  const sect = allSects.find(s => s.id === sectId);
  const division = sect?.divisions?.find(d => d.id === divisionId) || 
                   sect?.mountains?.find(m => m.id === divisionId);

  if (!division || !sect) {
    return (
      <div className="min-h-screen flex items-center justify-center page-transition">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">分支未找到</h2>
          <Button onClick={() => navigate('/')}>返回首页</Button>
        </div>
      </div>
    );
  }

  const isZixiao = sect.id === 'zixiao';
  const isShanhaixuan = sect.id === 'shanhaixuan';
  const isMountain = 'mountains' in sect && sect.mountains?.some(m => m.id === divisionId);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${
      isZixiao ? 'from-purple-900/40 via-purple-950/30 to-purple-900/40' : 
      isShanhaixuan ? 'from-blue-950/30 via-cyan-950/20 to-blue-950/30' :
      'from-background via-muted/30 to-background'
    } page-transition`}>
      {/* 顶部导航 */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to={`/sect/${sectId}`}>
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                返回{sect.name}
              </Button>
            </Link>
            <h1 className={`text-2xl font-bold ${
              isZixiao ? 'text-purple-300' :
              isShanhaixuan ? 'text-cyan-400' :
              'text-primary'
            }`}>{division.name}</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 简介 */}
          <Card className={`p-8 bg-card/50 backdrop-blur-sm ${
            isZixiao ? 'border-purple-500/30' :
            isShanhaixuan ? 'border-cyan-500/30' :
            'border-border/50'
          } shadow-card`}>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
              isZixiao ? 'text-purple-400' :
              isShanhaixuan ? 'text-cyan-400' : ''
            }`}>
              <Building2 className={`w-6 h-6 ${
                isZixiao ? 'text-purple-400' :
                isShanhaixuan ? 'text-cyan-400' :
                'text-primary'
              }`} />
              简介
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {division.description}
            </p>
          </Card>

          {/* 职能定位（仅 divisions） */}
          {!isMountain && 'duty' in division && (
            <Card className={`p-8 bg-card/50 backdrop-blur-sm ${
              isZixiao ? 'border-purple-500/30' :
              isShanhaixuan ? 'border-cyan-500/30' :
              'border-border/50'
            } shadow-card`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                isZixiao ? 'text-purple-400' :
                isShanhaixuan ? 'text-cyan-400' : ''
              }`}>
                <Target className={`w-6 h-6 ${
                  isZixiao ? 'text-purple-400' :
                  isShanhaixuan ? 'text-cyan-400' :
                  'text-primary'
                }`} />
                职能定位
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {'duty' in division ? String(division.duty) : ''}
              </p>
            </Card>
          )}

          {/* 主要职责（仅 divisions） */}
          {!isMountain && 'responsibilities' in division && division.responsibilities && Array.isArray(division.responsibilities) && division.responsibilities.length > 0 && (
            <Card className={`p-8 bg-card/50 backdrop-blur-sm ${
              isZixiao ? 'border-purple-500/30' :
              isShanhaixuan ? 'border-cyan-500/30' :
              'border-border/50'
            } shadow-card`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                isZixiao ? 'text-purple-400' :
                isShanhaixuan ? 'text-cyan-400' : ''
              }`}>
                <Target className={`w-6 h-6 ${
                  isZixiao ? 'text-purple-400' :
                  isShanhaixuan ? 'text-cyan-400' :
                  'text-primary'
                }`} />
                主要职责
              </h2>
              <ul className="space-y-3">
                {(division.responsibilities as string[]).map((resp, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full ${
                      isZixiao ? 'bg-purple-500/10 text-purple-400' :
                      isShanhaixuan ? 'bg-cyan-500/10 text-cyan-400' :
                      'bg-primary/10 text-primary'
                    } flex items-center justify-center text-sm font-medium mt-0.5`}>
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground flex-1">{resp}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* 弟子特征（仅 divisions） */}
          {!isMountain && 'characterTraits' in division && (
            <Card className={`p-8 bg-card/50 backdrop-blur-sm ${
              isZixiao ? 'border-purple-500/30' :
              isShanhaixuan ? 'border-cyan-500/30' :
              'border-border/50'
            } shadow-card`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                isZixiao ? 'text-purple-400' :
                isShanhaixuan ? 'text-cyan-400' : ''
              }`}>
                <Users className={`w-6 h-6 ${
                  isZixiao ? 'text-purple-400' :
                  isShanhaixuan ? 'text-cyan-400' :
                  'text-primary'
                }`} />
                弟子特征
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {'characterTraits' in division ? String(division.characterTraits) : ''}
              </p>
            </Card>
          )}

          {/* 代表法器（仅 divisions） */}
          {!isMountain && 'treasureName' in division && division.treasureName && (
            <Card className={`p-8 bg-card/50 backdrop-blur-sm ${
              isZixiao ? 'border-purple-500/30' :
              isShanhaixuan ? 'border-cyan-500/30' :
              'border-border/50'
            } shadow-card`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                isZixiao ? 'text-purple-400' :
                isShanhaixuan ? 'text-cyan-400' : ''
              }`}>
                <Sparkles className={`w-6 h-6 ${
                  isZixiao ? 'text-purple-400' :
                  isShanhaixuan ? 'text-cyan-400' :
                  'text-primary'
                }`} />
                代表法器
              </h2>
              <div className={`p-4 rounded-lg ${
                isZixiao ? 'bg-purple-500/5 border border-purple-500/20' :
                isShanhaixuan ? 'bg-cyan-500/5 border border-cyan-500/20' :
                'bg-primary/5 border border-primary/20'
              }`}>
                <h3 className={`text-xl font-semibold mb-2 ${
                  isZixiao ? 'text-purple-400' :
                  isShanhaixuan ? 'text-cyan-400' :
                  'text-primary'
                }`}>{'treasureName' in division ? String(division.treasureName) : ''}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {'treasureDescription' in division ? String(division.treasureDescription) : ''}
                </p>
              </div>
            </Card>
          )}

          {/* 重要人物 */}
          {division.characters && division.characters.length > 0 && (
            <Card className={`p-8 bg-card/50 backdrop-blur-sm ${
              isZixiao ? 'border-purple-500/30' :
              isShanhaixuan ? 'border-cyan-500/30' :
              'border-border/50'
            } shadow-card`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                isZixiao ? 'text-purple-400' :
                isShanhaixuan ? 'text-cyan-400' : ''
              }`}>
                <User className={`w-6 h-6 ${
                  isZixiao ? 'text-purple-400' :
                  isShanhaixuan ? 'text-cyan-400' :
                  'text-primary'
                }`} />
                重要人物
              </h2>
              
              <div className="space-y-8">
                {/* 主要人物 */}
                {division.characters[0] && (
                  <div className="flex flex-col items-center mb-6">
                    <Link to={`/character/${division.characters[0].id}`}>
                      <Card className={`group p-5 bg-gradient-to-br ${
                        isZixiao ? 'from-purple-500/10 to-amber-500/10 border-purple-500/30 hover:border-amber-500/50' :
                        isShanhaixuan ? 'from-cyan-500/10 to-blue-500/10 border-cyan-500/30 hover:border-blue-500/50' :
                        'from-primary/10 to-accent/10 border-border/50 hover:border-primary/50'
                      } transition-all duration-300 hover:shadow-soft hover:-translate-y-1 cursor-pointer max-w-sm`}>
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${
                          isZixiao ? 'from-purple-500/30 to-amber-500/30' :
                          isShanhaixuan ? 'from-cyan-500/30 to-blue-500/30' :
                          'from-primary/30 to-accent/30'
                        } mx-auto mb-3 flex items-center justify-center`}>
                          <User className={`w-10 h-10 ${
                            isZixiao ? 'text-purple-400/50' :
                            isShanhaixuan ? 'text-cyan-400/50' :
                            'text-primary/50'
                          }`} />
                        </div>
                        
                        <div className="text-center space-y-2">
                          <h3 className={`text-lg font-bold group-hover:${
                            isZixiao ? 'text-amber-400' :
                            isShanhaixuan ? 'text-blue-400' :
                            'text-primary'
                          } transition-colors`}>
                            {division.characters[0].name}
                          </h3>
                          <p className={`text-sm font-semibold ${
                            isZixiao ? 'text-purple-400' :
                            isShanhaixuan ? 'text-cyan-400' :
                            'text-primary'
                          }`}>
                            {division.characters[0].title}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                            {division.characters[0].description}
                          </p>
                          {division.characters[0].specialty && (
                            <p className={`text-xs ${
                              isZixiao ? 'text-purple-400/80' :
                              isShanhaixuan ? 'text-cyan-400/80' :
                              'text-primary/80'
                            }`}>
                              专长：{division.characters[0].specialty}
                            </p>
                          )}
                        </div>

                        <div className={`mt-3 text-center text-xs opacity-0 group-hover:opacity-100 transition-opacity ${
                          isZixiao ? 'text-amber-400' :
                          isShanhaixuan ? 'text-blue-400' :
                          'text-primary'
                        }`}>
                          查看详情 →
                        </div>
                      </Card>
                    </Link>

                    {/* 其他人物 */}
                    {division.characters.length > 1 && (
                      <div className="mt-6 w-full">
                        <h3 className="text-lg font-semibold text-center mb-4 text-muted-foreground">
                          {isMountain ? '亲传弟子' : '其他成员'}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {division.characters.slice(1).map((character) => (
                            <Link key={character.id} to={`/character/${character.id}`}>
                              <Card className={`group p-4 bg-gradient-to-br ${
                                isZixiao ? 'from-purple-500/5 to-amber-500/5 border-purple-500/30 hover:border-amber-500/50' :
                                isShanhaixuan ? 'from-cyan-500/5 to-blue-500/5 border-cyan-500/30 hover:border-blue-500/50' :
                                'from-primary/5 to-accent/5 border-border/50 hover:border-primary/50'
                              } transition-all duration-300 hover:shadow-soft hover:-translate-y-1 cursor-pointer`}>
                                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                                  isZixiao ? 'from-purple-500/20 to-amber-500/20' :
                                  isShanhaixuan ? 'from-cyan-500/20 to-blue-500/20' :
                                  'from-primary/20 to-accent/20'
                                } mx-auto mb-3 flex items-center justify-center`}>
                                  <User className={`w-8 h-8 ${
                                    isZixiao ? 'text-purple-400/40' :
                                    isShanhaixuan ? 'text-cyan-400/40' :
                                    'text-primary/40'
                                  }`} />
                                </div>
                                
                                <div className="text-center space-y-1">
                                  <h4 className={`text-base font-semibold group-hover:${
                                    isZixiao ? 'text-amber-400' :
                                    isShanhaixuan ? 'text-blue-400' :
                                    'text-primary'
                                  } transition-colors`}>
                                    {character.name}
                                  </h4>
                                  <p className="text-xs text-muted-foreground line-clamp-2">
                                    {character.specialty || character.title}
                                  </p>
                                </div>

                                <div className={`mt-2 text-center text-xs opacity-0 group-hover:opacity-100 transition-opacity ${
                                  isZixiao ? 'text-amber-400' :
                                  isShanhaixuan ? 'text-blue-400' :
                                  'text-primary'
                                }`}>
                                  查看详情 →
                                </div>
                              </Card>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* 评论区 */}
          <CommentSection pageType="sect" pageId={`${sectId}-${divisionId}`} />
        </div>
      </main>
    </div>
  );
};

export default DivisionDetail;
