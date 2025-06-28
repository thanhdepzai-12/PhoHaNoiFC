import { useEffect, useState } from 'react';
import vietnam from '../assets/vietnam.png';
import england from '../assets/england.png';

const GoogleTranslate = () => {
  const [currentLang, setCurrentLang] = useState('vi');

  useEffect(() => {
    const checkLanguage = () => {
      // Kiểm tra cookie để xác định ngôn ngữ hiện tại
      const cookies = document.cookie.split(';');
      const langCookie = cookies.find(c => c.includes('googtrans'));
      if (langCookie) {
        const lang = langCookie.split('=')[1].split('/')[2];
        setCurrentLang(lang || 'vi');
      }
    };

    const initGoogleTranslate = () => {
      if (!window.google || !window.google.translate) return;
      if (document.querySelector('#google_translate_element select')) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'vi',
          includedLanguages: 'en,vi',
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          autoDisplay: false,
        },
        'google_translate_element'
      );

      // Kiểm tra ngôn ngữ sau khi khởi tạo
      checkLanguage();

      // Lắng nghe sự kiện thay đổi ngôn ngữ
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.addEventListener('change', () => {
          setTimeout(checkLanguage, 500); // Chờ Google cập nhật cookie
        });
      }

      const style = document.createElement('style');
      style.innerHTML = `
        .goog-te-banner-frame, .skiptranslate {
          display: none !important;
        }
        body { top: 0 !important; }
        .goog-te-gadget {
          font-size: 0 !important;
        }
        .goog-te-combo {
          opacity: 0 !important;
          position: absolute !important;
          top: 0; left: 0;
          width: 100px !important;
          height: 30px !important;
          z-index: 9999;
        }
      `;
      document.head.appendChild(style);
    };

    window.googleTranslateElementInit = initGoogleTranslate;

    if (window.google && window.google.translate) {
      initGoogleTranslate();
    } else {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onload = () => {
        // Kiểm tra ngôn ngữ sau khi script tải xong
        setTimeout(checkLanguage, 1000);
      };
      document.body.appendChild(script);
    }

    // Kiểm tra ngôn ngữ ban đầu
    checkLanguage();

    return () => {
      delete window.googleTranslateElementInit;
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.removeEventListener('change', checkLanguage);
      }
    };
  }, []);

  const changeLanguage = (lang) => {
    const select = document.querySelector('.goog-te-combo');
    if (select && select.value !== lang) {
      select.value = lang;
      const event = new Event('change', { bubbles: true });
      select.dispatchEvent(event);
      setCurrentLang(lang); // Cập nhật state ngay lập tức
    }
  };

  const resetTranslation = (e) => {
     e.preventDefault();
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    window.location.reload();
  };

  return (
    <div className='main-s-l' style={{
      position: "absolute",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div
        onClick={e => resetTranslation(e)}
        style={{
          padding: '4px',
          background: "transparent",
          color: currentLang === 'vi' ? 'red' : 'white',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s',
          display: 'flex',
gap:'0.1rem',
          alignItems: 'center'
        }}
      >
        <img  src={vietnam} alt="Vietnamese" />
        VI
      </div>

      <div
        onClick={() => changeLanguage('en')}
        style={{
          padding: '4px',
          background: "transparent",
          color: currentLang === 'en' ? '#3674B5' : 'white',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s',
          display: 'flex',
          gap:'0.1rem',
          alignItems: 'center'
        }}
      >
        <img src={england} alt="English" />
        EN
      </div>

      <div id="google_translate_element" style={{ display: 'block', height: 0, overflow: 'hidden' }}></div>
    </div>
  );
};

export default GoogleTranslate;