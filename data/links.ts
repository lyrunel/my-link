export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

export const dummyLinks: LinkItem[] = [
  {
    id: '1',
    title: '인스타그램',
    url: 'https://instagram.com',
    icon: 'instagram',
  },
  {
    id: '2',
    title: '유튜브',
    url: 'https://youtube.com',
    icon: 'youtube',
  },
  {
    id: '3',
    title: '블로그',
    url: 'https://blog.naver.com',
    icon: 'quill-pen',
  },
  {
    id: '4',
    title: 'GitHub',
    url: 'https://github.com',
    icon: 'github',
  },
  {
    id: '5',
    title: '포트폴리오',
    url: 'https://myportfolio.com',
    icon: 'link',
  },
];
