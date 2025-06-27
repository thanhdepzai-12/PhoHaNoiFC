import { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useLocation } from "react-router-dom";

const PlayersContext = createContext();

export function PlayersProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [showEmail, setShowEmail] = useState(false);
  const emailAddress = 'tunganh0006@gmail.com';

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "players"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPlayers(data);
    });
    return () => unsubscribe();
  }, []);

    const handleEmailClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const subject = encodeURIComponent("Liên hệ từ website");
    const body = encodeURIComponent("Xin chào,\n\nTôi muốn liên hệ về tài trợ cho đội bóng");

    // Phiên bản tối ưu cho từng nền tảng
    if (isMobile) {
      // Ưu tiên mở app Gmail nếu có cài đặt
      window.location.href = `googlegmail:///co?to=${emailAddress}&subject=${subject}&body=${body}`;
      
      // Fallback nếu không có app Gmail
      setTimeout(() => {
        window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
      }, 500);
    } else {
      // Desktop: Mở Gmail trong tab mới
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${subject}&body=${body}`,
        '_blank'
      );
    }

    setShowEmail(true);
    setTimeout(() => setShowEmail(false), 3000);
  };
  return (
    <PlayersContext.Provider value={{ players, setPlayers , handleEmailClick, showEmail, setShowEmail }}>
      {children}
    </PlayersContext.Provider>
  );
}

export function usePlayers() {
  return useContext(PlayersContext);
}