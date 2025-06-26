import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Assuming you have some global styles

const YoutubeDisplay = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'youtube'), (snapshot) => {
      setVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Hàm format thời gian dạng dd/mm/yyyy HH:mm:ss
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.seconds
      ? new Date(timestamp.seconds * 1000)
      : new Date(timestamp);
    const pad = n => n.toString().padStart(2, '0');
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Video YouTube</h2>
      <div className="row">
        {videos.map(v => (
          <div className="col-md-6 col-lg-3 mb-4" key={v.id}>
            <div
              className="h-100"
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
    <b style={{color:"#27548A"}}>HIGH LIGHT |</b>
     Cập nhật: {formatDate(v.updatedAt)}
  </div>
</div>
            </div>
          </div>
        ))}
        {videos.length === 0 && (
          <div className="text-muted text-center">Chưa có video nào.</div>
        )}
      </div>
    </div>
  );
};

export default YoutubeDisplay;