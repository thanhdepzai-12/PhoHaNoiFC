import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Headers from './Headers';
import Sposor from './Sposor';
import Footer from './Footer';
import '../App.css';

const YoutubeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      const docRef = doc(db, 'youtube', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setVideo({ id: docSnap.id, ...docSnap.data() });
      } else {
        setVideo(null);
      }
      setLoading(false);
    };
    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="football-spinner"></div>
        <div className="loading-text">Đang tải video...</div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="not-found-container">
        <h4>Không tìm thấy video!</h4>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div className="youtube-detail-container">
      <div className='header-detail-player'>
        <div className="header-bg">
          <Headers />
        </div>
        <div className='main-detail-player-title'>
          <div className="title-wrapper">
            <h1>VIDEO HIGH LIGHT ĐỘI BÓNG</h1>
          </div>
        </div>
      </div>
      
      <div className="video-content-container">
        <h2 className="video-title">{video.title || 'Không tiêu đề'}</h2>
        <div className="video-embed-container">
          <div className="video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              allowFullScreen
              className="video-iframe"
            />
          </div>
        </div>
        <div className="video-description">
          <b>Mô tả:</b> {video.description}
        </div>
      </div>
      
      <div className="sponsor-section">
        <Sposor />
      </div>
      
      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default YoutubeDetail;