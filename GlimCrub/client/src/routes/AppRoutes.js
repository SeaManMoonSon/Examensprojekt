import { UserStart, UserLanding, Fika } from '../pages';

export const routes = [
  {
    path: '/login',
    exact: true,
    component: UserStart
  },
  {
    path: '/',
    component: UserStart
  },
  {
    path: '/userlanding',
    component: UserLanding
  },
  {
    path: '/fika',
    component: Fika
  }
];