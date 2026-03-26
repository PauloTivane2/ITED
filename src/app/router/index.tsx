import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '../../pages/home/Home.page';
import { GalleryPage } from '../../pages/gallery/Gallery.page';
import { CalendarPage } from '../../pages/calendar/Calendar.page';
import { MinistriesPage } from '../../pages/ministries/Ministries.page';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/galeria', element: <GalleryPage /> },
  { path: '/calendario', element: <CalendarPage /> },
  { path: '/ministerios', element: <MinistriesPage /> },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};