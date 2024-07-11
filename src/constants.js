export const BACKEND_URL = 'http://localhost:5002';
export const MAIN_PAGE_IMG_URL =
  'https://images.squarespace-cdn.com/content/v1/52efdac1e4b07964224912f6/1699038430505-M7G76IJADCW8JKDAGC76/Screenshot+2023-11-03+at+12.06.42+PM.png?format=2500w';
export const pages = [
  { title: 'Главная', path: '/' },
  { title: 'Альбомы', path: '/albums' },
  { title: 'Фотографии', path: '/photos' },
  { title: 'Новый пост', path: '/new', protected: true },
  { title: 'Профиль', path: '/profile', protected: true },
  // { title: 'Войти', path: '/login' },
  // {title: '*', path: '/404'},
];

export const albums = [
  { id: 1, title: 'Первый альбом', path: 'firstAlbum' },
  { id: 2, title: 'Второй альбом', path: 'secondAlbum' },
  { id: 3, title: 'Третий альбом', path: 'thirdAlbum' },
  { id: 4, title: 'Четвертый альбом', path: 'fourthAlbum' },
  { id: 5, title: 'Пятый альбом', path: 'fifthAlbum' },
];

export const albumMap = {
  firstAlbum: 'Первый альбом',
  secondAlbum: 'Второй альбом',
  thirdAlbum: 'Третий альбом',
  fourthAlbum: 'Четвертый альбом',
  fifthAlbum: 'Пятый альбом',
};


export const photos = [
  {
    id: 1,
    title: 'Фото 1',
    albumId: 1,
    path: 'firstPhoto',
  },
  {
    id: 2,
    title: 'Фото 2',
    albumId: 1,
    path: 'secondPhoto'
  },
  {
    id: 3,
    title: 'Фото 3',
    albumId: 2,
    path: 'thirdPhoto',
  },
];

export const photoMap = {
  firstPhoto: 'Первое фото',
  secondPhoto: 'Второе фото',
  thirdPhoto: 'Третье фото',
}