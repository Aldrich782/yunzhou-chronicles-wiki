export interface Sect {
  id: string;
  name: string;
  region: 'yunhan' | 'rongzhou';
  description: string;
  leader: string;
  location: string;
  rules: string[];
  specialty?: string; // 门派特色
  members?: Character[];
  mountains?: Mountain[];
}

export interface Character {
  id: string;
  name: string;
  title: string;
  sect: string;
  description: string;
  avatar?: string;
  specialty?: string; // 专长
  status?: string; // 状态（如：已故、闭关等）
}

export interface Mountain {
  id: string;
  name: string;
  description: string;
  characters: Character[];
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
            status: '闭关中'
          },
          {
            id: 'yan-chijin',
            name: '燕池尽',
            title: '扶光山亲传弟子',
            sect: '紫霄宗·扶光山',
            description: '李扶光的亲传弟子，天赋异禀。',
            specialty: '剑道',
            status: '在修'
          },
          {
            id: 'lin-xianyun',
            name: '林衔云',
            title: '扶光山亲传弟子',
            sect: '紫霄宗·扶光山',
            description: '李扶光的亲传弟子，剑法超群。',
            specialty: '剑道',
            status: '在修'
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
            status: '在任'
          },
          {
            id: 'ximuxiao',
            name: '席沐逍',
            title: '长留山亲传弟子',
            sect: '紫霄宗·长留山',
            description: '戴月槐的亲传弟子，席微之子，云非堇的遗腹子。被假天道"祂"投放的"天道之书"引诱，成为"祂"的棋子。"祂"意图让他杀死司徊和天道转世袁霄强，使他以更深罪孽飞升，从而让"祂"变得更强。',
            specialty: '机关术',
            status: '在修'
          },
          {
            id: 'si-hui',
            name: '司徊',
            title: '长留山亲传弟子',
            sect: '紫霄宗·长留山',
            description: '戴月槐的亲传弟子，性格复杂。假天道"祂"故意催生其邪念，意图使其成为罪孽深重的邪修飞升。系统（上一世李扶光）引导戴月槐将他拉入正道。',
            specialty: '傀儡术',
            status: '在修'
          },
          {
            id: 'yuan-xiaoqiang',
            name: '袁霄强',
            title: '长留山亲传弟子',
            sect: '紫霄宗·长留山',
            description: '戴月槐的亲传弟子，真正天道的转世。假天道"祂"意图通过席沐逍杀死他，以消灭真天道的最后希望。',
            specialty: '机关阵法',
            status: '在修'
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
            status: '在任'
          },
          {
            id: 'yunfeijin',
            name: '云非堇',
            title: '紫霄宗前掌门',
            sect: '紫霄宗·青鸾山',
            description: '上一任掌门唐夷的亲传弟子，席微的丈夫，原本的掌门。一百年前，白骨哀得知前青鸾长老叶攸渡劫失败、席微受重创，趁护山大阵被劫雷所破之际攻上青鸾山。紫霄宗全力前往禁地修复阵眼，云非堇独自迎战，为了保护山中的妻儿和其他弟子，以一己之力敌千人，最后身死道消。',
            specialty: '综合修为',
            status: '已故（100年前）'
          },
          {
            id: 'yu-shuang',
            name: '鱼霜',
            title: '青鸾山亲传弟子',
            sect: '紫霄宗·青鸾山',
            description: '席微的亲传弟子，画修天才。',
            specialty: '画修',
            status: '在修'
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
            status: '在任'
          },
          {
            id: 'jianglanyue',
            name: '江揽月',
            title: '明月山亲传弟子',
            sect: '紫霄宗·明月山',
            description: '江晚霁之女，天赋极高的音修，深受父亲宠爱。',
            specialty: '音律',
            status: '在修'
          },
          {
            id: 'lin-lu',
            name: '林陆',
            title: '明月山亲传弟子',
            sect: '紫霄宗·明月山',
            description: '江晚霁的亲传弟子，音律天才。',
            specialty: '音律',
            status: '在修'
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
            status: '在任'
          },
          {
            id: 'li-you',
            name: '李游',
            title: '祝余峰亲传弟子',
            sect: '紫霄宗·祝余峰',
            description: '席空青的亲传弟子，医术精湛。',
            specialty: '医修',
            status: '在修'
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
            status: '在任'
          },
          {
            id: 'chi-xiao',
            name: '池宵',
            title: '抱元峰亲传弟子',
            sect: '紫霄宗·抱元峰',
            description: '楚元真的亲传弟子，炼器天才。',
            specialty: '器修',
            status: '在修'
          }
        ]
      }
    ]
  },
  {
    id: 'shanhaixuan',
    name: '山海轩',
    region: 'yunhan',
    description: '位于云汉北部北溟，此地潮湿多雨，蛟人出没。山海轩守护着北溟的土地，能抵御蛟人的歌声。',
    leader: '待定',
    location: '云汉大陆北部·北溟',
    specialty: '魂梦之术，特色武器梦铃，能感知灵魂波动，使用铃铛操控梦境',
    rules: ['守护北溟，抵御蛟人', '传承魂梦之术']
  },
  {
    id: 'banyuelou',
    name: '半月楼',
    region: 'yunhan',
    description: '以情报收集和暗杀闻名的神秘宗门。',
    leader: '待定',
    location: '云汉大陆南部',
    rules: ['待补充']
  },
  {
    id: 'shuiyundongtian',
    name: '水云洞天',
    region: 'yunhan',
    description: '隐世宗门，擅长水系法术和医术。',
    leader: '待定',
    location: '云汉大陆西部水域',
    rules: ['待补充']
  },
  {
    id: 'tianyinsi',
    name: '天音寺',
    region: 'yunhan',
    description: '佛门宗派，以音律和禅修闻名。',
    leader: '待定',
    location: '云汉大陆北部',
    rules: ['待补充']
  }
];

// 戎州门派
export const rongzhouSects: Sect[] = [
  {
    id: 'changshengmen',
    name: '长生门',
    region: 'rongzhou',
    description: '戎州大陆顶尖剑修宗门，坚持最传统的剑修之道，崇尚个人剑道巅峰。',
    leader: '待定',
    location: '戎州大陆中部山脉',
    specialty: '传统剑修',
    rules: ['追求剑道极致', '以剑入道']
  },
  {
    id: 'wenqinxiangong',
    name: '问琴仙宫',
    region: 'rongzhou',
    description: '擅长通过琴音疗伤、驱邪、甚至影响战局。以琴音治疗和辅助术法闻名。',
    leader: '待定',
    location: '戎州大陆东部',
    specialty: '琴音疗愈、辅助术法',
    rules: ['以琴入道', '医者仁心']
  },
  {
    id: 'baiguai',
    name: '白骨哀',
    region: 'rongzhou',
    description: '魔修聚集地，行事乖张，是正道的主要对立面。100年前曾趁紫霄宗护山大阵被破之际攻上青鸾山，导致云非堇战死。',
    leader: '待定',
    location: '戎州北部昆仑地区',
    specialty: '魔修功法',
    rules: ['弱肉强食', '实力为尊']
  },
  {
    id: 'jixiangzong',
    name: '禨祥宗',
    region: 'rongzhou',
    description: '位于昆仑最北，传达天道启示的宗门。实则已被假天道"祂"的化身"柳玄之"渗透，可能影响整个修仙界的走向。归墟就位于禨祥宗旁边。',
    leader: '柳玄之',
    location: '戎州北部昆仑地区·归墟旁',
    specialty: '传达天道启示（实为假天道代言）',
    rules: ['奉天道旨意', '传达启示']
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
    status: '关键变数'
  },
  {
    id: 'yuanxiaoqiang',
    name: '袁霄强',
    title: '天道转世',
    sect: '无门派',
    description: '真正天道的转世，拥有特殊的气运。假天道"祂"试图通过引诱席沐逍杀死他，以达到消灭旧天道残余力量的目的。',
    specialty: '天道气运',
    status: '天道转世'
  },
  {
    id: 'liuxuanzhi',
    name: '柳玄之',
    title: '禨祥宗宗主',
    sect: '禨祥宗',
    description: '实为假天道"祂"创造的虚假躯壳，伪装成天道启示的使者，暗中观察事态发展，试图消灭系统和旧天道势力。',
    specialty: '天道化身',
    status: '假天道代言人'
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
    status: '已退位'
  },
  {
    id: 'tangyi',
    name: '唐夷',
    title: '紫霄宗前掌门',
    sect: '紫霄宗·扶光山',
    description: '笑眯眯的慈祥和事佬，云非堇的师父。在位时将掌门之位传给云非堇。',
    specialty: '综合修为',
    status: '已退位'
  },
  {
    id: 'yeyou',
    name: '叶攸',
    title: '紫霄宗前青鸾长老',
    sect: '紫霄宗·青鸾山',
    description: '席微的师父，温柔的女修。曾试图渡劫飞升但失败，在劫雷下受损，导致护山大阵被破，间接引发了100年前的白骨哀攻山事件。',
    specialty: '画修',
    status: '已故（渡劫失败）'
  }
];

export const allSects = [...yunhanSects, ...rongzhouSects];
