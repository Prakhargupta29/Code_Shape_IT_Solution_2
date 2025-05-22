import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleTheme, darkMode, greeting }) => {
  const [showBadge, setShowBadge] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleBellClick = () => {
    setShowBadge(false);
    setShowDropdown(!showDropdown);
  };

  const handleNotificationClick = () => {
    setShowBadge(false);
    setShowDropdown(false);
    navigate('/Notification');
  };

  return (
    <div className="navbar">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
        <h1 style={{ margin: 0 }}>{greeting}, Admin</h1>
        <p style={{ margin: 0 }}>Your performance summary this week</p>
      </div>

      <div className="navbar-actions">
        {/* Theme Toggle */}
        <label className="switch-icon" title="Toggle Theme">
          <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
          <span className="icon">{darkMode ? '☀️' : '🌙'}</span>
        </label>

        {/* Notification Bell */}
        <div className="notification-wrapper" role="button" aria-label="Notifications">
          <div className="notification-icon" onClick={handleBellClick} title="Notifications">
            🔔
            {showBadge && <span className="notif-badge">3</span>}
          </div>

          {showDropdown && (
            <div className="notification-dropdown" onClick={handleNotificationClick}>
              <p>📩 New message</p>
              <p>⚙ System update</p>
              <p>📊 Weekly stats update</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;



