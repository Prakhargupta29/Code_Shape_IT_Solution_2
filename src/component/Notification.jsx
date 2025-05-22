












// import { useState, useEffect, useRef } from 'react';
// import {
//     FaUserCircle, FaExclamationTriangle, FaFileAlt, FaEnvelope,
//     FaSyncAlt, FaCog, FaCheck, FaTrashAlt
// } from 'react-icons/fa';
// import './Notification.css';

// const generateSampleDates = () => {
//     const now = new Date();
//     return Array.from({ length: 20 }).map((_, i) => {
//         const date = new Date(now);
//         date.setDate(now.getDate() - i);
//         date.setMinutes(date.getMinutes() - i * 10);
//         return date;
//     });
// };
// const sampleDates = generateSampleDates();
// const formatTimeAgo = (date) => {
//     if (!(date instanceof Date) || isNaN(date.getTime())) return 'Just now';

//     const now = new Date();
//     const diffMs = now - date;
//     const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffMinutes = Math.floor(diffMs / (1000 * 60));

//     if (diffMinutes < 1) return 'Just now';
//     if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
//     if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
//     return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
// };

// const formatFullDate = (timestamp) => {
//     const d = new Date(timestamp);
//     if (isNaN(d.getTime())) return 'Invalid Date';
//     return d.toLocaleString(undefined, {
//         year: 'numeric', month: 'short', day: 'numeric',
//         hour: '2-digit', minute: '2-digit', second: '2-digit'
//     });
// };


// const sampleNotifications = sampleDates.map((date, idx) => ({
//     id: 1000 + idx,
//     type: ['user', 'content', 'system', 'message'][idx % 4],
//     title: 'New Notification',
//     detail: `This is a sample notification ${idx + 1}`,
//     read: idx > 5,
//     timestamp: date.getTime(),
// }));

// const NotificationCenter = () => {

//     const [notifications, setNotifications] = useState(() => {
//         const saved = localStorage.getItem('notifications');
//         if (saved) return JSON.parse(saved);

//         // First-time load: use sampleNotifications and save them
//         localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
//         return sampleNotifications;
//     });


//     const [selectedFilter, setSelectedFilter] = useState('All');
//     const [selectedTimeRange, setSelectedTimeRange] = useState('All Time');
//     const [tick, setTick] = useState(0);
//     const prevLengthRef = useRef(notifications.length);

//     useEffect(() => {
//         localStorage.setItem('notifications', JSON.stringify(notifications));
//     }, [notifications]);

//     useEffect(() => {
//         const interval = setInterval(() => setTick(t => t + 1), 60000);
//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         if (notifications.length > prevLengthRef.current) {
//             const audio = new Audio('/notify.mp3');
//             audio.play().catch(err => {
//                 console.warn('Audio playback failed:', err);
//             });
//         }
//         prevLengthRef.current = notifications.length;
//     }, [notifications]);


//     const markAsRead = (id) => {
//         setNotifications((prev) =>
//             prev.map((n) => (n.id === id ? { ...n, read: true } : n))
//         );
//     };

//     const deleteNotification = (id) => {
//         setNotifications((prev) => prev.filter((n) => n.id !== id));
//     };

//     const markAllAsRead = () => {
//         setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//     };

//     const getIcon = (type) => {
//         switch (type) {
//             case 'user': return <FaUserCircle className="icon user" />;
//             case 'system': return <FaExclamationTriangle className="icon system" />;
//             case 'content': return <FaFileAlt className="icon content" />;
//             case 'message': return <FaEnvelope className="icon message" />;
//             default: return null;
//         }
//     };

//     const filterMap = {
//         'All': null,
//         'User Events': 'user',
//         'Content Updates': 'content',
//         'System Alerts': 'system',
//         'Messages': 'message'
//     };

//     const getTimeCutoff = () => {
//         const now = Date.now();
//         switch (selectedTimeRange) {
//             case 'Last 24 Hours': return now - 24 * 60 * 60 * 1000;
//             case 'Last 7 Days': return now - 7 * 24 * 60 * 60 * 1000;
//             case 'Last 30 Days': return now - 30 * 24 * 60 * 60 * 1000;
//             default: return 0;
//         }
//     };

//     const groupByDate = (notifs) => {
//         const groups = {};
//         for (let notif of notifs) {
//             const timestamp = typeof notif.timestamp === 'number' && !isNaN(notif.timestamp)
//                 ? notif.timestamp
//                 : Date.now(); // fallback

//             const dateStr = new Date(timestamp).toDateString();
//             if (!groups[dateStr]) groups[dateStr] = [];
//             groups[dateStr].push({ ...notif, timestamp }); // ensure timestamp is valid
//         }
//         return groups;
//     };

//     const timeCutoff = getTimeCutoff();

//     const filteredNotifications = notifications.filter((n) => {
//         const typeMatch = selectedFilter === 'All' || n.type === filterMap[selectedFilter];
//         const timeMatch = selectedTimeRange === 'All Time' || n.timestamp >= timeCutoff;
//         return typeMatch && timeMatch;
//     });

//     const handleRefresh = () => {
//         const saved = localStorage.getItem('notifications');
//         const parsed = saved ? JSON.parse(saved) : [];
//         setNotifications(parsed.length > 0 ? parsed : sampleNotifications);
//     };

//     const grouped = groupByDate(filteredNotifications);

//     const addTestNotification = () => {
//         const newNotif = {
//             id: Date.now(),
//             type: 'user',
//             title: 'New User Notification',
//             detail: 'This is a dynamically added user notification.',
//             read: false,
//             timestamp: Date.now()
//         };
//         setNotifications(prev => [...prev, newNotif]);
//     };

//     return (
//         <div className="container">
//             <header className="header">
//                 <h1>Notification Center</h1>
//                 <div className="buttons">
//                     <button className="button" onClick={handleRefresh}><FaSyncAlt /> Refresh</button>
//                 </div>

//             </header>

//             <section className="stats-grid">
//                 {['user', 'content', 'system', 'message'].map((type, idx) => (
//                     <div key={idx} className="stat-card">
//                         <div className="stat-icon">{getIcon(type)}</div>
//                         <p className="stat-label">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
//                         <p className="stat-count">{notifications.filter(n => n.type === type).length}</p>
//                     </div>
//                 ))}
//             </section>

//             <section className="filters">
//                 <div className="filter-buttons">
//                     {Object.keys(filterMap).map((label, idx) => (
//                         <button
//                             key={idx}
//                             className={`filter-btn ${selectedFilter === label ? 'active' : ''}`}
//                             onClick={() => setSelectedFilter(label)}
//                         >{label}</button>
//                     ))}
//                 </div>
//             </section>

//             <section className="notifications">
//                 <div className="notifications-header">
//                     <h2>{selectedFilter === 'All' ? 'All Notifications' : selectedFilter}</h2>
//                     <button onClick={markAllAsRead}>Mark all as read</button>
//                 </div>

//                 {filteredNotifications.length === 0 && (
//                     <p style={{ padding: '1rem', color: '#6b7280' }}>
//                         No notifications found for <strong>{selectedFilter}</strong> in <strong>{selectedTimeRange}</strong>.
//                     </p>
//                 )}

//                 {Object.entries(grouped).map(([dateStr, notifs], idx) => (
//                     <div key={idx}>
//                         <h3 className="group-date">{dateStr}</h3>
//                         {notifs.map((notif) => (
//                             <article key={notif.id} className="notification-card">
//                                 <div className="notification-icon">
//                                     {getIcon(notif.type)}
//                                     {!notif.read && <span className="unread-indicator"></span>}
//                                 </div>
//                                 <div className="notification-content">
//                                     <p className="notification-title">{notif.title}</p>
//                                     <p className="notification-message">{notif.detail}</p>
//                                     <p className="notification-time">
//                                         {formatTimeAgo(new Date(notif.timestamp))}<br />
//                                         <small>{formatFullDate(notif.timestamp)}</small>
//                                     </p>
//                                 </div>
//                                 <div className="notification-actions">
//                                     <button onClick={() => markAsRead(notif.id)} title="Mark as read" disabled={notif.read} style={{ opacity: notif.read ? 0.5 : 1 }}>
//                                         <FaCheck />
//                                     </button>
//                                     <button onClick={() => deleteNotification(notif.id)} title="Delete">
//                                         <FaTrashAlt />
//                                     </button>
//                                 </div>
//                             </article>
//                         ))}
//                     </div>
//                 ))}
//             </section>
//         </div>
//     );
// };

// export default NotificationCenter;


import { useState, useEffect, useRef } from 'react';
import {
    FaUserCircle, FaExclamationTriangle, FaFileAlt, FaEnvelope,
    FaSyncAlt, FaCog, FaCheck, FaTrashAlt
} from 'react-icons/fa';
import './Notification.css';

const formatTimeAgo = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return 'Just now';

    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

const formatFullDate = (timestamp) => {
    const d = new Date(timestamp);
    if (isNaN(d.getTime())) return 'Invalid Date';
    return d.toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
};

const NotificationCenter = () => {
    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem('notifications');
        return saved ? JSON.parse(saved) : [];
    });

    const [selectedFilter, setSelectedFilter] = useState('All');
    const [selectedTimeRange, setSelectedTimeRange] = useState('All Time');
    const [tick, setTick] = useState(0);
    const prevLengthRef = useRef(notifications.length);
    const audioRef = useRef(null);

    // Load and cache audio
    useEffect(() => {
        audioRef.current = new Audio('/notify.mp3');
        audioRef.current.load();
    }, []);

    // Save to localStorage when notifications change
    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    // Update every minute for time display
    useEffect(() => {
        const interval = setInterval(() => setTick(t => t + 1), 60000);
        return () => clearInterval(interval);
    }, []);

    // Play sound if notifications increased
    useEffect(() => {
        if (notifications.length > prevLengthRef.current) {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(err => console.warn('Audio playback failed:', err));
            }
        }
        prevLengthRef.current = notifications.length;
    }, [notifications]);

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const deleteNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'user': return <FaUserCircle className="icon user" />;
            case 'system': return <FaExclamationTriangle className="icon system" />;
            case 'content': return <FaFileAlt className="icon content" />;
            case 'message': return <FaEnvelope className="icon message" />;
            default: return null;
        }
    };

    const filterMap = {
        'All': null,
        'User Events': 'user',
        'Content Updates': 'content',
        'System Alerts': 'system',
        'Messages': 'message'
    };

    const getTimeCutoff = () => {
        const now = Date.now();
        switch (selectedTimeRange) {
            case 'Last 24 Hours': return now - 24 * 60 * 60 * 1000;
            case 'Last 7 Days': return now - 7 * 24 * 60 * 60 * 1000;
            case 'Last 30 Days': return now - 30 * 24 * 60 * 60 * 1000;
            default: return 0;
        }
    };

    const groupByDate = (notifs) => {
        const groups = {};
        for (let notif of notifs) {
            const timestamp = typeof notif.timestamp === 'number' && !isNaN(notif.timestamp)
                ? notif.timestamp
                : Date.now();
            const dateStr = new Date(timestamp).toDateString();
            if (!groups[dateStr]) groups[dateStr] = [];
            groups[dateStr].push({ ...notif, timestamp });
        }
        return groups;
    };

    const timeCutoff = getTimeCutoff();

    const filteredNotifications = notifications.filter((n) => {
        const typeMatch = selectedFilter === 'All' || n.type === filterMap[selectedFilter];
        const timeMatch = selectedTimeRange === 'All Time' || n.timestamp >= timeCutoff;
        return typeMatch && timeMatch;
    });

    const handleRefresh = () => {
        const saved = localStorage.getItem('notifications');
        const parsed = saved ? JSON.parse(saved) : [];
        setNotifications(parsed);
    };

    const addTestNotification = () => {
        const newNotif = {
            id: Date.now(),
            type: 'user',
            title: 'New User Notification',
            detail: 'This is a dynamically added user notification.',
            read: false,
            timestamp: Date.now()
        };
        const updated = [...notifications, newNotif];
        setNotifications(updated);
        localStorage.setItem('notifications', JSON.stringify(updated));

    };

    const grouped = groupByDate(filteredNotifications);

    return (
        <div className="container">
            <header className="header">
                <h1>Notification Center</h1>
                <div className="buttons">
                    <button className="button" onClick={handleRefresh}><FaSyncAlt /> Refresh</button>
                    <button className="button" onClick={addTestNotification}><FaCog /> Add Test Notification</button>
                </div>
            </header>

            <section className="filters">
                <div className="filter-buttons">
                    {Object.keys(filterMap).map((label, idx) => (
                        <button
                            key={idx}
                            className={`filter-btn ${selectedFilter === label ? 'active' : ''}`}
                            onClick={() => setSelectedFilter(label)}
                        >{label}</button>
                    ))}
                </div>
            </section>

            <section className="notifications">
                <div className="notifications-header">
                    <h2>{selectedFilter === 'All' ? 'All Notifications' : selectedFilter}</h2>
                    <button onClick={markAllAsRead}>Mark all as read</button>
                </div>

                {filteredNotifications.length === 0 && (
                    <p style={{ padding: '1rem', color: '#6b7280' }}>
                        No notifications found for <strong>{selectedFilter}</strong> in <strong>{selectedTimeRange}</strong>.
                    </p>
                )}

                {Object.entries(grouped).map(([dateStr, notifs], idx) => (
                    <div key={idx}>
                        <h3 className="group-date">{dateStr}</h3>
                        {notifs.map((notif) => (
                            <article key={notif.id} className="notification-card">
                                <div className="notification-icon">
                                    {getIcon(notif.type)}
                                    {!notif.read && <span className="unread-indicator"></span>}
                                </div>
                                <div className="notification-content">
                                    <p className="notification-title">{notif.title}</p>
                                    <p className="notification-message">{notif.detail}</p>
                                    <p className="notification-time">
                                        {formatTimeAgo(new Date(notif.timestamp))}<br />
                                        <small>{formatFullDate(notif.timestamp)}</small>
                                    </p>
                                </div>
                                <div className="notification-actions">
                                    <button onClick={() => markAsRead(notif.id)} title="Mark as read" disabled={notif.read} style={{ opacity: notif.read ? 0.5 : 1 }}>
                                        <FaCheck />
                                    </button>
                                    <button onClick={() => deleteNotification(notif.id)} title="Delete">
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default NotificationCenter;
