import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminPage from './pages/AdminPage';
import 'antd/dist/reset.css';
import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import DetailPLayer from './pages/DetailPLayer';
import DetailPlayerInfo from './pages/DetailPlayerInfo';
import ContactIcons from './components/ContactIcons.jsx';
import YoutubeAdminPage from './components/YoutubeAdminPage.jsx';
import YoutubeDetail from './components/YoutubeDetail.jsx';
import GoogleTranslate from './Context/GoogleTranslate.jsx';
import Contact from './pages/Contact.jsx';


function App() {
  return (

    <Router>
   
      <Routes>
        <Route path="/" element={<MainPage />} />
           <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/player/:id" element={<DetailPlayerInfo />} />
        <Route path="/player" element={<DetailPLayer />} />
        <Route path="/admin/youtube" element={<YoutubeAdminPage />} />
        <Route path="/youtube/:id" element={<YoutubeDetail />} />
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        } />
     
      </Routes>
           <ContactIcons />
    </Router>

  );
}
export default App;