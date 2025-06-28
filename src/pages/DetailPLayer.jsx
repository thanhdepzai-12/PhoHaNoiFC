import React from 'react'
import { usePlayers } from '../Context/useContext';
import Headers from '../components/Headers';
import Sposor from '../components/Sposor';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 
const DetailPLayer = () => {
  const { players } = usePlayers();
  const navigate = useNavigate();

  const positions = [
    { key: 'Thủ môn', label: 'Thủ môn', color: '#f3f3f3' },
    { key: 'Hậu vệ', label: 'Hậu vệ', color: '#e9e9e9' },
    { key: 'Tiền vệ', label: 'Tiền vệ', color: '#f3f3f3' },
    { key: 'Tiền đạo', label: 'Tiền đạo', color: '#e9e9e9' },
  ];

  const getPlayersByPosition = (pos) =>
    players.filter((player) =>
      player.position && player.position.toLowerCase().includes(pos.toLowerCase())
    );

  return (
    <div className='display-flex flex-column justify-content-center align-items-center main-container'>
      <div className='relative header-detail-player display-flex flex-column justify-content-center align-items-center '>
        <div style={{background:"#001640", height:"26%"}} className='w-100 display-flex justify-content-center align-items-center'>
            <Headers />
        </div>
        <div className='main-detail-player-title display-flex justify-content-end align-items-center'>
          <div style={{
            maxWidth: "1280px",
            width: "100%",
            paddingTop: "6rem",
            margin: "0 auto",
            paddingInline: "5rem"
          }}>
            <h1 >ĐỘI HÌNH CHÍNH</h1>
          </div>
        </div>
      </div>
      <div className='main-detail-player'>
        {positions.map((pos) => {
          const playersByPos = getPlayersByPosition(pos.key);
          if (playersByPos.length === 0) return null;
          return (
            <div style={{background:`${pos.color}`}}  key={pos.key}>
              <div  className="container py-5">
                <h2 style={{fontSize:"2.5rem", color:"navy", fontFamily:"Oswald", marginBottom:"6rem", textTransform:"uppercase"}} >{pos.label}</h2>
                <div style={{ gap: "5rem" }} className='d-flex flex-wrap justify-content-start align-items-center'>
                  {playersByPos.map((player) => (
                    <div key={player.id} style={{cursor: "pointer"}} onClick={() => navigate(`/player/${player.id}`)}>
                      <div className="card-player" title={player.name}>
                        <img
                          src={player.imageUrl}
                          alt={player.name}
                          className="photo-player"
                        />
                        <p className="shirt-number">{player.shirtNumber}</p>
                      </div>
                      <div>
                        <p className="mt-3">
                          <span className="postion-player">{player.position}</span>
                          <span style={{color:"navy"}} className="name-player"> {player.name}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <Sposor />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
export default DetailPLayer;