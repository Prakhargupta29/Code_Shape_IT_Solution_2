

import React, { useState } from 'react';
import './Maintenance.css';
import {
    FaServer, FaDatabase, FaPlug, FaHdd,
    FaMicrochip, FaShieldAlt
} from 'react-icons/fa';

const getInitialStatusData = () => ([
    {
        title: 'Server Status',
        subtitle: 'Main Application Server',
        value: '98.7%',
        color: '#22c55e',
        icon: <FaServer style={{ color: '#32cd32' }} />,
    },
    {
        title: 'Database Status',
        subtitle: 'Primary Database',
        value: '99.9%',
        color: '#22c55e',
        icon: <FaDatabase style={{ color: '#32cd32' }} />,
    },
    {
        title: 'API Status',
        subtitle: 'External API Services',
        value: '95.2%',
        color: '#facc15',
        icon: <FaPlug style={{ color: 'FFA500' }} />,
    },
    {
        title: 'Storage Status',
        subtitle: 'File Storage System',
        value: '78.5%',
        color: '#facc15',
        icon: <FaHdd style={{ color: 'FFA500' }} />,
    },
    {
        title: 'Cache Status',
        subtitle: 'Redis Cache System',
        value: '100%',
        color: '#22c55e',
        icon: <FaMicrochip style={{ color: '#32cd32' }} />,
    },
    {
        title: 'Security Status',
        subtitle: 'Firewall & Security Systems',
        value: '75%',
        critical: true,
        alerts: 1,
        color: '#ef4444',
        icon: <FaShieldAlt style={{ color: '#ff0000' }} />,
    },
]);

const getInitialResources = () => ([
    { name: 'CPU Usage', value: 45, color: '#3b82f6' },
    { name: 'Memory Usage', value: 68, color: '#eab308' },
    { name: 'Disk I/O', value: 32, color: '#10b981' },
    { name: 'Network Traffic', value: 87, color: '#ef4444' },
]);

const getRandomValue = (min, max) => (Math.random() * (max - min) + min).toFixed(1);

const updates = [
    { id: 1, name: 'Patch v1.0.3', status: 'Applied', date: 'May 10, 2025' },
    { id: 2, name: 'Security Update 2.1', status: 'Scheduled', date: 'June 1, 2025' },
    { id: 3, name: 'Critical Fix 3.2.1', status: 'Applied', date: 'April 28, 2025' },
    { id: 4, name: 'Firewall Patch 4.0', status: 'Scheduled', date: 'June 15, 2025' },
];

const logs = [
    { time: '10:24:11', severity: 'INFO', message: 'Scheduled maintenance completed.' },
    { time: '10:25:33', severity: 'WARN', message: 'High memory usage detected.' },
    { time: '10:26:50', severity: 'ERROR', message: 'API timeout on /user route.' },
    { time: '10:28:02', severity: 'INFO', message: 'Patch v1.0.3 applied successfully.' },
    { time: '10:29:45', severity: 'INFO', message: 'System scan completed.' },
];

const SystemUpdates = () => (
    <div className="card">
        <h3>System Updates</h3>
        <table className="updates-table">
            <thead>
                <tr>
                    <th>Update</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {updates.map(update => (
                    <tr key={update.id}>
                        <td>{update.name}</td>
                        <td>
                            <span className={`status-tag ${update.status.toLowerCase()}`}>
                                {update.status}
                            </span>
                        </td>
                        <td>{update.date}</td>
                        <td>
                            {update.status === 'Applied' ? (
                                <button className="rollback-btn" disabled>Rollback</button>
                            ) : '—'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const SystemLogs = () => (
    <div className="card logs-tab">
        <h3>System Logs</h3>
        <div className="logs-container">
            {logs.map((log, index) => (
                <div key={index} className={`log-entry ${log.severity.toLowerCase()}`}>
                    <span className="log-time">{log.time}</span>
                    <span className="log-severity">{log.severity}</span>
                    <span className="log-message">{log.message}</span>
                </div>
            ))}
        </div>
    </div>
);

const MaintenanceDashboard = () => {
    const [statusData, setStatusData] = useState(getInitialStatusData());
    const [resources, setResources] = useState(getInitialResources());
    const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());
    const [activeTab, setActiveTab] = useState('status');

    const refreshData = () => {
        const updatedStatus = statusData.map(item => {
            if (item.critical) return item;
            const newVal = getRandomValue(70, 100);
            const newColor = newVal < 80 ? '#facc15' : (newVal < 90 ? '#facc15' : '#22c55e');
            return { ...item, value: `${newVal}%`, color: newColor };
        });

        const updatedResources = resources.map(r => ({
            ...r,
            value: parseInt(getRandomValue(20, 95)),
        }));

        setStatusData(updatedStatus);
        setResources(updatedResources);
        setLastUpdated(new Date().toLocaleString());
    };

    return (
        <div className="dashboard">
            <h2>System Maintenance Dashboard</h2>
            <button className="refresh-btn" onClick={refreshData}>🔄 Refresh Data</button>

            <div className="tabs">
                <button
                    className={activeTab === 'status' ? 'active' : ''}
                    onClick={() => setActiveTab('status')}>
                    System Status
                </button>
                <button
                    className={activeTab === 'updates' ? 'active' : ''}
                    onClick={() => setActiveTab('updates')}>
                    System Updates
                </button>
                <button
                    className={activeTab === 'logs' ? 'active' : ''}
                    onClick={() => setActiveTab('logs')}>
                    System Logs
                </button>
            </div>



            <div className="tab-content">
                {activeTab === 'status' && (
                    <>
                        <div className="system-overview card">
                            <h3>System Overview</h3>
                            <p>Last updated: {lastUpdated}</p>
                            <div className="legend">
                                <span><span className="dot green" /> Operational</span>
                                <span><span className="dot yellow" /> Warning</span>
                                <span><span className="dot red" /> Critical</span>
                            </div>
                        </div>

                        <div className="status-grid">
                            {statusData.map((item, index) => (
                                <div key={index} className="status-card card">
                                    <div className="status-top">
                                        <div>
                                            <h4>{item.title}</h4>
                                            <p>{item.subtitle}</p>
                                        </div>
                                        <div className="icon-and-chart">
                                            <div className="icon">{item.icon}</div>
                                            <div className="progress-ring">
                                                <svg viewBox="0 0 36 36">
                                                    <path className="bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                    <path className="progress" stroke={item.color} strokeDasharray={`${item.value.replace('%', '')}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                </svg>
                                                <span>{item.critical ? item.alerts : item.value}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p>{item.critical ? 'Critical Alert' : 'Uptime'}</p>
                                </div>
                            ))}
                        </div>

                        <div className="resources card">
                            <h3>System Resources</h3>
                            {resources.map((r, i) => (
                                <div key={i} className="resource-bar">
                                    <div className="label">
                                        <span>{r.name}</span>
                                        <span>{r.value}%</span>
                                    </div>
                                    <div className="bar-bg">
                                        <div className="bar-fill" style={{ width: `${r.value}%`, backgroundColor: r.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {activeTab === 'updates' && <SystemUpdates />}
                {activeTab === 'logs' && <SystemLogs />}
            </div>
        </div>
    );
};

export default MaintenanceDashboard;



