import liFuguangImg from '@/assets/illustrations/li-fuguang.png';
import siHuiImg from '@/assets/illustrations/si-hui.png';
import yuanXiaoqiangImg from '@/assets/illustrations/yuan-xiaoqiang.png';
import xiWeiImg from '@/assets/illustrations/xi-wei.png';
import daiYuehuaiImg from '@/assets/illustrations/dai-yuehuai.png';
import xiKongqingImg from '@/assets/illustrations/xi-kongqing.png';
import liuXuanzhiImg from '@/assets/illustrations/liu-xuanzhi.png';
import xunYexueImg from '@/assets/illustrations/xun-yexue.png';
import xieTanyuanImg from '@/assets/illustrations/xie-tanyuan.png';

export interface Illustration {
  id: string;
  name: string;
  sect: string;
  title?: string;
  image?: string;
  characterId?: string; // 用于链接到人物详情页
}

export const zixiaoIllustrations: Illustration[] = [
  {
    id: 'li-fuguang',
    name: '李扶光',
    sect: '紫霄宗',
    title: '掌门',
    image: liFuguangImg,
    characterId: 'lifuguang',
  },
  {
    id: 'dai-yuehuai',
    name: '戴月槐',
    sect: '紫霄宗',
    title: '大长老',
    image: daiYuehuaiImg,
    characterId: 'daiyuehuai',
  },
  {
    id: 'xi-wei',
    name: '席微',
    sect: '紫霄宗',
    title: '二长老',
    image: xiWeiImg,
    characterId: 'xiwei',
  },
  {
    id: 'xi-kongqing',
    name: '席空青',
    sect: '紫霄宗',
    title: '四长老·医圣',
    image: xiKongqingImg,
    characterId: 'xikongqing',
  },
  {
    id: 'si-hui',
    name: '司徊',
    sect: '紫霄宗',
    title: '长留山弟子',
    image: siHuiImg,
    characterId: 'si-hui',
  },
  {
    id: 'yuan-xiaoqiang',
    name: '袁霄强',
    sect: '紫霄宗',
    title: '长留山弟子',
    image: yuanXiaoqiangImg,
    characterId: 'yuan-xiaoqiang',
  },
  {
    id: 'xi-muxiao',
    name: '席沐逍',
    sect: '紫霄宗',
    title: '长留山弟子',
    characterId: 'ximuxiao',
  },
];

export const jixiangzongIllustrations: Illustration[] = [
  {
    id: 'liu-xuanzhi',
    name: '柳玄之',
    sect: '禨祥宗',
    title: '掌门',
    image: liuXuanzhiImg,
    characterId: 'liuxuanzhi',
  },
];

export const wenqinxiangongIllustrations: Illustration[] = [
  {
    id: 'xun-yexue',
    name: '荀夜雪',
    sect: '问琴仙宫',
    title: '荀家小姐',
    image: xunYexueImg,
    characterId: 'xunyexue',
  },
];

export const baiguaiIllustrations: Illustration[] = [
  {
    id: 'xie-tanyuan',
    name: '谢檀远',
    sect: '白骨哀',
    title: '首领',
    image: xieTanyuanImg,
    characterId: 'xietanyuan',
  },
];

export const allIllustrations: Illustration[] = [
  ...zixiaoIllustrations,
  ...jixiangzongIllustrations,
  ...wenqinxiangongIllustrations,
  ...baiguaiIllustrations,
];

// 紫霄宗六山校服立绘
export interface UniformIllustration {
  id: string;
  name: string;
  image: string;
}

export const zixiaoUniforms: UniformIllustration[] = [
  { id: 'changliu', name: '长留山', image: 'https://i.postimg.cc/28FMM6mr/cl.png' },
  { id: 'qingluan', name: '青鸾山', image: 'https://i.postimg.cc/Qd8w33xJ/ql.png' },
  { id: 'mingyue', name: '明月山', image: 'https://i.postimg.cc/9QmKhhFr/my.png' },
  { id: 'baoyuan', name: '抱元峰', image: 'https://i.postimg.cc/HsCF6MqQ/by.png' },
  { id: 'zhuyu', name: '祝余峰', image: 'https://i.postimg.cc/13vTRjfW/zy.png' },
  { id: 'fuguang', name: '扶光山', image: 'https://i.postimg.cc/5NqTT01t/fg.png' },
];
