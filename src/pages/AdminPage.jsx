import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CLOUDINARY_UPLOAD_PRESET = 'psljoqz8';
const CLOUDINARY_CLOUD_NAME = 'dzndjuynt';
const CLOUDINARY_DELETE_ENDPOINT = '/api/delete-image';

function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    position: '',
    shirtNumber: '',
    foot: 'phải', // Thêm trường chân thuận, mặc định là 'right' (phải)
    imageUrl: '',
    imagePublicId: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'players'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlayers(data);
    });
    return () => unsubscribe();
  }, []);

  const sotwCount = players.filter(p => p.sotw).length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Thêm hàm xử lý select chân thuận
  const handleFootChange = (e) => {
    setFormData(prev => ({
      ...prev,
      foot: e.target.value
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImg(null);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formDataCloud = new FormData();
    formDataCloud.append('file', file);
    formDataCloud.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formDataCloud,
      }
    );
    const data = await res.json();
    return { url: data.secure_url, publicId: data.public_id };
  };

  const deleteImageFromCloudinary = async (publicId) => {
    if (!publicId) return;
    await fetch(CLOUDINARY_DELETE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicId }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.imageUrl || '';
      let imagePublicId = formData.imagePublicId || '';

      if (imageFile) {
        if (editingId && imagePublicId) {
          await deleteImageFromCloudinary(imagePublicId);
        }
        const img = await uploadImageToCloudinary(imageFile);
        imageUrl = img.url;
        imagePublicId = img.publicId;
      }

      const playerData = {
        name: formData.name,
        age: formData.age,
        position: formData.position,
        shirtNumber: formData.shirtNumber,
        foot: formData.foot, // Thêm chân thuận vào dữ liệu lưu
        imageUrl,
        imagePublicId,
        sotw: editingId ? players.find(p => p.id === editingId)?.sotw || false : false,
      };

      if (editingId) {
        await updateDoc(doc(db, 'players', editingId), playerData);
        alert('Cập nhật cầu thủ thành công!');
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'players'), playerData);
        alert('Thêm cầu thủ thành công!');
      }

      setFormData({ 
        name: '', 
        age: '', 
        position: '', 
        shirtNumber: '', 
        foot: 'right', // Reset về mặc định
        imageUrl: '', 
        imagePublicId: '' 
      });
      setImageFile(null);
      setPreviewImg(null);
    } catch (error) {
      alert('Có lỗi khi lưu dữ liệu');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa?')) {
      try {
        const player = players.find(p => p.id === id);
        if (player && player.imagePublicId) {
          await deleteImageFromCloudinary(player.imagePublicId);
        }
        await deleteDoc(doc(db, 'players', id));
        alert('Đã xóa cầu thủ');
      } catch {
        alert('Xóa thất bại');
      }
    }
  };

  const handleEdit = (player) => {
    setEditingId(player.id);
    setFormData({
      name: player.name,
      age: player.age,
      position: player.position,
      shirtNumber: player.shirtNumber,
      foot: player.foot || 'phải', // Lấy giá trị chân thuận từ dữ liệu hiện có
      imageUrl: player.imageUrl || '',
      imagePublicId: player.imagePublicId || '',
    });
    setImageFile(null);
    setPreviewImg(player.imageUrl || null);
  };

  const toggleSOTW = async (player) => {
    const isSotw = !!player.sotw;
    if (!isSotw && sotwCount >= 4) {
      alert('Chỉ được chọn tối đa 4 cầu thủ SOTW!');
      return;
    }

    try {
      await updateDoc(doc(db, 'players', player.id), {
        sotw: !isSotw,
      });
    } catch (error) {
      alert('Không thể cập nhật trạng thái SOTW');
    }
  };

  return (
    <div className="admin-app">
      <div className="container py-4 py-lg-5">
        <div>
        <button onClick={()=> navigate('/admin')} className='btn btn-warning mt-5'>upload cầu thủ</button>
         <button onClick={()=> navigate('/admin/youtube')} className='btn btn-success mt-5'>upload video</button>
         </div>
        {/* ... (giữ nguyên phần header) */}

        <div className="card glass-card mb-5">
          <div className="card-body p-4 p-lg-5">
            <h2 className="h4 mb-4">{editingId ? 'Cập Nhật Cầu Thủ' : 'Thêm Cầu Thủ Mới'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input type="text" className="form-control" name="name" placeholder="Tên cầu thủ" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <input type="number" className="form-control" name="age" placeholder="Tuổi" value={formData.age} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control" name="position" placeholder="Vị trí" value={formData.position} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <input type="number" className="form-control" name="shirtNumber" placeholder="Số áo" value={formData.shirtNumber} onChange={handleInputChange} required />
                </div>
                {/* Thêm select chân thuận */}
                <div className="col-md-6">
                  <select 
                    className="form-select" 
                    name="foot" 
                    value={formData.foot} 
                    onChange={handleFootChange}
                    required
                  >
                    <option value="phải">Chân phải</option>
                    <option value="phải">Chân trái</option>
                  </select>
                </div>
                <div className="col-12">
                  <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
                  {(previewImg || formData.imageUrl) && (
                    <img
                      src={previewImg || formData.imageUrl}
                      alt="Ảnh cầu thủ"
                      style={{ maxWidth: 120, borderRadius: 8, marginTop: 10 }}
                    />
                  )}
                </div>
                <div className="col-12">
                  <div className="d-flex gap-3 mt-3">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Đang xử lý...' : editingId ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setEditingId(null);
                          setFormData({ 
                            name: '', 
                            age: '', 
                            position: '', 
                            shirtNumber: '', 
                            foot: 'right', 
                            imageUrl: '', 
                            imagePublicId: '' 
                          });
                          setImageFile(null);
                          setPreviewImg(null);
                        }}
                      >
                        Hủy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="card glass-card">
          <div className="card-body p-4 p-lg-5">
            <h2 className="h4 mb-4">Danh Sách Cầu Thủ</h2>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên</th>
                    <th>Tuổi</th>
                    <th>Vị trí</th>
                    <th>Số áo</th>
                    <th>Chân thuận</th> {/* Thêm cột chân thuận */}
                    <th>SOTW</th>
                    <th className="text-end">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map(player => (
                    <tr key={player.id}>
                      <td>
                        {player.imageUrl && (
                          <img src={player.imageUrl} alt={player.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: '50%' }} />
                        )}
                      </td>
                      <td>{player.name}</td>
                      <td>{player.age}</td>
                      <td>{player.position}</td>
                      <td>{player.shirtNumber}</td>
                      <td>{player.foot === 'right' ? 'Phải' : 'Trái'}</td> {/* Hiển thị chân thuận */}
                      <td>{player.sotw ? <span style={{ color: "#f7b731", fontSize: 20 }}>★</span> : ""}</td>
                      <td className="text-end">
                        <div className="d-flex gap-2 justify-content-end">
                          <button onClick={() => handleEdit(player)} className="btn btn-sm btn-outline-primary">Sửa</button>
                          <button onClick={() => handleDelete(player.id)} className="btn btn-sm btn-outline-danger">Xóa</button>
                          {(!player.sotw && sotwCount >= 4) ? null : (
                            <button
                              onClick={() => toggleSOTW(player)}
                              className={`btn btn-sm ${player.sotw ? 'btn-warning' : 'btn-outline-warning'}`}
                            >
                              {player.sotw ? 'Bỏ SOTW ✖' : 'Chọn SOTW ★'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 text-muted">SOTW hiện tại: {sotwCount}/4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;