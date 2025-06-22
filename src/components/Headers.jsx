import React, { useState, useEffect } from 'react';
import logoFoot from '../assets/logofoot.png';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { link: "/", label: "Trang chủ" },
  { link: "/introduce", label: "Giới thiệu" },
  { link: "/player", label: "Cầu thủ" },
  { link: "/contact", label: "Liên hệ" },
    { link: "/admin", label: "Quản Lý" },
];

const Headers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const handleClick = (link, event) => {
    event.preventDefault(); // Ngăn thẻ <a> reload lại trang
    setActive(link);
    navigate(link);
  };

  return (
    <div className="header-container">
      <div className="logo mt-3">
        <img src={logoFoot} alt="FC Pho Sai Gon Logo" />
        <div className="logo-text">
          <h1>PHO HA NOI FC</h1>
          <p>Mạnh mẽ - Đoàn kết - Chiến thắng</p>
        </div>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.link}>
              <a
                href={item.link}
                className={active === item.link ? "active" : ""}
                onClick={(e) => handleClick(item.link, e)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Headers;
