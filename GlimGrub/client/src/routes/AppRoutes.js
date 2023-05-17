import { UserConfirmation } from '../components';
import { UserStart, UserLanding, Fika } from '../pages';

export const routes = [
  {
    path: '/login',
    component: UserStart
  },
  {
    path: '/',
    component: UserStart
  },
  {
    path: '/landing',
    component: UserLanding
  },
  {
    path: '/landing',
    component: UserConfirmation

  },
  // {
  //   path: '/admin/landing',
  //   component: 
  // },
  {
    path: '/fika',
    component: Fika
  }
];