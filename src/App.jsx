import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminPage from './pages/AdminPage';
import 'antd/dist/reset.css';
import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import DetailPLayer from './pages/DetailPLayer';
import DetailPlayerInfo from './pages/DetailPlayerInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/player/:id" element={<DetailPlayerInfo />} />
        <Route path="/player" element={<DetailPLayer />} />
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}
export default App;