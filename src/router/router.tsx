import { createBrowserRouter } from 'react-router-dom';
import { Routes } from '../enums/routerEnums';

import { HomePage, InDev } from '../pages';
import { FavoriteUsersPage } from '../pages/FavoriteUsersPage';
import { Layout } from '../components            ';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        path: Routes.Home,
        element: <HomePage />,
      },
      {
        path: Routes.Favorites,
        element: <FavoriteUsersPage />
      },
      {
        path: Routes.InDev,
        element: <InDev />,
      }
    ],
  },
]);
