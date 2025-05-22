import { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import Navbar from "./Navbar";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import "./Dashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = ({ timeFormat = "24hr" }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [hasNewNotifications, setHasNewNotifications] = useState(false);
    const toggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    useEffect(() => {
        document.body.classList.toggle("dark-theme", darkMode);
        document.body.classList.toggle("light-theme", !darkMode);
    }, [darkMode]);


    useEffect(() => {
        const timer = setTimeout(() => {
            setHasNewNotifications(true);
        }, 5000); // 5 seconds after load
        return () => clearTimeout(timer);
    }, []);

    const clearNotifications = () => {
        setHasNewNotifications(false);
    };



    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    const barLabels = ["Jan", "Feb", "Mar", "Apr", "May"];
    const usersData = [50, 100, 150, 80, 120];
    const postsData = [60, 90, 140, 70, 110];
    const commentsData = [30, 70, 130, 50, 90];
    const likesData = [40, 80, 120, 60, 100];

    const barData = {
        labels: barLabels,
        datasets: [
            { label: "Users Gained", data: usersData, backgroundColor: "#007bff" },
            { label: "Posts Created", data: postsData, backgroundColor: "#28a745" },
            { label: "Comments Made", data: commentsData, backgroundColor: "#ffc107" },
            { label: "Likes Given", data: likesData, backgroundColor: "#dc3545" },
        ],
    };

    // helping function for handing the greeting
    const getGreeting = (date, format) => {
        let hour;

        if (format === "12hr") {
            // Extract hour in 12hr format (AM/PM awareness)
            hour = date.getHours(); // This still gives 0-23, but let's format greeting accordingly
        } else {
            hour = date.getHours();
        }

        if (hour >= 5 && hour < 12) return "Good Morning";
        if (hour >= 12 && hour < 17) return "Good Afternoon";
        if (hour >= 17 && hour < 22) return "Good Evening";
        return "Good Night";
    };


    const formatTime = (date) => {
        if (timeFormat === "12hr") {
            return date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
            });
        } else {
            return date.toLocaleTimeString("en-GB"); // 24hr format
        }
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Activity Metrics Over Months" },
        },
        scales: {
            x: { ticks: { font: { size: 10 } } },
            y: { ticks: { font: { size: 10 } } },
        },
    };

    const doughnutData = {
        labels: ["Users", "Posts", "Comments", "Likes"],
        datasets: [
            {
                label: "Activity Breakdown",
                data: [120, 300, 500, 200],
                backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
            },
        ],
    };

    const cards = [
        {
            title: "Total Users",
            icon: "👤",
            count: 120,
            change: "+12%",
            bgColor: "rgba(0, 123, 255, 0.1)",
            textColor: "#007bff",
        },
        {
            title: "Total Posts",
            icon: "📝",
            count: 300,
            change: "+8%",
            bgColor: "rgba(127, 215, 148, 0.1)",
            textColor: "#28a745",
        },
        {
            title: "Comments",
            icon: "💬",
            count: 500,
            change: "-5%",
            bgColor: "rgba(255, 193, 7, 0.1)",
            textColor: "#ffc107",
        },
        {
            title: "Likes",
            icon: "❤️",
            count: 200,
            change: "+20%",
            bgColor: "rgba(220, 53, 69, 0.1)",
            textColor: "#dc3545",
        },
    ];

    return (
        <div className={`container-fluid ${darkMode ? "dark-mode" : "light-mode"}`}>
            <Navbar
                toggleTheme={toggleTheme}
                darkMode={darkMode}
                hasNewNotifications={hasNewNotifications}
                clearNotifications={clearNotifications}
                greeting={getGreeting(currentTime, timeFormat)} // <-- Add this
            />

            <div className="container py-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="mb-0">Dashboard</h2>
                    <div className="text-end mb-3">
                        <div className="date-time-display">
                            <div className="date-row">📅 {currentTime.toLocaleDateString()}</div>
                            <div className="time-row">🕒 {formatTime(currentTime)}</div>
                        </div>
                    </div>

                </div>

                {/* Cards Section */}
                <div className="row g-3">
                    {cards.map((item, index) => (
                        <div key={index} className="col-12 col-sm-6 col-lg-3">
                            <div
                                className="card dashboard-card text-dark p-3 h-100"
                                style={{
                                    backgroundColor: item.bgColor,
                                    border: `1px solid ${item.textColor}`,
                                }}
                            >
                                <div className="watermark-icon">{item.icon}</div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6 style={{ color: item.textColor }}>{item.title}</h6>
                                    <span
                                        className={`fw-bold ${item.change.startsWith("+") ? "text-success" : "text-danger"}`}
                                    >
                                        {item.change.startsWith("+") ? "▲" : "▼"} {item.change}
                                    </span>
                                </div>
                                <h4 className="mt-2">{item.count}</h4>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="row g-4 mt-2">
                    <div className="col-12 col-lg-6">
                        <div className="card p-3 h-100">
                            <h5 className="mb-3">System Metrics - Bar Chart</h5>
                            <div style={{ position: "relative", width: "100%", height: "300px" }}>
                                <Bar data={barData} options={barOptions} />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="card p-3 h-100">
                            <h5 className="mb-3">Activity Breakdown - Doughnut Chart</h5>
                            <div style={{ position: "relative", width: "100%", height: "300px" }}>
                                <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

