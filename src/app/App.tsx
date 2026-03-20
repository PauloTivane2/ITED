import { MainLayout } from '@/layouts/MainLayout';
import { HomePage } from '@/pages/home/Home.page';

export function App() {
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
}