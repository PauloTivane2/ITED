import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '../../pages/home/Home.page';
import { GalleryPage } from '../../pages/gallery/Gallery.page';
import { CalendarPage } from '../../pages/calendar/Calendar.page';
import { MinistriesPage } from '../../pages/ministries/Ministries.page';
import { TermosPage } from '../../pages/termo/Termos.page';
import { PrivacityPage } from '../../pages/privacity/Privacity.page';
import { ParishesPage } from '../../pages/parishes/Parishes.page';
import { ErrorPage } from '../../pages/error/Error.page';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <HomePage />,
    errorElement: <ErrorPage /> 
  },
  { 
    path: '/galeria', 
    element: <GalleryPage />,
    errorElement: <ErrorPage /> 
  },
  { 
    path: '/paroquias', 
    element: <ParishesPage />,
    errorElement: <ErrorPage /> 
  },
  { 
    path: '/calendario', 
    element: <CalendarPage />,
    errorElement: <ErrorPage /> 
  },
  { 
    path: '/ministerios', 
    element: <MinistriesPage />,
    errorElement: <ErrorPage /> 
  },
  { 
    path: '/termos', 
    element: <TermosPage />,
    errorElement: <ErrorPage /> 
  },
  { 
    path: '/privacidade', 
    element: <PrivacityPage />,
    errorElement: <ErrorPage /> 
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};