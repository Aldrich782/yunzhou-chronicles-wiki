import liFuguangImg from '@/assets/illustrations/li-fuguang.png';
import siHuiImg from '@/assets/illustrations/si-hui.png';

export interface Illustration {
  id: string;
  name: string;
  sect: string;
  title?: string;
  image?: string;
}

export const zixiaoIllustrations: Illustration[] = [
  {
    id: 'li-fuguang',
    name: '李扶光',
    sect: '紫霄宗',
    title: '掌门',
    image: liFuguangImg,
  },
  {
    id: 'si-hui',
    name: '司徊',
    sect: '紫霄宗',
    title: '长留山弟子',
    image: siHuiImg,
  },
  {
    id: 'dai-yuehuai',
    name: '戴月槐',
    sect: '紫霄宗',
    title: '大长老',
  },
  {
    id: 'xi-wei',
    name: '席微',
    sect: '紫霄宗',
    title: '二长老',
  },
  {
    id: 'xi-muxiao',
    name: '席沐逍',
    sect: '紫霄宗',
    title: '长留山弟子',
  },
  {
    id: 'yuan-xiaoqiang',
    name: '袁霄强',
    sect: '紫霄宗',
    title: '长留山弟子',
  },
];

export const allIllustrations: Illustration[] = [
  ...zixiaoIllustrations,
];
