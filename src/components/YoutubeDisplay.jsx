import React, { useEffect, useState, useRef } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';
import '../App.css';

const YoutubeDisplay = () => {
  const [videos, setVideos] = useState([]);
  const [start, setStart] = useState(0);
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  // Responsive: 3 video/slide trên mobile, 3 trên desktop
  const getVideosPerPage = () => (window.innerWidth < 768 ? 3 : 3);
  const [videosPerPage, setVideosPerPage] = useState(getVideosPerPage());

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'youtube'), (snapshot) => {
      setVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const handleResize = () => setVideosPerPage(getVideosPerPage());
    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.seconds
      ? new Date(timestamp.seconds * 1000)
      : new Date(timestamp);
    const pad = n => n.toString().padStart(2, '0');
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  const handlePrev = () => {
    if (isMobile && carouselRef.current) {
      carouselRef.current.prev();
    } else {
      setStart((prev) => Math.max(prev - videosPerPage, 0));
    }
  };

  const handleNext = () => {
    if (isMobile && carouselRef.current) {
      carouselRef.current.next();
    } else {
      setStart((prev) =>
        prev + videosPerPage < otherVideos.length ? prev + videosPerPage : prev
      );
    }
  };

  const isMobile = window.innerWidth < 992;

  // Lấy video nổi bật và danh sách còn lại
  const featuredVideo = videos.find(v => v.featured);
  const otherVideos = videos.filter(v => !v.featured);

  // Chia mảng thành các slide, mỗi slide chứa 3 phần tử
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Video Hightlight</h2>

      {/* Hiển thị video nổi bật to ở trên */}
      {featuredVideo && (
        <div className="mb-4 rounded-4 container">
 <div
  className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 gap-lg-5'
  style={{ cursor: "pointer" }}
  onClick={() => navigate(`/youtube/${featuredVideo.id}`)}
>
  <img
    src={`https://img.youtube.com/vi/${featuredVideo.youtubeId}/maxresdefault.jpg`}
    alt={featuredVideo.title}
    className="w-100"
    style={{ 
      objectFit: "cover", 
      height: isMobile ? 200 : 400, 
      borderRadius: 16,
      maxWidth: isMobile ? '100%' : '600px' // Giới hạn chiều rộng trên mobile
    }}
  />
  
  <div className="mt-0 mt-lg-3 w-100" style={{ maxWidth: isMobile ? '100%' : '600px' }}>
    <h3 style={{ color: "#d48806", fontWeight: 700, fontSize: isMobile ? '1.25rem' : '1.5rem' }}>
      {featuredVideo.title || 'Không tiêu đề'}
    </h3>
<div className="mb-2" style={{
  display: '-webkit-box',
  WebkitLineClamp: isMobile ? 2 : 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: isMobile ? '0.9rem' : '1rem',
  /* Thêm các thuộc tính sau */
  wordBreak: 'break-word',  // Quan trọng: Xử lý từ dài
  whiteSpace: 'normal',     // Đè lên mặc định của -webkit-box
  maxWidth: '100%',         // Chắc chắn không vượt container
  lineHeight: '1.4',        // Giãn dòng cho dễ đọc
}}>
  {featuredVideo.description}
</div>

    <div style={{ 
      fontSize: isMobile ? 12 : 13, 
      color: "#888",
      marginBottom: isMobile ? '1rem' : '0'
    }}>
      <span style={{ 
        fontWeight: "bold", 
        fontFamily: "oswald", 
        color: "rgb(0, 22, 64)" 
      }}>
        HIGHT LIGHT | 
      </span> Cập nhật: {formatDate(featuredVideo.updatedAt)}
    </div>
  </div>
</div>
        </div>
      )}

      {/* Nút chuyển slide trên mobile */}
      {isMobile && otherVideos.length > 3 && (
        <div className="d-flex justify-content-center mb-3">
          <button
            className="btn btn-outline-primary me-2"
            onClick={handlePrev}
          >
            &lt;
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={handleNext}
          >
            &gt;
          </button>
        </div>
      )}

      {otherVideos.length > 0 ? (
        isMobile ? (
          <Carousel
            dots={true}
            ref={carouselRef}
          >
            {chunkArray(otherVideos, 2).map((group, idx) => (
              <div key={idx} className="d-flex justify-content-center gap-3">
                {group.map((v) => (
                  <div
                    className="col-4 mb-4"
                    style={{ minWidth: '0', flex: '1 1 0%' }}
                    key={v.id}
                  >
                    <div
                      className={`h-100 youtube-slide-fade fade-in`}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/youtube/${v.id}`)}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                        alt={v.title}
                        className="card-img-top youtube-thumb"
                        style={{ height: 105, objectFit: "cover", borderRadius: 10, transition: "transform 0.3s" }}
                      />
                      <div className="card-body mt-2 p-1">
                        <h5
                          className="text-truncate"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'normal',
                            fontFamily: 'Oswald, sans-serif',
                            color: '#27548A',
                           fontSize: isMobile ? '0.9rem' : '1rem',
                          }}
                        >
                          {v.title || 'Không tiêu đề'}
                        </h5>
                        <div
                          className="mb-2"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                      fontSize: isMobile ? '0.5rem' : '1rem',
                          }}
                          title={v.description}
                        >
                          {v.description}
                        </div>
                        <div className='d-flex justify-content-start align-items-center gap-2' style={{                 fontSize: isMobile ? '0.5rem' : '1rem', color: "grey" }}>
                          <b style={{ color: "#27548A", fontWeight: "bold",                 fontSize: isMobile ? '0.5rem' : '1rem', }}>HIGH LIGHT |</b>
                          Cập nhật: {formatDate(v.updatedAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 350 }}>
            <div
              className="d-flex justify-content-center w-100 youtube-row-scroll gap-3"
            >
              {otherVideos.slice(start, start + videosPerPage).map((v) => (
                <div
                  className="col-md-6 col-lg-4 mb-4"
                  style={{ minWidth: 320, maxWidth: 400 }}
                  key={v.id}
                >
                  <div
                    className={`h-100 youtube-slide-fade fade-in`}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/youtube/${v.id}`)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                      alt={v.title}
                      className="card-img-top youtube-thumb"
                      style={{ objectFit: "cover", height: 174, borderRadius: 10, transition: "transform 0.3s" }}
                    />
                    <div className="card-body mt-3">
                      <h5
                        className="text-truncate"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'normal',
                          fontFamily: 'Oswald, sans-serif',
                          color: '#27548A',
                        }}
                      >
                        {v.title || 'Không tiêu đề'}
                      </h5>
                      <div
                        className="mb-2"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        title={v.description}
                      >
                        {v.description}
                      </div>
                      <div className='d-flex justify-content-start align-items-center gap-2' style={{ fontSize: "12px", color: "grey" }}>
                        <b style={{ color: "#27548A", fontWeight: "bold" }}>HIGH LIGHT |</b>
                        Cập nhật: {formatDate(v.updatedAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="text-muted text-center">Chưa có video nào.</div>
      )}
    </div>
  );
};

export default YoutubeDisplay;