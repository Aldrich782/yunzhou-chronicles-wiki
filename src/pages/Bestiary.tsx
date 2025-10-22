import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookMarked, Sparkles, Flower, Pill, Swords, Zap } from 'lucide-react';
import { CommentSection } from '@/components/CommentSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// 志怪
const creatures = [
  {
    id: 'unknown-creature',
    name: '归墟封印之物',
    danger: '极度危险',
    description: '三千年前归墟之战遗留的不可名状之物，被81根镇钉封印。其真实形态无人知晓，是威胁整个世界存亡的禁忌存在。',
    location: '归墟'
  },
  {
    id: 'jiaoren',
    name: '蛟人',
    danger: '中等',
    description: '栖息于北溟的半人半妖生物，擅长水性，具有一定灵智。部分蛟人族群与人类修士保持着微妙的关系。能以歌声迷惑人心。',
    location: '北溟'
  },
  {
    id: 'kunpeng',
    name: '鲲鹏',
    danger: '未知',
    description: '传说中的神兽，居于北溟深处。只有灵魂纯净的山海轩弟子能与之沟通。鲲鹏负责引导亡魂前往归墟，是生死轮回的摆渡者。',
    location: '北溟'
  },
  {
    id: 'hunling',
    name: '魂灵',
    danger: '低',
    description: '徘徊在魂林的灵魂体，等待着鲲鹏的引渡。他们是山海轩已故弟子的魂魄，守护着魂林，等待重生。',
    location: '魂林'
  },
];

// 奇珍
const treasures = [
  {
    id: 'linglong-stone',
    name: '玲珑石',
    rarity: '罕见',
    description: '产于紫霄山脉的珍贵矿石，内含灵气结晶。可用于炼器和布阵，是炼制法宝的上等材料。',
    location: '紫霄山脉'
  },
  {
    id: 'beiming-pearl',
    name: '北溟明珠',
    rarity: '稀有',
    description: '北溟深海中的珍珠，蕴含纯净的水灵力。服用后可增强水系法术威力，长期佩戴能净化心神。',
    location: '北溟'
  },
  {
    id: 'kunlun-ice',
    name: '昆仑寒冰',
    rarity: '稀有',
    description: '昆仑地区万年不化的寒冰，蕴含极致的冰寒之力。可用于炼制冰系法宝，或作为修炼冰系功法的辅助。',
    location: '昆仑'
  },
];

// 草药
const herbs = [
  {
    id: 'zixiao-lingcao',
    name: '紫霄灵草',
    effect: '增强灵力',
    description: '生长在紫霄山脉的灵草，吸收天地灵气。服用后可增强修为，是炼制丹药的常用材料。',
    location: '紫霄山脉·长留山'
  },
  {
    id: 'huanhun-hua',
    name: '唤魂花',
    effect: '修复神魂',
    description: '极其罕见的灵药，能修复受损的神魂。问琴仙宫林家正是凭借这种花掌握了神魂修复之术。',
    location: '问琴峰'
  },
  {
    id: 'bingxin-lian',
    name: '冰心莲',
    effect: '清心凝神',
    description: '生长在寒冷水域的灵莲，能清心凝神，驱散心魔。水云洞天常用其炼制疗伤圣药。',
    location: '沧澜水域'
  },
  {
    id: 'qingxin-cao',
    name: '清心草',
    effect: '解毒疗伤',
    description: '常见的药草，清热解毒。虽然效果不如灵药，但生长广泛，是修士们常备的疗伤药材。',
    location: '各地'
  },
];

// 异宝（法器兵器）
const artifacts = [
  {
    id: 'mengling',
    name: '梦铃',
    type: '法器',
    grade: '上品',
    description: '山海轩的特色武器，能感知灵魂波动，操控梦境。铃声清脆，可安抚亡魂，也可引导鲲鹏。',
    owner: '山海轩弟子'
  },
  {
    id: 'changsheng-jian',
    name: '长生剑',
    type: '兵器',
    grade: '极品',
    description: '长生门历代掌门的佩剑，剑身刻有"长生"二字。剑意凌厉，可破万法，是剑道的极致体现。',
    owner: '长生门掌门'
  },
  {
    id: 'tiandao-shu',
    name: '天道之书',
    type: '法器',
    grade: '？？？',
    description: '假天道"祂"投放的邪恶之物，能引诱修士走向邪路。已被席沐逍拾获，正在引导他杀死司徊和袁霄强。',
    owner: '席沐逍'
  },
  {
    id: 'baigu-ling',
    name: '白骨令',
    type: '法器',
    grade: '上品',
    description: '白骨哀首领的信物，持有者可号令白骨哀众人。令牌以白骨制成，阴气森森。',
    owner: '谢檀远'
  },
  {
    id: 'qianmian-mian',
    name: '千面面具',
    type: '法器',
    grade: '上品',
    description: '半月楼的特殊法器，可以瞬间改变容貌。每一副面具都记录着一个真实人物的容貌和气息。',
    owner: '半月楼弟子'
  },
];

// 上古神器
const divineArtifacts = [
  {
    id: 'lihuo-shenzhu',
    name: '离火神珠',
    grade: '上古神器',
    description: '上古时期的火系至宝，蕴含毁天灭地的火焰之力。据传能焚烧万物，连神魂都无法幸免。使用此珠需献祭眼睛作为代价，使用者将永失光明。',
    sacrifice: '双眼',
    power: '毁灭之火',
    location: '下落不明'
  },
  {
    id: 'lunhui-jing',
    name: '轮回镜',
    grade: '上古神器',
    description: '传说中掌控轮回的神器，能够逆转时光，改变因果。镜中映照的是过去、现在和未来的交织。使用此镜需献祭神魂作为代价，使用者的神魂将永远困在轮回之中。',
    sacrifice: '神魂',
    power: '时光逆转',
    location: '归墟深处？'
  },
];

const Bestiary = () => {
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
            <h1 className="text-2xl font-bold text-primary">志怪图鉴</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 介绍区域 */}
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookMarked className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">修仙百科</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              记录云州世界各类异兽、奇珍、草药、法宝与上古神器的百科图鉴
            </p>
          </div>

          {/* 分类标签页 */}
          <Tabs defaultValue="creatures" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="creatures" className="gap-2">
                <Sparkles className="w-4 h-4" />
                志怪
              </TabsTrigger>
              <TabsTrigger value="treasures" className="gap-2">
                <Flower className="w-4 h-4" />
                奇珍
              </TabsTrigger>
              <TabsTrigger value="herbs" className="gap-2">
                <Pill className="w-4 h-4" />
                草药
              </TabsTrigger>
              <TabsTrigger value="artifacts" className="gap-2">
                <Swords className="w-4 h-4" />
                异宝
              </TabsTrigger>
              <TabsTrigger value="divine" className="gap-2">
                <Zap className="w-4 h-4" />
                神器
              </TabsTrigger>
            </TabsList>

            {/* 志怪 */}
            <TabsContent value="creatures" className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">已知生物</h3>
              {creatures.map((creature) => (
                <Card
                  key={creature.id}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-2xl font-bold mb-2">{creature.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          creature.danger === '极度危险' 
                            ? 'bg-destructive/20 text-destructive' 
                            : creature.danger === '中等'
                            ? 'bg-accent/20 text-accent'
                            : 'bg-primary/20 text-primary'
                        }`}>
                          {creature.danger}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{creature.description}</p>
                    <div className="pt-4 border-t border-border/50">
                      <p className="text-sm text-muted-foreground">
                        栖息地：<span className="text-foreground font-medium">{creature.location}</span>
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* 奇珍 */}
            <TabsContent value="treasures" className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">天材地宝</h3>
              {treasures.map((treasure) => (
                <Card
                  key={treasure.id}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-2xl font-bold mb-2">{treasure.name}</h4>
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                        {treasure.rarity}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{treasure.description}</p>
                    <div className="pt-4 border-t border-border/50">
                      <p className="text-sm text-muted-foreground">
                        产地：<span className="text-foreground font-medium">{treasure.location}</span>
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* 草药 */}
            <TabsContent value="herbs" className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">灵药草木</h3>
              {herbs.map((herb) => (
                <Card
                  key={herb.id}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-2xl font-bold mb-2">{herb.name}</h4>
                      <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                        {herb.effect}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{herb.description}</p>
                    <div className="pt-4 border-t border-border/50">
                      <p className="text-sm text-muted-foreground">
                        产地：<span className="text-foreground font-medium">{herb.location}</span>
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* 异宝 */}
            <TabsContent value="artifacts" className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">法宝兵器</h3>
              {artifacts.map((artifact) => (
                <Card
                  key={artifact.id}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-2xl font-bold mb-2">{artifact.name}</h4>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium">
                            {artifact.type}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                            {artifact.grade}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{artifact.description}</p>
                    <div className="pt-4 border-t border-border/50">
                      <p className="text-sm text-muted-foreground">
                        持有者：<span className="text-foreground font-medium">{artifact.owner}</span>
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* 上古神器 */}
            <TabsContent value="divine" className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">上古神器</h3>
              <Card className="p-6 bg-destructive/10 border-destructive/30 mb-6">
                <p className="text-destructive text-center font-semibold">
                  ⚠️ 警告：上古神器威力极大，使用需付出沉重代价，非特殊情况切勿轻易使用
                </p>
              </Card>
              {divineArtifacts.map((artifact) => (
                <Card
                  key={artifact.id}
                  className="p-8 bg-gradient-to-br from-primary/10 via-card/50 to-accent/10 backdrop-blur-sm border-primary/30 hover:shadow-card transition-all duration-300"
                >
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <Zap className="w-6 h-6 text-primary" />
                        <h4 className="text-3xl font-bold">{artifact.name}</h4>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 text-primary text-sm font-bold">
                        {artifact.grade}
                      </span>
                    </div>
                    <p className="text-foreground leading-relaxed text-lg">{artifact.description}</p>
                    <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-border/50">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">献祭代价</p>
                        <p className="text-destructive font-semibold">{artifact.sacrifice}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">神器之力</p>
                        <p className="text-primary font-semibold">{artifact.power}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">所在位置</p>
                        <p className="text-foreground font-semibold">{artifact.location}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* 评论区 */}
          <CommentSection pageType="sect" pageId="bestiary" />
        </div>
      </main>
    </div>
  );
};

export default Bestiary;
