import { useState, useEffect } from 'react';

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleShowToast = (event) => {
      const { title, message } = event.detail;
      const id = Date.now();

      setToasts(prev => [...prev, { id, title, message }]);

      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 3800);
    };

    window.addEventListener('show-toast', handleShowToast);
    return () => window.removeEventListener('show-toast', handleShowToast);
  }, []);

  return (
    <div id="toast-wrap">
      {toasts.map(toast => (
        <div key={toast.id} className="toast">
          <span className="dot live"></span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              {toast.title}
            </div>
            {toast.message && (
              <div className="text-dim" style={{ fontSize: '12.5px' }}>
                {toast.message}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
