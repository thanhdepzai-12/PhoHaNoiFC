import React from 'react';
import logoFoot from '../assets/logofoot.png';
import '../pages/css/Footer.css'; // Giả sử bạn đã tạo file CSS này để định dạng footer
const Footer = () => {
  return (
    <footer className="py-4 mt-1">
      <div className="container">
        {/* Logo và tên */}
        <div className="d-flex justify-content-start mb-4">
          <div className="d-flex align-items-center gap-1">
            <img src={logoFoot} alt="Logo" style={{ height: '150px' }} />
            <h1  style={{ fontSize: '50px' , fontFamily:"Oswald" }} className="h4 mb-0">PHO HA NOI FC</h1>
          </div>
        </div>

        {/* Nội dung footer */}
        <div className="row g-4 mb-4">
          {/* Liên hệ */}
          <div className="col-md-4">
            <h3 className="h5 mb-3 position-relative pb-2">
              Liên hệ
              <span className="position-absolute bottom-0 start-0 bg-danger" style={{ width: '40px', height: '2px' }}></span>
            </h3>
            <div className="d-flex flex-column gap-2">
              <div>Số 79 Trần Hưng Đạo, quận Hoàn Kiếm, thành phố Hà Nội</div>
              <div>congadanhnol@gmail.com</div>
            </div>
          </div>

          {/* Chính sách */}
          <div className="col-md-4">
            <h3 className="h5 mb-3 position-relative pb-2">
              Chính sách
              <span className="position-absolute bottom-0 start-0 bg-danger" style={{ width: '40px', height: '2px' }}></span>
            </h3>
            <div className="d-flex flex-column gap-2">
              <a href="#" className="text-decoration-none text-dark hover-text-danger">Chính sách bảo mật</a>
              <a href="#" className="text-decoration-none text-dark hover-text-danger">Điều khoản sử dụng</a>
              <a href="#" className="text-decoration-none text-dark hover-text-danger">Về chúng tôi</a>
              <a href="#" className="text-decoration-none text-dark hover-text-danger">Điều kiện giao dịch chung</a>
              <a href="#" className="text-decoration-none text-dark hover-text-danger">Vận chuyển và giao nhận</a>
              <a href="#" className="text-decoration-none text-dark hover-text-danger">Phương thức thanh toán</a>
              <a href="#" className="text-decoration-none text-dark hover-text-danger">Bảo vệ thông tin cá nhân</a>
            </div>
          </div>

          {/* Cộng đồng */}
          <div className="col-md-4">
            <h3 className="h5 mb-3 position-relative pb-2">
              Cộng đồng
              <span className="position-absolute bottom-0 start-0 bg-danger" style={{ width: '40px', height: '2px' }}></span>
            </h3>
            <p className="mb-2">VUI VẺ</p>
            <div className="d-flex flex-column gap-2">
   <span>
         ĐOÀN KẾT
   </span>
  
                 <span>
  THỂ THAO
   </span>
      
     
            </div>
          </div>
        </div>

        {/* Thông tin công ty */}
        <div className="border-top pt-3">
          <div className="row">
            <div className="col-12">
              <div className="text-muted small">
                <div>Chủ sở hữu: Công ty TNHH Bóng đá CATP Hà Nội</div>
                <div>Mã số thuế DN: 0110496253</div>
                <div>Ngày cấp: 04/10/2023</div>
                <div>Nơi cấp: Phòng ĐKKD, Thành Phố Hà Nội</div>
              </div>
            </div>
          </div>
        </div>

        {/* Thông báo */}
        <div className="text-center mt-3">
        </div>
      </div>
    </footer>
  );
};

export default Footer;