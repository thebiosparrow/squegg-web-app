import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import routes from './constant/routes.tsx';
import ValidicAuth from './screens/ValidicAuth';
import NotFoundPage from './screens/NotFoundPage/NotFoundPage';

const MainLayout = () => {
  return (
    <Router>
      <Routes>
        <Route path={routes.VALIDIC_AUTH} element={<ValidicAuth />}/>
        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainLayout />
  </StrictMode>,
)
