export interface Sect {
  id: string;
  name: string;
  region: 'yunhan' | 'rongzhou';
  description: string;
  leader: string;
  location: string;
  rules: string[];
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
    description: '云汉大陆首屈一指的正道大宗，以六座山峰为根基，灵气充沛，弟子众多。宗内氛围亲如一家，与外部残酷的修仙环境形成鲜明对比。',
    leader: '李扶光',
    location: '云汉大陆中部，紫霄山脉',
    rules: [
      '尊师重道，不得欺师灭祖',
      '同门和睦，不得自相残杀',
      '行侠仗义，维护正道',
      '勤修苦练，不得懈怠',
      '遵守学分制度，完成修炼任务'
    ],
    mountains: [
      {
        id: 'fuguang',
        name: '扶光山',
        description: '紫霄宗主峰，宗主李扶光所在之地',
        characters: [
          {
            id: 'lifuguang',
            name: '李扶光',
            title: '紫霄宗宗主',
            sect: '紫霄宗',
            description: '紫霄宗当代宗主，修为深不可测。上一世以自身为代价发起时光倒转，化身为"系统"引导戴月槐改变命运。',
          },
          {
            id: 'disciple1',
            name: '弟子甲',
            title: '扶光山弟子',
            sect: '紫霄宗',
            description: '扶光山优秀弟子，勤修苦练。',
          },
          {
            id: 'disciple2',
            name: '弟子乙',
            title: '扶光山弟子',
            sect: '紫霄宗',
            description: '扶光山优秀弟子，天赋异禀。',
          }
        ]
      },
      {
        id: 'yunxia',
        name: '云霞峰',
        description: '紫霄宗第二峰，以炼丹闻名',
        characters: []
      },
      {
        id: 'qingfeng',
        name: '清风谷',
        description: '紫霄宗第三峰，剑修聚集之地',
        characters: []
      },
      {
        id: 'mingyue',
        name: '明月台',
        description: '紫霄宗第四峰，以音律修行为主',
        characters: []
      },
      {
        id: 'xingchen',
        name: '星辰殿',
        description: '紫霄宗第五峰，研究阵法之地',
        characters: []
      },
      {
        id: 'bixiao',
        name: '碧霄阁',
        description: '紫霄宗第六峰，藏书楼所在',
        characters: []
      }
    ]
  },
  {
    id: 'shanhaixuan',
    name: '山海轩',
    region: 'yunhan',
    description: '云汉大陆知名的器修宗门，擅长炼制法宝和灵器。',
    leader: '待定',
    location: '云汉大陆东部',
    rules: ['待补充']
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
    description: '戎州大陆顶尖剑修宗门，追求剑道极致。',
    leader: '待定',
    location: '戎州大陆中部山脉',
    rules: ['待补充']
  },
  {
    id: 'wenqinxiangong',
    name: '问琴仙宫',
    region: 'rongzhou',
    description: '以音律疗愈和辅助术法闻名的宗门。',
    leader: '待定',
    location: '戎州大陆东部',
    rules: ['待补充']
  },
  {
    id: 'baiguai',
    name: '白骨哀',
    region: 'rongzhou',
    description: '魔修势力，行事乖张，是正道的主要对立面。',
    leader: '待定',
    location: '戎州北部昆仑地区',
    rules: ['待补充']
  },
  {
    id: 'jixiangzong',
    name: '禨祥宗',
    region: 'rongzhou',
    description: '传达天道启示的宗门，实则已被新天道渗透。',
    leader: '柳玄之',
    location: '戎州北部昆仑地区',
    rules: ['待补充']
  }
];

export const allSects = [...yunhanSects, ...rongzhouSects];
