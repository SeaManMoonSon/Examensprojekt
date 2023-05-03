import { UserStart, UserLanding, Fika } from '../pages';

export const routes = [
  {
    path: '/',
    exact: true,
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