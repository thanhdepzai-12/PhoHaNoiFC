
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Slider from "./Slider";
import temphoto from "../assets/teamphoto.jpg";
import { useNavigate } from "react-router-dom";
import { usePlayers } from "../Context/useContext.jsx";
import Footer from "../components/Footer.jsx";
import Benefit from "../components/Benefit.jsx";
import YoutubeDisplay from "../components/YoutubeDisplay.jsx";
import Sposor from "../components/Sposor.jsx";

function MainPage() {

  const { players } = usePlayers();
const navigate = useNavigate();
  // Lấy tối đa 4 cầu thủ SOTW
  const sotwPlayers = players.filter((p) => p.sotw).slice(0, 4);

  return (
    <div className="main-container">
      <Slider />

      {/* Thong tin ve Doi bong */}
      <div className="about" id="about">
        <div className="section-container">
          <div className="section-title">
            <h2>Về chúng tôi</h2>
            <p>
              Pho Ha Noi FC được thành lập năm 2010 với sứ mệnh mang lại những
              trận cầu đỉnh cao cho người hâm mộ
            </p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <h3>Lịch sử hình thành</h3>
              <p>
                Pho Ha Noi FC bắt đầu từ một nhóm bạn trẻ đam mê bóng đá tại
                Hà Nội. Qua nhiều năm phát triển, chúng tôi đã trở thành một
                trong những đội bóng mạnh nhất khu vực miền Bắc.
              </p>
              <p>
                Với triết lý Mạnh mẽ - Đoàn kết - Chiến thắng, đội bóng luôn
                hướng tới sự phát triển toàn diện cả về thể lực, kỹ thuật và
                tinh thần đồng đội.
              </p>
              <p>
                Hiện tại, đội bóng đang tham gia giải đấu V-League và có nhiều
                cầu thủ trẻ triển vọng trong đội hình.
              </p>
            </div>
            <div className="about-image">
              <img src={temphoto} alt="Blue Thunder FC Team" />
            </div>
          </div>
        </div>
      </div>
<div>
  <Benefit />
</div>
      {/* CẦU THỦ NỔI BẬT */}
      <div>
        <div className="bg-player py-4" id="players">
          <div
            style={{ gap: "5rem", color: "white", fontFamily: "Oswald" }}
            className="main-detail-player container d-flex flex-column justify-content-center align-items-center"
          >
            <h1 className="w-100 py-5" style={{ paddingLeft: "1rem" }}>
              NGÔI SAO CỦA TUẦN
            </h1>
            <div className="card-list d-flex justify-content-center align-items-center flex-wrap">
              {sotwPlayers.map((player) => (
                <div key={player.id} onClick={()=> navigate(`/player/${player.id}`)}>
                  <div  className="card-player" title={player.name}>
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
                      <span className="name-player"> {player.name}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={ ()=> navigate('/player')} className="btn btn-warning">Xem Chi Tiết</button>
          </div>
        </div>
      </div>

 {/* video highlight doi bong */}
<div>
  <YoutubeDisplay />
</div>

<div>
  <Sposor />
</div>
 {/* footer doi bong */}
      <div>
        <Footer />
      </div>



    </div>
  );
}

export default MainPage;
