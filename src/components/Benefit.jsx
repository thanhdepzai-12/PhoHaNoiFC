import React from 'react';
import '../pages/css/Benefit.css';

const Benefit = () => {
  const benefits = [
    {
      icon: '🎯',
      title: 'Tiếp Cận Đối Tượng Mục Tiêu',
      description: 'Logo và thông điệp thương hiệu xuất hiện nổi bật trên website, áo đấu, banner và các ấn phẩm truyền thông.'
    },
    {
      icon: '🚀',
      title: 'Tăng Cường Nhận Diện Thương Hiệu',
      description: 'Xuất hiện trên mọi nền tảng truyền thông của đội bóng với thiết kế chuyên nghiệp'
    },
    {
      icon: '🤝',
      title: 'Hợp Tác Chiến Lược',
      description: 'Cơ hội hợp tác dài hạn với đội bóng và tham gia vào các sự kiện đặc biệt.'
    },
    {
      icon: '📈',
      title: 'Đo Lường Hiệu Quả',
      description: 'Báo cáo định kỳ về mức độ tiếp cận và tác động của chiến dịch tài trợ.'
    }
  ];

  return (
    <section className="benefit-section">
      <div className="benefit-container">
        <h2 className="benefit-title">QUYỀN LỢI KHI TÀI TRỢ CHO ĐỘI BÓNG</h2>
        
        <div className="benefit-grid">
          {benefits.map((item, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{item.icon}</div>
              <h3 className="benefit-card-title">{item.title}</h3>
              <p className="benefit-card-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefit;