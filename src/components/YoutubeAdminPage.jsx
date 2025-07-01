import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import '../pages/css/youtube.css';
import { useNavigate } from 'react-router-dom';

function YoutubeAdminPage() {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ youtubeId: '', title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'youtube'), (snapshot) => {
      setVideos(
        snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0))
      );
    });
    return () => unsubscribe();
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (editingId) {
      await updateDoc(doc(db, 'youtube', editingId), {
        ...form,
        updatedAt: serverTimestamp(),
      });
      setEditingId(null);
    } else {
      await addDoc(collection(db, 'youtube'), {
        ...form,
        featured: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    setForm({ youtubeId: '', title: '', description: '' });
  };

  const handleEdit = v => {
    setEditingId(v.id);
    setForm({ youtubeId: v.youtubeId, title: v.title, description: v.description });
  };

  const handleDelete = async id => {
    if (window.confirm('Xóa video này?')) await deleteDoc(doc(db, 'youtube', id));
  };

  // Đặt video nổi bật duy nhất
  const handleSetFeatured = async (id) => {
    const batch = writeBatch(db);
    videos.forEach(v => {
      const ref = doc(db, 'youtube', v.id);
      batch.update(ref, { featured: v.id === id });
    });
    await batch.commit();
  };

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
      <h2>Quản lý Video YouTube</h2>
           <div>
        <button onClick={()=> navigate('/admin')} className='btn btn-warning mt-5'>upload cầu thủ</button>
         <button onClick={()=> navigate('/admin/youtube')} className='btn btn-success mt-5'>upload video</button>
         </div>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="form-control mb-2"
          name="youtubeId"
          placeholder="YouTube Video ID hoặc link"
          value={form.youtubeId}
          onChange={e => {
            const value = e.target.value;
            // Regex lấy id từ link youtube hoặc giữ nguyên nếu chỉ nhập id
            const match = value.match(
              /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
            );
            setForm(f => ({
              ...f,
              youtubeId: match ? match[1] : value
            }));
          }}
          required
        />
        <input className="form-control mb-2" name="title" placeholder="Tiêu đề" value={form.title} onChange={handleChange} />
        <input className="form-control mb-2" name="description" placeholder="Mô tả" value={form.description} onChange={handleChange} />
        <button className="btn btn-primary" type="submit">{editingId ? 'Cập nhật' : 'Thêm mới'}</button>
        {editingId && <button className="btn btn-secondary ms-2" type="button" onClick={() => { setEditingId(null); setForm({ youtubeId: '', title: '', description: '' }); }}>Hủy</button>}
      </form>
      <div className="row">
        {videos.map(v => (
          <div className="col-md-6 col-lg-4 mb-4" key={v.id}>
            <div className={`card h-100 ${v.featured ? 'border-warning shadow-lg' : ''}`}>
              <div className="card-body">
                <h5>
                  {v.title || 'Không tiêu đề'}
                  {v.featured && <span className="badge bg-warning text-dark ms-2">Nổi bật</span>}
                </h5>
                <div className="ratio ratio-16x9 mb-2">
                  <iframe src={`https://www.youtube.com/embed/${v.youtubeId}`} title={v.title} allowFullScreen />
                </div>
                <div><b>Mô tả:</b> {v.description}</div>
                <div className="text-muted mt-2" style={{ fontSize: 13 }}>
                  Cập nhật: {formatDate(v.updatedAt)}
                </div>
                <div className="mt-2 d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(v)}>Sửa</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(v.id)}>Xóa</button>
                  <button
                    className={`btn btn-sm ${v.featured ? 'btn-warning text-dark fw-bold' : 'btn-outline-warning'}`}
                    onClick={() => handleSetFeatured(v.id)}
                    disabled={v.featured}
                  >
                    {v.featured ? 'Đang nổi bật' : 'Nổi bật'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {videos.length === 0 && <div className="text-muted text-center">Chưa có video nào.</div>}
      </div>
    </div>
  );
}

export default YoutubeAdminPage;