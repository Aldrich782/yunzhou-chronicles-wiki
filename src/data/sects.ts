export interface Sect {
  id: string;
  name: string;
  region: 'yunhan' | 'rongzhou';
  description: string;
  leader: string;
  location: string;
  rules: string[];
  specialty?: string;
  members?: Character[];
  mountains?: Mountain[]; // 紫霄宗使用
  divisions?: Division[]; // 其他门派使用
  landmarks?: GeographicLandmark[];
}

export interface Division {
  id: string;
  name: string;
  description: string;
  duty: string; // 职能定位
  responsibilities: string[]; // 主要职责
  characterTraits: string; // 弟子特征
  treasureName?: string; // 代表法器名称
  treasureDescription?: string; // 法器描述
  characters: Character[];
}

export interface Character {
  id: string;
  name: string;
  title: string;
  sect: string;
  description: string;
  avatar?: string;
  specialty?: string;
  status?: string;
  quote?: string; // 人物语录
}

export interface Mountain {
  id: string;
  name: string;
  description: string;
  characters: Character[];
}

export interface GeographicLandmark {
  id: string;
  name: string;
  description: string;
  type: 'mountain' | 'river' | 'forest' | 'sea' | 'other';
}

// 云汉门派
export const yunhanSects: Sect[] = [
  {
    id: 'zixiao',
    name: '紫霄宗',
    region: 'yunhan',
    description: '云汉大陆首屈一指的正道大宗，位于云汉最中心。六座山峰各有所长，宗门氛围亲密如家。长老们从小一起长大，关系特别好，互动频繁。',
    leader: '李扶光',
    location: '云汉大陆中央，紫霄山脉',
    specialty: '六山体系，各有所长。护山大阵在100年前被破坏后修复，如今更加牢固。',
    rules: [
      '尊师重道，不得欺师灭祖',
      '同门和睦，不得自相残杀',
      '行侠仗义，维护正道',
      '勤修苦练，不得懈怠',
      '遵守学分制度，完成修炼任务（大长老戴月槐设立）'
    ],
    landmarks: [
      {
        id: 'zixiao-mountains',
        name: '紫霄山脉',
        description: '云汉中央的巍峨山脉，六峰耸立，云雾缭绕，是紫霄宗的根基所在。',
        type: 'mountain'
      },
      {
        id: 'zixiao-forbidden-land',
        name: '禁地阵眼',
        description: '护山大阵的核心所在，100年前被劫雷所破，如今已被修复加固。',
        type: 'other'
      }
    ],
    mountains: [
      {
        id: 'fuguang',
        name: '扶光山',
        description: '紫霄宗主峰，掌门李扶光所在之地。李扶光是正道第一人，最有希望飞升的修士，目前正在闭关。',
        characters: [
          {
            id: 'lifuguang',
            name: '李扶光',
            title: '紫霄宗掌门',
            sect: '紫霄宗·扶光山',
            description: '正道第一人，最有希望飞升的修士。为人跳脱潇洒，极具可靠感。虽然是最小的，但最可靠。上一世在飞升时发现"祂"的真相，灵魂侥幸逃脱，与真正的天道合作，以自身为代价倒转时光，使一切重来，并拉戴月槐进入这个世界，以"系统"身份引导他将司徊拉入正道。称席微为"二师姐"，称戴月槐为"师兄"。',
            specialty: '剑道、综合修为',
            status: '闭关中',
            quote: ''
          },
          {
            id: 'yan-chijin',
            name: '燕池尽',
            title: '扶光山亲传弟子',
            sect: '紫霄宗·扶光山',
            description: '李扶光的亲传弟子，天赋异禀。',
            specialty: '剑道',
            status: '在修',
            quote: ''
          },
          {
            id: 'lin-xianyun',
            name: '林衔云',
            title: '扶光山亲传弟子',
            sect: '紫霄宗·扶光山',
            description: '李扶光的亲传弟子，剑法超群。',
            specialty: '剑道',
            status: '在修',
            quote: ''
          }
        ]
      },
      {
        id: 'changliu',
        name: '长留山',
        description: '紫霄宗第一山，大长老戴月槐所在。以傀儡术和机关术闻名，同时种植大量药草。',
        characters: [
          {
            id: 'daiyuehuai',
            name: '戴月槐',
            title: '紫霄宗大长老',
            sect: '紫霄宗·长留山',
            description: '紫霄宗大长老，擅长傀儡术与机关术。个性看似不靠谱，爱偷懒，实际上会偷偷观察弟子的学习情况。最喜欢种植药草。他设立了严格的修炼制度（学分制），使修仙界形成996勤修苦练的风气。实际上是来自异世界的穿越者，被上一世的李扶光（化身系统）拉入此界，目的是将司徊引向正道，对抗假天道"祂"。',
            specialty: '傀儡术、机关术、种植',
            status: '在任',
            quote: ''
          },
          {
            id: 'ximuxiao',
            name: '席沐逍',
            title: '长留山亲传弟子',
            sect: '紫霄宗·长留山',
            description: '戴月槐的亲传弟子，席微之子，云非堇的遗腹子。被假天道"祂"投放的"天道之书"引诱，成为"祂"的棋子。"祂"意图让他杀死司徊和天道转世袁霄强，使他以更深罪孽飞升，从而让"祂"变得更强。',
            specialty: '机关术',
            status: '在修',
            quote: ''
          },
          {
            id: 'si-hui',
            name: '司徊',
            title: '长留山亲传弟子',
            sect: '紫霄宗·长留山',
            description: '戴月槐的亲传弟子，性格复杂。假天道"祂"故意催生其邪念，意图使其成为罪孽深重的邪修飞升。系统（上一世李扶光）引导戴月槐将他拉入正道。',
            specialty: '傀儡术',
            status: '在修',
            quote: ''
          },
          {
            id: 'yuan-xiaoqiang',
            name: '袁霄强',
            title: '长留山亲传弟子',
            sect: '紫霄宗·长留山',
            description: '戴月槐的亲传弟子，真正天道的转世。假天道"祂"意图通过席沐逍杀死他，以消灭真天道的最后希望。',
            specialty: '机关阵法',
            status: '在修',
            quote: ''
          }
        ]
      },
      {
        id: 'qingluan',
        name: '青鸾山',
        description: '紫霄宗第二山，二长老席微所在。画修圣地，弟子皆为凡间孤苦无依的幼女，因此修炼刻苦，皆是修仙界出类拔萃的女修。',
        characters: [
          {
            id: 'xiwei',
            name: '席微',
            title: '紫霄宗二长老',
            sect: '紫霄宗·青鸾山',
            description: '画修，擅长作画。外表公正严肃，实则非常疼爱弟子，尤其是儿子席沐逍。青鸾山弟子皆为凡间孤苦无依的幼女，在她的教导下成为修仙界出类拔萃的女修。道侣云非堇于100年前战死，她随身携带云非堇留下的小荷包，经常给长留山的弟子们发糖吃。师父是前青鸾长老叶攸。',
            specialty: '画修',
            status: '在任',
            quote: ''
          },
          {
            id: 'yunfeijin',
            name: '云非堇',
            title: '紫霄宗前掌门',
            sect: '紫霄宗·青鸾山',
            description: '上一任掌门唐夷的亲传弟子，席微的丈夫，原本的掌门。一百年前，白骨哀得知前青鸾长老叶攸渡劫失败、席微受重创，趁护山大阵被劫雷所破之际攻上青鸾山。紫霄宗全力前往禁地修复阵眼，云非堇独自迎战，为了保护山中的妻儿和其他弟子，以一己之力敌千人，最后身死道消。',
            specialty: '综合修为',
            status: '已故（100年前）',
            quote: ''
          },
          {
            id: 'yu-shuang',
            name: '鱼霜',
            title: '青鸾山亲传弟子',
            sect: '紫霄宗·青鸾山',
            description: '席微的亲传弟子，画修天才。',
            specialty: '画修',
            status: '在修',
            quote: ''
          }
        ]
      },
      {
        id: 'mingyue',
        name: '明月山',
        description: '紫霄宗第三山，三长老江晚霁所在。音修圣地，以琴音术法闻名。',
        characters: [
          {
            id: 'jiangwanji',
            name: '江晚霁',
            title: '紫霄宗三长老',
            sect: '紫霄宗·明月山',
            description: '音修，极其宠爱女儿江揽月。',
            specialty: '音律修行',
            status: '在任',
            quote: ''
          },
          {
            id: 'jianglanyue',
            name: '江揽月',
            title: '明月山亲传弟子',
            sect: '紫霄宗·明月山',
            description: '江晚霁之女，天赋极高的音修，深受父亲宠爱。',
            specialty: '音律',
            status: '在修',
            quote: ''
          },
          {
            id: 'lin-lu',
            name: '林陆',
            title: '明月山亲传弟子',
            sect: '紫霄宗·明月山',
            description: '江晚霁的亲传弟子，音律天才。',
            specialty: '音律',
            status: '在修',
            quote: ''
          }
        ]
      },
      {
        id: 'zhuyu',
        name: '祝余峰',
        description: '紫霄宗第四山，四长老席空青所在。医修圣地，救死扶伤。',
        characters: [
          {
            id: 'xikongqing',
            name: '席空青',
            title: '紫霄宗四长老·医圣',
            sect: '紫霄宗·祝余峰',
            description: '医修，人称"医圣"，席微的亲弟弟。事务繁忙，惜字如金，常年忙于医治伤患。',
            specialty: '医术',
            status: '在任',
            quote: ''
          },
          {
            id: 'li-you',
            name: '李游',
            title: '祝余峰亲传弟子',
            sect: '紫霄宗·祝余峰',
            description: '席空青的亲传弟子，医术精湛。',
            specialty: '医修',
            status: '在修',
            quote: ''
          }
        ]
      },
      {
        id: 'baoyuan',
        name: '抱元峰',
        description: '紫霄宗第五山，五长老楚元真所在。器修圣地，炼制法宝灵器。',
        characters: [
          {
            id: 'chuyuanzhen',
            name: '楚元真',
            title: '紫霄宗五长老',
            sect: '紫霄宗·抱元峰',
            description: '器修，性格忙碌但爱看热闹，常常炼器时也不忘关注宗门八卦。',
            specialty: '炼器',
            status: '在任',
            quote: ''
          },
          {
            id: 'chi-xiao',
            name: '池宵',
            title: '抱元峰亲传弟子',
            sect: '紫霄宗·抱元峰',
            description: '楚元真的亲传弟子，炼器天才。',
            specialty: '器修',
            status: '在修',
            quote: ''
          }
        ]
      }
    ]
  },
  {
    id: 'shanhaixuan',
    name: '山海轩',
    region: 'yunhan',
    description: '位于云汉北部北溟，此地潮湿多雨，蛟人出没。山海轩守护着北溟的土地，能抵御蛟人的歌声。掌管云汉通往归墟的水路，其纯净的灵魂可召唤鲲鹏带路。',
    leader: '纪云山',
    location: '云汉大陆北部·北溟',
    specialty: '魂梦之术，特色武器梦铃，能感知灵魂波动，使用铃铛操控梦境。山海轩弟子灵魂纯净，可与鲲鹏沟通。',
    rules: [
      '守护北溟，抵御蛟人',
      '传承魂梦之术',
      '护送亡魂前往归墟',
      '保持灵魂纯净'
    ],
    divisions: [
      {
        id: 'tingchao',
        name: '听潮阁',
        description: '门主纪云山所在之地，对外作战与防御核心。类似于紫霄宗的扶光山与长留山的结合体，是山海轩最强的武装力量和行政中枢。',
        duty: '对外作战与防御核心',
        responsibilities: [
          '镇守海疆：负责北溟海岸线的日常巡防，正面抵御和击退来犯的蛟人及海中妖兽',
          '战术魂术：弟子主修更具攻击性和防御性的魂梦之术，如制造群体幻境结界、以魂力冲击震慑敌人心神',
          '门派管理：处理山海轩的日常事务、弟子调度以及与外界其他宗门的联络'
        ],
        characterTraits: '听潮阁弟子作风务实、坚毅，实战经验丰富。他们的眼神总是带着警惕，因为长期聆听潮声与蛟人的歌唱，他们的听觉异常敏锐，心志也极为坚定。',
        treasureName: '镇海螺',
        treasureDescription: '由特殊的海兽骨骼制成，吹响时能发出扰乱心神的次声波，大规模干扰蛟人的歌声攻击。',
        characters: [
          {
            id: 'jiyunshan',
            name: '纪云山',
            title: '山海轩掌门·听潮阁阁主',
            sect: '山海轩·听潮阁',
            description: '山海轩掌门，守护北溟水路的领袖。性格沉稳睿智，深谙魂梦之术，能够与鲲鹏沟通，引导亡魂前往归墟。',
            specialty: '魂梦之术、鲲鹏沟通',
            status: '在任',
            quote: ''
          }
        ]
      },
      {
        id: 'rumengtai',
        name: '入梦台',
        description: '副门主贺明朝所在之地，魂梦研究与疗愈中心。此地是山海轩魂梦之术的根基与知识宝库，氛围最为宁静与神秘。',
        duty: '魂梦研究与疗愈中心',
        responsibilities: [
          '魂术研习：钻研和传承最高深、最古老的魂梦秘法，包括进入他人深层梦境、追溯灵魂记忆、修补受损识海等',
          '弟子疗愈：为在与蛟人战斗中识海受损的同门提供治疗和安抚',
          '情报破译：通过捕获的蛟人或特殊梦境，解析其意图和弱点，为听潮阁提供情报支持'
        ],
        characterTraits: '入梦台的弟子气质空灵，不喜言语，更善于通过灵魂波动进行交流。他们对梦境的理解远超常人，但也因此，部分弟子在现实与梦境的边界上显得有些模糊。',
        treasureName: '引梦灯',
        treasureDescription: '一种可以稳定梦境通道，引导施术者安全进入目标梦境的灵灯，灯芯燃烧的是安神定魂的特殊香料。',
        characters: [
          {
            id: 'hemingchao',
            name: '贺明朝',
            title: '山海轩副门主·入梦台台主',
            sect: '山海轩·入梦台',
            description: '入梦台台主，精通魂梦秘法。性格沉静，常年沉浸在梦境研究中，对灵魂和梦境有着独到的见解。',
            specialty: '魂梦秘法、灵魂修复',
            status: '在任',
            quote: ''
          },
          {
            id: 'luyunzhao',
            name: '陆云昭',
            title: '入梦台弟子',
            sect: '山海轩·入梦台',
            description: '性格沉稳可靠。擅长魂梦之术，能够感知灵魂波动，是山海轩年轻一代的佼佼者。',
            specialty: '魂梦之术',
            status: '在修',
            quote: ''
          }
        ]
      },
      {
        id: 'guanxinglou',
        name: '观星楼',
        description: '越溪春所在之地，信息预警与后勤枢纽。他们是山海轩的"天眼"和"工坊"，负责预知风险和提供装备支持。',
        duty: '信息预警与后勤枢纽',
        responsibilities: [
          '星象占卜：通过观察北溟上空的星辰轨迹，预测风暴、海啸的到来，以及蛟人族群的大规模活动周期',
          '法器锻造：门派核心法器"梦铃"的唯一制造与改良场所。研究如何将星辰之力与魂力更好地结合，提升梦铃的效能',
          '资源管理：负责门派的资源采集与分配，确保听潮阁的战备与入梦台的研究都能顺利进行'
        ],
        characterTraits: '观星楼的弟子兼具修士的灵性与工匠的严谨。他们对数字和阵法极为敏感，常常昼伏夜出，在星光最盛之时进行工作。',
        treasureName: '梦铃',
        treasureDescription: '山海轩弟子的标配法器，由观星楼统一制作。摇动时能发出清心凝神的音波，抵御心神侵扰，同时也是施展魂梦之术的重要媒介。',
        characters: [
          {
            id: 'yuexichun',
            name: '越溪春',
            title: '观星楼楼主',
            sect: '山海轩·观星楼',
            description: '观星楼楼主，精通星象和阵法。性格严谨细致，对法器锻造有着极高的要求。',
            specialty: '星象占卜、法器锻造',
            status: '在任',
            quote: ''
          },
          {
            id: 'luyunyao',
            name: '陆云遥',
            title: '观星楼弟子',
            sect: '山海轩·观星楼',
            description: '性格跳脱活泼，与师兄陆云昭形成鲜明对比。虽然性格活泼，但在魂梦之术上天赋异禀。',
            specialty: '魂梦之术、梦铃操控',
            status: '在修',
            quote: ''
          }
        ]
      }
    ],
    landmarks: [
      {
        id: 'beiming-sea',
        name: '北溟之海',
        description: '云汉北部的广袤海域，常年云雾缭绕，海中栖息着神秘的鲲鹏和危险的蛟人。',
        type: 'sea'
      },
      {
        id: 'hunlin-forest',
        name: '魂林',
        description: '山海轩的神圣之地。每个弟子死亡后，魂魄归于魂林，与鲲鹏一起往生，等待下一次重生。林中树木皆为魂树，散发着淡淡的荧光。',
        type: 'forest'
      },
      {
        id: 'guixu-path',
        name: '归墟水路',
        description: '通往归墟的神秘水道，只有灵魂纯净的山海轩弟子能够安全通过，并引导鲲鹏护送亡魂。',
        type: 'river'
      }
    ]
  },
  {
    id: 'banyuelou',
    name: '半月楼',
    region: 'yunhan',
    description: '以情报收集和暗杀闻名的神秘宗门。半月楼弟子行踪隐秘，遍布修仙界各处，掌握着无数秘密。楼中分为明暗两部，明部经营商业情报，暗部则执行暗杀任务。',
    leader: '未知',
    location: '云汉大陆南部·流影谷',
    specialty: '情报网络、暗杀术、易容术、追踪术',
    rules: [
      '情报至上，保密为先',
      '任务必达，不问缘由',
      '楼主身份永为秘密',
      '叛楼者，死'
    ],
    divisions: [
      {
        id: 'mingbu',
        name: '明部',
        description: '半月楼的商业情报部门，对外经营各类消息买卖，是修仙界最大的情报交易市场。',
        duty: '情报收集与交易中心',
        responsibilities: [
          '情报收集：在修仙界各地布置眼线，收集各类消息',
          '情报交易：为客户提供所需情报，明码标价',
          '商业往来：与各大宗门保持良好关系，维护半月楼的合法形象'
        ],
        characterTraits: '明部弟子善于交际，能言善辩，在修仙界中游刃有余。他们往往以商人身份示人，但实则个个都是情报高手。',
        treasureName: '千里传音符',
        treasureDescription: '特制的传音符，可跨越千里传递情报，且不会被他人截获。',
        characters: [
          {
            id: 'liuqianmian',
            name: '柳千面',
            title: '半月楼明部长老',
            sect: '半月楼·明部',
            description: '明部长老，掌管情报网络。擅长易容和伪装，能在一瞬间变换容貌。',
            specialty: '易容术、情报收集',
            status: '在任',
            quote: ''
          }
        ]
      },
      {
        id: 'anbu',
        name: '暗部',
        description: '半月楼的暗杀部门，专门执行各类暗杀任务。暗部弟子行踪诡秘，出手必杀。',
        duty: '暗杀与特殊任务执行',
        responsibilities: [
          '暗杀任务：接受委托，执行暗杀',
          '特殊行动：处理一些见不得光的任务',
          '清理叛徒：追杀背叛半月楼的弟子'
        ],
        characterTraits: '暗部弟子冷酷无情，杀人不眨眼。他们常年生活在黑暗中，对杀戮有着病态的执着。',
        treasureName: '影刃',
        treasureDescription: '暗部专用的刺杀武器，刀身漆黑，能隐匿气息，一击致命。',
        characters: [
          {
            id: 'yingwuming',
            name: '影无名',
            title: '半月楼暗部首领',
            sect: '半月楼·暗部',
            description: '半月楼暗部首领，真实身份成谜。擅长暗杀和易容，据说从未有人见过他的真面目。',
            specialty: '暗杀术、易容术',
            status: '在任',
            quote: ''
          },
          {
            id: 'yunying',
            name: '云影',
            title: '暗部弟子',
            sect: '半月楼·暗部',
            description: '半月楼年轻一代的天才，暗杀技巧高超，追踪能力一流。',
            specialty: '暗杀术、追踪术',
            status: '在修',
            quote: ''
          }
        ]
      }
    ],
    landmarks: [
      {
        id: 'liuying-valley',
        name: '流影谷',
        description: '半月楼总部所在，山谷中常年云雾缭绕，外人难以寻觅。谷中建筑错落有致，暗藏玄机。',
        type: 'other'
      },
      {
        id: 'qianmian-tower',
        name: '千面阁',
        description: '半月楼训练易容术的地方，藏有千百副面具，每一副都来自真实的人物。',
        type: 'other'
      }
    ]
  },
  {
    id: 'shuiyundongtian',
    name: '水云洞天',
    region: 'yunhan',
    description: '隐世宗门，位于云汉西部的水域深处。擅长水系法术和医术，尤其精通用水疗伤。宗门建于水下洞天之中，与世隔绝，弟子性格温和淡泊。',
    leader: '迦陵',
    location: '云汉大陆西部·沧澜水域',
    specialty: '水系法术、水疗医术、炼水成兵',
    rules: [
      '与世无争，潜心修行',
      '医者仁心，救死扶伤',
      '不轻易入世，除非天下大乱'
    ],
    divisions: [
      {
        id: 'bibo',
        name: '碧波殿',
        description: '迦陵所在之地，水云洞天的核心。主修水系攻击法术和炼水成兵之术。',
        duty: '战斗力量与宗门守护',
        responsibilities: [
          '水系攻击：研习水系攻击法术，是水云洞天的武力担当',
          '炼水成兵：将水凝练成各种武器，攻守兼备',
          '洞天守护：保护水云洞天不被外敌侵扰'
        ],
        characterTraits: '碧波殿弟子性格如水，看似柔和实则刚强。他们能在瞬间切换战斗状态，水系法术运用得出神入化。',
        treasureName: '沧海珠',
        treasureDescription: '凝聚了大海精华的宝珠，能操控大范围水域，形成强大的水系攻击。',
        characters: [
          {
            id: 'jialing',
            name: '迦陵',
            title: '水云洞天掌门·碧波殿殿主',
            sect: '水云洞天·碧波殿',
            description: '水云洞天掌门，精通水系法术和医术。性格如水般温柔，但在大是大非面前坚如磐石。',
            specialty: '水系法术、水疗医术',
            status: '在任',
            quote: ''
          },
          {
            id: 'shuiyue',
            name: '水月',
            title: '碧波殿长老',
            sect: '水云洞天·碧波殿',
            description: '迦陵的师姐，擅长水系攻击法术。性格温和但战斗时凌厉无比。',
            specialty: '水系攻击、炼水成兵',
            status: '在任',
            quote: ''
          }
        ]
      },
      {
        id: 'qingquan',
        name: '清泉阁',
        description: '水云洞天的医疗中心，专注于水疗医术的研究和实践。',
        duty: '医疗救治与疗愈',
        responsibilities: [
          '水疗医术：利用水的特性疗伤治病，效果显著',
          '炼制灵药：用水域中的灵材炼制各种疗伤丹药',
          '救死扶伤：为修仙界受伤的修士提供治疗'
        ],
        characterTraits: '清泉阁弟子性格温和善良，医者仁心。他们对水的理解极深，能用水治愈各种疑难杂症。',
        treasureName: '甘霖瓶',
        treasureDescription: '能凝聚天地灵气和水气，制造出具有疗愈效果的甘霖之水。',
        characters: [
          {
            id: 'bingxin',
            name: '冰心',
            title: '清泉阁弟子',
            sect: '水云洞天·清泉阁',
            description: '水云洞天年轻弟子，天赋异禀，尤其擅长冰系法术和水疗。',
            specialty: '冰系法术、水疗医术',
            status: '在修',
            quote: ''
          }
        ]
      }
    ],
    landmarks: [
      {
        id: 'canglang-waters',
        name: '沧澜水域',
        description: '云汉西部的辽阔水域，水质清澈见底，据说饮用此水可延年益寿。水云洞天就隐藏在水域深处。',
        type: 'sea'
      },
      {
        id: 'shuijing-palace',
        name: '水晶宫',
        description: '水云洞天的核心建筑，由水晶构成，在水下散发着柔和的光芒。宫中有无数水系法术的典籍。',
        type: 'other'
      }
    ]
  },
  {
    id: 'tianyinsi',
    name: '天音寺',
    region: 'yunhan',
    description: '佛门宗派，以音律和禅修闻名。天音寺僧人以佛法普度众生，用音律净化心灵。寺中晨钟暮鼓，梵音不绝，是修仙界著名的清修之地。',
    leader: '怀空大师',
    location: '云汉大陆北部·天音山',
    specialty: '佛门音律、禅修、梵音攻击',
    rules: [
      '慈悲为怀，普度众生',
      '晨钟暮鼓，不得懈怠',
      '戒杀生，除恶魔',
      '六根清净，心无旁骛'
    ],
    divisions: [
      {
        id: 'daxiong',
        name: '大雄宝殿',
        description: '怀空大师所在，天音寺的核心。主修佛法禅修和音律之道。',
        duty: '佛法传承与禅修中心',
        responsibilities: [
          '佛法传承：传授佛门心法和音律之术',
          '禅修指导：指导弟子禅修，提升心境',
          '普度众生：为迷失的生灵指引方向'
        ],
        characterTraits: '大雄宝殿僧人佛法精深，心境平和。他们能用梵音度化人心，也能识破心魔。',
        treasureName: '禅杖',
        treasureDescription: '天音寺传承的法器，杖身刻有佛经，能发出安神的梵音。',
        characters: [
          {
            id: 'huaikong',
            name: '怀空大师',
            title: '天音寺主持',
            sect: '天音寺·大雄宝殿',
            description: '天音寺主持，佛法高深，音律造诣极高。能以梵音度化人心，也能以音律降妖除魔。',
            specialty: '佛门音律、禅修',
            status: '在任',
            quote: ''
          },
          {
            id: 'kongxuan',
            name: '空玄',
            title: '大雄宝殿弟子',
            sect: '天音寺·大雄宝殿',
            description: '天音寺年轻一代的佼佼者，虽年轻但佛法精深，音律造诣极高。',
            specialty: '佛门音律',
            status: '在修',
            quote: ''
          }
        ]
      },
      {
        id: 'luohan',
        name: '罗汉堂',
        description: '天音寺的武力部门，慧静首座所在。负责降妖除魔，保护佛门清净。',
        duty: '降妖除魔与寺院守护',
        responsibilities: [
          '降妖除魔：用梵音攻击降服妖魔',
          '护寺守山：保护天音寺不受侵扰',
          '行走人间：除恶扬善，维护正道'
        ],
        characterTraits: '罗汉堂僧人武力高强，虽修佛法但不乏战斗经验。他们能在瞬间从禅修状态切换到战斗状态。',
        treasureName: '降魔杵',
        treasureDescription: '专门用于降妖除魔的法器，杵身金光闪闪，能发出震慑妖魔的梵音。',
        characters: [
          {
            id: 'huijing',
            name: '慧静',
            title: '天音寺首座·罗汉堂首座',
            sect: '天音寺·罗汉堂',
            description: '天音寺首座，怀空大师的师弟。精通禅修和梵音攻击，是天音寺的武力担当。',
            specialty: '梵音攻击、禅修',
            status: '在任',
            quote: ''
          }
        ]
      }
    ],
    landmarks: [
      {
        id: 'tianyin-mountain',
        name: '天音山',
        description: '云汉北部的圣山，山上常年梵音缭绕，据说能净化心灵。天音寺就坐落在山顶。',
        type: 'mountain'
      },
      {
        id: 'daxiong-hall',
        name: '大雄宝殿',
        description: '天音寺的主殿，供奉着佛祖金身。殿中钟声悠扬，能让人心神宁静。',
        type: 'other'
      }
    ]
  },
  {
    id: 'chaoyunguo',
    name: '朝云国',
    region: 'yunhan',
    description: '云汉大陆上的神秘国度，外人不可进入。国内每天都在上演狗血言情戏码，爱恨情仇多到飞天，诡异到正经修士会绕着走。据说进入朝云国的修士，都会被卷入莫名其妙的情劫之中。',
    leader: '朝云君',
    location: '云汉大陆东南部·迷雾之境',
    specialty: '情丝术、心魔引诱、情劫布阵',
    rules: [
      '外人禁入，擅入者困于情劫',
      '国中之事，不得外传',
      '爱恨随心，生死由命'
    ],
    members: [
      {
        id: 'chaoyunjun',
        name: '朝云君',
        title: '朝云国国主',
        sect: '朝云国',
        description: '朝云国的神秘国主，容貌绝美，性别不明。擅长操控情丝，让人陷入情劫。据说朝云君本身就是一场未完的情劫化形而成。',
        specialty: '情丝术、情劫布阵',
        status: '在位',
        quote: ''
      }
    ],
    landmarks: [
      {
        id: 'miwu-realm',
        name: '迷雾之境',
        description: '朝云国外围的迷雾区域，常年笼罩在粉色雾气中。外人一旦进入，就会迷失方向，陷入情劫幻境。',
        type: 'other'
      },
      {
        id: 'qingjie-palace',
        name: '情劫宫',
        description: '朝云国的核心建筑，宫中每日上演着各种爱恨情仇的戏码。据说进入此宫的人，都会看到自己最不愿面对的情劫。',
        type: 'other'
      }
    ]
  }
];

// 戎州门派
export const rongzhouSects: Sect[] = [
  {
    id: 'changshengmen',
    name: '长生门',
    region: 'rongzhou',
    description: '戎州大陆顶尖剑修宗门，坚持最传统的剑修之道，崇尚个人剑道巅峰。长生门弟子剑意凌厉，以剑入道，追求剑道长生。',
    leader: '云负月',
    location: '戎州大陆中部·长生剑山',
    specialty: '传统剑修、剑意修炼、御剑飞行',
    rules: [
      '追求剑道极致',
      '以剑入道',
      '剑心通明，不染尘埃',
      '生死看淡，一剑破之'
    ],
    divisions: [
      {
        id: 'zhujiange',
        name: '铸剑阁',
        description: '长生门的剑器锻造中心，负责锻造和修复各类神剑。',
        duty: '剑器锻造与养护',
        responsibilities: [
          '铸造神剑：为门派弟子锻造本命之剑',
          '剑器养护：维护和修复损坏的神剑',
          '研究剑道：研究剑器与剑道的结合之道'
        ],
        characterTraits: '铸剑阁弟子对剑有着狂热的热爱，能听懂剑的声音。他们既是铸剑师，也是剑修。',
        treasureName: '铸剑炉',
        treasureDescription: '长生门传承的神炉，能融炼天材地宝，铸造绝世神剑。',
        characters: [
          {
            id: 'zhujian-elder',
            name: '铸剑长老',
            title: '铸剑阁阁主',
            sect: '长生门·铸剑阁',
            description: '长生门资深长老，铸剑大师。一生铸剑无数，门派大部分神剑都出自他手。',
            specialty: '铸剑、剑道',
            status: '在任',
            quote: ''
          }
        ]
      },
      {
        id: 'wujian',
        name: '悟剑峰',
        description: '云负月所在，长生门的核心。主修剑道和剑意，是长生门最强剑修聚集地。',
        duty: '剑道传承与修炼',
        responsibilities: [
          '剑道传承：传授长生门剑道心法',
          '剑意修炼：指导弟子领悟剑意',
          '以剑入道：追求剑道的至高境界'
        ],
        characterTraits: '悟剑峰剑修剑心通明，剑意凌厉。他们将剑视为生命，能与剑心意相通。',
        treasureName: '长生剑',
        treasureDescription: '长生门传承之剑，蕴含无上剑意，只有掌门才能执掌。',
        characters: [
          {
            id: 'yunfuyue',
            name: '云负月',
            title: '长生门掌门·悟剑峰峰主',
            sect: '长生门·悟剑峰',
            description: '长生门掌门，剑道修为深不可测。性格冷峻，剑意如月光般清冷锐利。',
            specialty: '剑道、剑意',
            status: '在任',
            quote: ''
          },
          {
            id: 'sifuwei',
            name: '司抚危',
            title: '悟剑峰亲传弟子',
            sect: '长生门·悟剑峰',
            description: '云负月的亲传弟子，天赋极高的剑修。剑法凌厉，深得掌门真传。',
            specialty: '剑道',
            status: '在修',
            quote: ''
          }
        ]
      },
      {
        id: 'jianchi',
        name: '剑池',
        description: '长生门的试炼之地，也是剑修悟道的圣地。',
        duty: '剑道试炼与悟道',
        responsibilities: [
          '试炼弟子：通过剑池试炼考验弟子',
          '剑道悟道：在剑气中感悟剑道真谛',
          '收集神剑：池中藏有历代前辈遗留的神剑'
        ],
        characterTraits: '能通过剑池试炼的都是天才剑修，他们在剑气的洗礼下剑心更加坚定。',
        treasureName: '剑池剑气',
        treasureDescription: '剑池中无数神剑散发的剑气凝聚而成，能淬炼剑心，提升剑道境界。',
        characters: []
      }
    ],
    landmarks: [
      {
        id: 'changsheng-mountain',
        name: '长生剑山',
        description: '戎州中部的险峻山脉，山体如剑般直插云霄。山中剑气纵横，是剑修的圣地。',
        type: 'mountain'
      },
      {
        id: 'jianchi-cliff',
        name: '剑池崖',
        description: '长生门的练剑圣地，崖下深渊中有无数前辈遗留的神剑，剑气冲天。',
        type: 'other'
      }
    ]
  },
  {
    id: 'wenqinxiangong',
    name: '问琴仙宫',
    region: 'rongzhou',
    description: '擅长通过琴音疗伤、驱邪、甚至影响战局。以琴音治疗和辅助术法闻名。宫中有林荀两家，自从一百年前林家掌握了修复神魂的办法，成了问琴仙宫掌握实权的家族。',
    leader: '林家家主',
    location: '戎州大陆东部·问琴峰',
    specialty: '琴音疗愈、辅助术法、神魂修复',
    rules: [
      '以琴入道',
      '医者仁心',
      '琴心不乱，则天下不乱',
      '神魂之术，不可外传'
    ],
    divisions: [
      {
        id: 'linfeng',
        name: '林家府',
        description: '林家家主所在，问琴仙宫的实权中心。掌握神魂修复秘术。',
        duty: '神魂修复与宫务管理',
        responsibilities: [
          '神魂修复：为识海受损的修士修复神魂',
          '宫务管理：掌管仙宫日常事务',
          '秘术传承：传承林家神魂修复之术'
        ],
        characterTraits: '林家弟子天赋异禀，精通神魂之术。他们性格温和但在家族利益面前寸步不让。',
        treasureName: '养魂琴',
        treasureDescription: '林家传承的神琴，琴音能安抚和修复受损的神魂。',
        characters: [
          {
            id: 'linjia-master',
            name: '林家家主',
            title: '问琴仙宫宫主·林家家主',
            sect: '问琴仙宫·林家府',
            description: '问琴仙宫现任宫主，林家家主。自从林家掌握了神魂修复之术，林家便在仙宫中占据主导地位。',
            specialty: '琴音疗愈、神魂修复',
            status: '在任',
            quote: ''
          },
          {
            id: 'linqingyin',
            name: '林清音',
            title: '林家长老',
            sect: '问琴仙宫·林家府',
            description: '林家长老，精通神魂修复术。性格温柔，医者仁心，但在家族利益面前毫不退让。',
            specialty: '神魂修复、琴音疗愈',
            status: '在任',
            quote: ''
          },
          {
            id: 'linmoyun',
            name: '林墨云',
            title: '林家弟子',
            sect: '问琴仙宫·林家府',
            description: '林家年轻一代的天才，天赋异禀，深得林家家主器重。',
            specialty: '琴音疗愈',
            status: '在修',
            quote: ''
          }
        ]
      },
      {
        id: 'xunfeng',
        name: '荀家府',
        description: '荀家所在，虽地位不如林家，但在琴艺上有独到之处。',
        duty: '琴音攻击与辅助',
        responsibilities: [
          '琴音攻击：研习琴音的攻击之法',
          '辅助术法：用琴音辅助战斗',
          '琴艺传承：传承荀家琴道'
        ],
        characterTraits: '荀家弟子琴艺高超，尤其擅长琴音攻击。他们对林家的地位不甘，时刻想要证明自己。',
        treasureName: '鸣弦琴',
        treasureDescription: '荀家传承的战琴，琴音凌厉，能化作音波攻击敌人。',
        characters: [
          {
            id: 'xunhuaiyue',
            name: '荀怀月',
            title: '荀家长老',
            sect: '问琴仙宫·荀家府',
            description: '荀家长老，虽然荀家在宫中地位不如林家，但荀怀月的琴艺在仙宫中首屈一指。',
            specialty: '琴音攻击、辅助术法',
            status: '在任',
            quote: ''
          }
        ]
      },
      {
        id: 'hunxiu',
        name: '魂修殿',
        description: '林家掌控的神魂修复圣地，外人不得入内。',
        duty: '神魂修复秘术研究',
        responsibilities: [
          '研究神魂：深入研究神魂修复之法',
          '秘术保密：确保神魂修复术不外泄',
          '治疗重症：治疗识海严重受损的修士'
        ],
        characterTraits: '能进入魂修殿的都是林家核心弟子，他们对神魂的理解达到了极高境界。',
        treasureName: '魂灯',
        treasureDescription: '能照亮神魂深处的灵灯，是神魂修复的关键法器。',
        characters: []
      }
    ],
    landmarks: [
      {
        id: 'wenqin-peak',
        name: '问琴峰',
        description: '戎州东部的秀美山峰，常年琴音缭绕。峰上建有问琴仙宫，是琴修的圣地。',
        type: 'mountain'
      },
      {
        id: 'linxun-pavilion',
        name: '林荀双阁',
        description: '问琴仙宫中林荀两家的府邸，虽同在一宫，但两家暗中较劲已久。',
        type: 'other'
      },
      {
        id: 'hunxiu-hall',
        name: '魂修殿',
        description: '林家掌握的神魂修复圣地，殿中藏有神魂修复的秘法，外人不得入内。',
        type: 'other'
      }
    ]
  },
  {
    id: 'baiguai',
    name: '白骨哀',
    region: 'rongzhou',
    description: '魔修聚集地，行事乖张，是正道的主要对立面。100年前曾趁紫霄宗护山大阵被破之际攻上青鸾山，导致云非堇战死。如今白骨哀在酆都建立了根据地，势力日渐壮大。',
    leader: '谢檀远',
    location: '戎州北部·昆仑地区·酆都',
    specialty: '魔修功法、白骨术、血祭之法',
    rules: [
      '弱肉强食',
      '实力为尊',
      '不择手段，达成目的',
      '背叛者，挫骨扬灰'
    ],
    members: [
      {
        id: 'xietanyuan',
        name: '谢檀远',
        title: '白骨哀首领',
        sect: '白骨哀',
        description: '白骨哀现任首领，魔功深厚，手段残忍。在酆都建立了魔修根据地，野心勃勃。',
        specialty: '魔修功法、白骨术',
        status: '在位',
        quote: ''
      },
      {
        id: 'qingyi',
        name: '青遗',
        title: '白骨哀前首领',
        sect: '白骨哀',
        description: '白骨哀前任首领，曾率领白骨哀攻上紫霄宗青鸾山。后不知所踪，传闻已死，但也有人说他只是隐退。',
        specialty: '魔修功法',
        status: '下落不明',
        quote: ''
      }
    ],
    landmarks: [
      {
        id: 'fengdu-city',
        name: '酆都',
        description: '戎州北部的魔城，原城主应无昼已逝。如今酆都成为无人管辖之地，魔族聚集，白骨哀在此建立了根据地，成为白骨哀的一言堂。',
        type: 'other'
      },
      {
        id: 'baigu-hall',
        name: '白骨殿',
        description: '白骨哀的总部，殿中白骨累累，阴气森森，是魔修修炼的场所。',
        type: 'other'
      }
    ]
  },
  {
    id: 'jixiangzong',
    name: '禨祥宗',
    region: 'rongzhou',
    description: '位于昆仑最北，传达天道启示的宗门。实则已被假天道"祂"的化身"柳玄之"渗透，可能影响整个修仙界的走向。归墟就位于禨祥宗旁边。',
    leader: '柳玄之',
    location: '戎州北部昆仑地区·归墟旁',
    specialty: '传达天道启示（实为假天道代言）、占卜预言、天机推演',
    rules: [
      '奉天道旨意',
      '传达启示',
      '顺天者昌，逆天者亡',
      '天机不可泄露'
    ],
    members: [
      {
        id: 'liuxuanzhi',
        name: '柳玄之',
        title: '禨祥宗宗主',
        sect: '禨祥宗',
        description: '实为假天道"祂"创造的虚假躯壳，伪装成天道启示的使者，暗中观察事态发展，试图消灭系统和旧天道势力。',
        specialty: '天道化身',
        status: '假天道代言人',
        quote: ''
      }
    ],
    landmarks: [
      {
        id: 'guixu',
        name: '归墟',
        description: '位于昆仑最北的神秘之地，据说是万物的终点和起点。归墟旁边就是禨祥宗，两者关系微妙。',
        type: 'other'
      },
      {
        id: 'tianji-tower',
        name: '天机楼',
        description: '禨祥宗的核心建筑，楼中可观天象，测天机，传达天道启示。实则是假天道"祂"监视修仙界的眼睛。',
        type: 'other'
      },
      {
        id: 'buzhou-pillar',
        name: '不周天柱',
        description: '戎州著名的地理奇观，据说是魔气和灵气的共同发源地。天柱高耸入云，柱身有黑白两色交织，代表魔气与灵气的平衡。',
        type: 'mountain'
      }
    ]
  },
  {
    id: 'fengdu',
    name: '酆都',
    region: 'rongzhou',
    description: '原为戎州北部的重要城池，城主应无昼已逝。如今酆都已成无人管辖之地，魔族聚集，成为白骨哀的根据地和一言堂。城中阴气森森，常人不敢靠近。',
    leader: '应无昼（已逝）',
    location: '戎州北部·昆仑地区',
    specialty: '无（已成魔修聚集地）',
    rules: [
      '无规则，弱肉强食',
      '白骨哀说了算'
    ],
    members: [
      {
        id: 'yingwuzhou',
        name: '应无昼',
        title: '酆都城主',
        sect: '酆都',
        description: '酆都前任城主，生前实力强大，维持着酆都的秩序。如今已逝，酆都失去了管理，成为魔修的乐园。',
        specialty: '综合修为',
        status: '已故',
        quote: ''
      }
    ],
    landmarks: [
      {
        id: 'fengdu-main',
        name: '酆都城',
        description: '戎州北部的魔城，原本是繁荣的城池，现在已成魔修聚集地。城中建筑破败，阴风阵阵。',
        type: 'other'
      }
    ]
  }
];

// 重要人物（不属于特定门派或跨门派）
export const importantCharacters: Character[] = [
  {
    id: 'sihui',
    name: '司徊',
    title: '魔子',
    sect: '无门派',
    description: '魔族血统，天赋异禀。假天道"祂"故意催生他的邪念，意图使其成为罪孽深重的邪修飞升，从而让"祂"变得更强大。但在戴月槐（系统）的引导下，有可能被拉入正道，改变命运。',
    specialty: '魔族天赋',
    status: '关键变数',
    quote: ''
  },
  {
    id: 'yuanxiaoqiang',
    name: '袁霄强',
    title: '天道转世',
    sect: '无门派',
    description: '真正天道的转世，拥有特殊的气运。假天道"祂"试图通过引诱席沐逍杀死他，以达到消灭旧天道残余力量的目的。',
    specialty: '天道气运',
    status: '天道转世',
    quote: ''
  },
  {
    id: 'liuxuanzhi',
    name: '柳玄之',
    title: '禨祥宗宗主',
    sect: '禨祥宗',
    description: '实为假天道"祂"创造的虚假躯壳，伪装成天道启示的使者，暗中观察事态发展，试图消灭系统和旧天道势力。',
    specialty: '天道化身',
    status: '假天道代言人',
    quote: ''
  }
];

// 上一代长老（已退位或故去）
export const formerElders: Character[] = [
  {
    id: 'luhuan',
    name: '陆涣',
    title: '紫霄宗前大长老',
    sect: '紫霄宗·长留山',
    description: '戴月槐的师父，会追着不听话的弟子抽屁股的老头。性格严厉但关心弟子。',
    specialty: '傀儡术、机关术',
    status: '已退位',
    quote: ''
  },
  {
    id: 'tangyi',
    name: '唐夷',
    title: '紫霄宗前掌门',
    sect: '紫霄宗·扶光山',
    description: '笑眯眯的慈祥和事佬，云非堇的师父。在位时将掌门之位传给云非堇。',
    specialty: '综合修为',
    status: '已退位',
    quote: ''
  },
  {
    id: 'yeyou',
    name: '叶攸',
    title: '紫霄宗前青鸾长老',
    sect: '紫霄宗·青鸾山',
    description: '席微的师父，温柔的女修。曾试图渡劫飞升但失败，在劫雷下受损，导致护山大阵被破，间接引发了100年前的白骨哀攻山事件。',
    specialty: '画修',
    status: '已故（渡劫失败）',
    quote: ''
  }
];

export const allSects = [...yunhanSects, ...rongzhouSects];
