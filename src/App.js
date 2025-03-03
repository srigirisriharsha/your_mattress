import React, { useEffect } from 'react';
import RoutesPage from './components/Routes/Routes';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import AdminSideBar from './components/AdminSideBar/AdminSideBar';
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page whenever the location changes
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};
const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<RoutesPage />} />
        <Route path="/admin/*" element={<AdminSideBar />} />
      </Routes>
    </Router>
  );
};

export default App;
