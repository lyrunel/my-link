export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon?: string;
  // PRD ERD 참고형 추가 필드 (선택 사항)
  order_index?: number;
  is_active?: boolean;
}

export const dummyLinks: LinkItem[] = [
  {
    id: '1',
    title: 'Instagram',
    url: 'https://instagram.com',
    icon: 'https://s2.googleusercontent.com/s2/favicons?domain=instagram.com&sz=256',
    order_index: 0,
    is_active: true,
  },
  {
    id: '2',
    title: 'YouTube',
    url: 'https://youtube.com',
    icon: 'https://s2.googleusercontent.com/s2/favicons?domain=youtube.com&sz=256',
    order_index: 1,
    is_active: true,
  },
  {
    id: '3',
    title: 'Blog',
    url: 'https://blogger.com',
    icon: 'https://s2.googleusercontent.com/s2/favicons?domain=blogger.com&sz=256',
    order_index: 2,
    is_active: true,
  },
  {
    id: '4',
    title: 'GitHub',
    url: 'https://github.com',
    icon: 'https://s2.googleusercontent.com/s2/favicons?domain=github.com&sz=256',
    order_index: 3,
    is_active: true,
  },
  {
    id: '5',
    title: 'Portfolio',
    url: 'https://myportfolio.com',
    icon: 'https://s2.googleusercontent.com/s2/favicons?domain=myportfolio.com&sz=256',
    order_index: 4,
    is_active: true,
  },
];
