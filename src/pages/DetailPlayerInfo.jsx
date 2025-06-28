import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePlayers } from '../Context/useContext';
import '../pages/css/DetailPlayer.css'; // Assuming you have a CSS file for styling
import Headers from '../components/Headers';
import Sposor from '../components/Sposor';
import Footer from '../components/Footer';
const DetailPlayerInfo = () => {
  const { id } = useParams();
  const { players } = usePlayers();
  const player = players.find(p => p.id === id);
  useEffect(() => {
    const scrollToTop = () => {
      try {
        // Cách 1: Scroll mượt hơn
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        // Cách 2: Dự phòng nếu cách 1 không hoạt động
        setTimeout(() => {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }, 100);
      } catch (error) {
        console.error('Scroll error:', error);
      }
    };

    scrollToTop();
  }, []);
  if (!player) return <div className="alert alert-danger mt-3">Không tìm thấy cầu thủ!</div>;

  return (
    <div className="player-detail-container ">
        <div style={{position:"relative"}} className='header-detail-info-player  display-flex  justify-content-center align-items-center '>
            <Headers />
        </div>
<div className='w-100 main-detail-player-info display-flex  justify-content-center align-items-center'>

<div className="container d-flex flex-column justify-content-center align-items-center mt-5">
      {/* Player header */}
      <div className="player-header">
        <h1 className="player-title">{player.position.toUpperCase()}</h1>
        <h2 translate="no" className="player-name">{player.name.toUpperCase()}</h2>
      </div>

      {/* Player info */}
      <div className="player-info-container">
        <div className="row">
          {/* Player image */}
          <div className="col-md-4">
            <div className="player-image-container">
              <img 
                src={player.imageUrl} 
                alt={player.name} 
                className="player-image img-fluid"
              />
                <div className="player-number-info">{player.shirtNumber}</div>
              <div className="player-season">Vinague 2024/2025</div>
            </div>
          </div>

          {/* Player stats */}
          <div className="col-md-8">
            <div className="player-stats">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{player.appearances || 18}</div>
                  <div className="stat-label">Trận tham gia</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{player.goals || 10}</div>
                  <div className="stat-label">Bàn thắng</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number yellow-card">{player.foot.toUpperCase() || 'PHẢI'}</div>
                  <div className="stat-label">Chân Thuận</div>
                </div>
              </div>

              {/* Additional player info */}
              <div className="additional-info">
                <div className="info-item">
                  <span className="info-label">Tuổi:</span>
                  <span className="info-value">{player.age}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Vị trí:</span>
                  <span className="info-value">{player.position}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Số áo:</span>
                  <span className="info-value">{player.shirtNumber}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">SOTW:</span>
                  <span className="info-value">{player.sotw ? "Có" : "Không"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
</div> 
<div className='mt-5'>
    <Sposor />
</div>
<div>
    <Footer />
</div>
    </div>
  );
};

export default DetailPlayerInfo;