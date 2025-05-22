
import  { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './ReportDashboard.css';
import { FaFileCsv, FaFilePdf, FaFileExcel, FaEnvelope } from 'react-icons/fa';

const Report = () => {
    const [activeTab, setActiveTab] = useState('logins');
    const [theme, setTheme] = useState('light');
    const [filterDate, setFilterDate] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const summaryCards = [
        { title: 'Total Users', value: '120', change: '+12%', icon: '👥', color: 'bg-blue-100' },
        { title: 'Total Content/Posts', value: '300', change: '+8%', icon: '📄', color: 'bg-purple-100' },
        { title: 'Monthly Active Users', value: '1,824', change: '+5%', icon: '📊', color: 'bg-blue-200' },
        { title: 'Total Revenue', value: '$124,582', change: '-3%', icon: '💵', color: 'bg-green-100' }
    ];

    const contentPerformance = [
        { title: "10 Tips for Better Productivity", type: "Blog Post", views: 24853, ctr: "8.4%", time: "4m 12s" },
        { title: "Getting Started Tutorial", type: "Video", views: 18429, ctr: "6.2%", time: "8m 37s" },
        { title: "Design Inspiration Gallery", type: "Image Collection", views: 15742, ctr: "9.1%", time: "3m 48s" },
        { title: "2023 Industry Report", type: "PDF Document", views: 12385, ctr: "4.8%", time: "12m 22s" },
    ];

    const userLoginData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'User Logins',
            data: [125, 132, 158, 142, 165, 300, 315],
            borderColor: '#6C63FF',
            fill: false,
            tension: 0.4
        }]
    };

    const avgEngagementData = {
        labels: contentPerformance.map(item => item.title),
        datasets: [{
            label: 'Avg. Engagement Time (minutes)',
            data: contentPerformance.map(item => {
                const [min, sec] = item.time.split('m').map(s => parseFloat(s));
                return (min || 0) + (sec ? sec / 60 : 0);
            }),
            backgroundColor: '#4ade80'
        }]
    };

    const contentData = {
        labels: ['Likes', 'Comments', 'Shares', 'Saves', 'Views'],
        datasets: [{
            label: 'Interactions',
            data: [14000, 8000, 6000, 4000, 42000],
            backgroundColor: ['#8b5cf6', '#60a5fa', '#34d399', '#fbbf24', '#f87171']
        }]
    };

    const userDistributionData = {
        labels: ['New Users', 'Returning Users', 'Premium Users', 'Trial Users'],
        datasets: [{
            data: [40, 30, 20, 10],
            backgroundColor: ['#8b5cf6', '#60a5fa', '#34d399', '#fbbf24']
        }]
    };

    const activeUsers = [
        { name: 'Sarah Johnson', email: 'sarah.j@example.com', sessions: 128, time: '24m 18s', actions: 1284, date: '2024-07-01' },
        { name: 'Michael Chen', email: 'michael.c@example.com', sessions: 112, time: '18m 42s', actions: 956, date: '2024-07-02' },
        { name: 'Olivia Wilson', email: 'olivia.w@example.com', sessions: 98, time: '15m 36s', actions: 842, date: '2024-07-03' },
        { name: 'James Rodriguez', email: 'james.r@example.com', sessions: 87, time: '12m 54s', actions: 723, date: '2024-07-04' }
    ];

    const filteredData = filterDate
        ? activeUsers.filter(user => user.date === filterDate)
        : activeUsers;

    const handleExportCSV = () => {
        const rows = filteredData.map(user => ({
            Name: user.name,
            Email: user.email,
            Sessions: user.sessions,
            AvgTime: user.time,
            Actions: user.actions
        }));

        const csvContent = [
            ["Name", "Email", "Sessions", "AvgTime", "Actions"],
            ...rows.map(obj => Object.values(obj))
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "active_users_report.csv";
        link.click();
    };

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Active Users");
        XLSX.writeFile(workbook, "active_users_report.xlsx");
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text("Most Active Users Report", 14, 15);
        const tableColumn = ["Name", "Email", "Sessions", "Avg. Time", "Actions"];
        const tableRows = filteredData.map(user => [
            user.name,
            user.email,
            user.sessions,
            user.time,
            user.actions
        ]);
        doc.autoTable({
            startY: 20,
            head: [tableColumn],
            body: tableRows
        });
        doc.save("active_users_report.pdf");
    };

    const handleEmailReport = () => {
        alert("Report emailed successfully! (simulation)");
    };



    const revenueData = [
        { month: 'January', basic: 5000, pro: 10000, enterprise: 3000 },
        { month: 'February', basic: 6000, pro: 11000, enterprise: 5000 },
        { month: 'March', basic: 7000, pro: 12000, enterprise: 6000 },
        { month: 'April', basic: 6500, pro: 12500, enterprise: 5000 },
        { month: 'May', basic: 7200, pro: 13000, enterprise: 5800 },
        { month: 'June', basic: 8000, pro: 13500, enterprise: 6500 },
    ];

    const exportToCSV = () => {
        const rows = revenueData.map(row => ({
            Month: row.month,
            'Basic Plan': row.basic,
            'Pro Plan': row.pro,
            Enterprise: row.enterprise,
            Total: row.basic + row.pro + row.enterprise
        }));

        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Revenue");
        XLSX.writeFile(wb, "Revenue_Report.csv");
    };

    const exportToExcel = () => {
        const rows = revenueData.map(row => ({
            Month: row.month,
            'Basic Plan': row.basic,
            'Pro Plan': row.pro,
            Enterprise: row.enterprise,
            Total: row.basic + row.pro + row.enterprise
        }));

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Revenue");

        // This writes and downloads the Excel file directly
        XLSX.writeFile(workbook, "Revenue_Report.xlsx");
    };


    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Revenue Report", 14, 20);

        const tableData = revenueData.map(row => [
            row.month,
            `$${row.basic}`,
            `$${row.pro}`,
            `$${row.enterprise}`,
            `$${row.basic + row.pro + row.enterprise}`
        ]);

        doc.autoTable({
            head: [['Month', 'Basic Plan', 'Pro Plan', 'Enterprise', 'Total']],
            body: tableData,
            startY: 30,
        });

        doc.save("Revenue_Report.pdf");
    };



    // For performance table export
    const handlePerformanceExportCSV = () => {
        const rows = contentPerformance.map(item => ({
            Title: item.title,
            Type: item.type,
            Views: item.views,
            CTR: item.ctr,
            AvgTime: item.time
        }));

        const csvContent = [
            ["Title", "Type", "Views", "CTR", "AvgTime"],
            ...rows.map(obj => Object.values(obj))
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "performance_report.csv";
        link.click();
    };

    const handlePerformanceExportExcel = () => {
        const rows = contentPerformance.map(item => ({
            Title: item.title,
            Type: item.type,
            Views: item.views,
            CTR: item.ctr,
            "Avg. Time": item.time
        }));
        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Performance");
        XLSX.writeFile(workbook, "performance_report.xlsx");
    };

    const handlePerformanceExportPDF = () => {
        const doc = new jsPDF();
        doc.text("Top Performing Content", 14, 15);
        const tableColumn = ["Title", "Type", "Views", "CTR", "Avg. Time"];
        const tableRows = contentPerformance.map(item => [
            item.title, item.type, item.views, item.ctr, item.time
        ]);
        doc.autoTable({
            startY: 20,
            head: [tableColumn],
            body: tableRows
        });
        doc.save("performance_report.pdf");
    };

    return (
        <div className={`p-6 space-y-8 full-width-container ${theme === 'dark' ? 'dark' : ''}`}>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Report Summary</h2>
            </div>


            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 summary-cards">
                {summaryCards.map((card, i) => {
                    const isPositive = card.change.includes('+');
                    return (
                        <div key={i} className={`rounded-xl p-4 shadow ${card.color} card-hover`}>
                            <div className="text-xl font-semibold">{card.icon} {card.title}</div>
                            <div className="text-2xl font-bold">{card.value}</div>
                            <div className="change-wrapper">
                                <span className={isPositive ? 'positive' : 'negative'}>
                                    {isPositive ? '▲' : '▼'} {card.change}
                                </span>
                                <span className="neutral">from last month</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-4 mt-8">
                <button onClick={() => setActiveTab("logins")} className={`tab-button ${activeTab === "logins" ? "active-tab" : ""}`}>User Logins</button>
                <button onClick={() => setActiveTab("performance")} className={`tab-button ${activeTab === "performance" ? "active-tab" : ""}`}>Content Performance</button>
                <button onClick={() => setActiveTab("revenue")} className={`tab-button ${activeTab === "revenue" ? "active-tab" : ""}`}>Revenue Reports</button>
            </div>

            {/* Tab Content */}
            {activeTab === "logins" && (
                <div className="space-y-6">
                    <div className="rounded-xl bg-white shadow p-4 dark:bg-gray-800">
                        <h3 className="text-xl font-semibold mb-2">User Logins</h3>
                        <Line data={userLoginData} />
                    </div>

                    <div className="rounded-xl bg-white shadow p-4 dark:bg-gray-800">
                        <h3 className="text-xl font-semibold mb-2">User Distribution</h3>
                        <Doughnut data={userDistributionData} />
                    </div>

                    <div className="rounded-xl bg-white shadow p-4 overflow-auto dark:bg-gray-800">
                        <h3 className="text-xl font-semibold mb-2">Most Active Users</h3>
                        <table className="w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="text-left p-2">User</th>
                                    <th className="text-center p-2">Sessions</th>
                                    <th className="text-center p-2">Avg. Time</th>
                                    <th className="text-center p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((user, i) => (
                                    <tr key={i} className="border-t">
                                        <td className="p-2">{user.name}<br /><small>{user.email}</small></td>
                                        <td className="text-center p-2">{user.sessions}</td>
                                        <td className="text-center p-2">{user.time}</td>
                                        <td className="text-center p-2">{user.actions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                    <h3 className="text-xl font-semibold mt-8">Export Reports</h3>
                    <br></br>
                    <div className="export-grid">
                        <button onClick={handleExportCSV} className="export-button"><FaFileCsv className="export-icon" />Export as CSV</button>
                        <button onClick={handleExportPDF} className="export-button"><FaFilePdf className="export-icon" />Export as PDF</button>
                        <button onClick={handleExportExcel} className="export-button"><FaFileExcel className="export-icon" />Export as Excel</button>
                        <button onClick={handleEmailReport} className="export-button"><FaEnvelope className="export-icon" />Email Report</button>
                    </div>
                </div>
            )}

            {activeTab === "performance" && (
                <div className="space-y-6">
                    <div className="rounded-xl bg-white shadow p-4 dark:bg-gray-800">
                        <h3 className="text-xl font-semibold mb-2">Content Interaction</h3>
                        <Bar data={contentData} />
                    </div>

                    <div className="rounded-xl bg-white shadow p-4 dark:bg-gray-800">
                        <h3 className="text-xl font-semibold mb-2">Average Engagement Time</h3>
                        <Bar data={avgEngagementData} />
                    </div>

                    <div className="rounded-xl bg-white shadow p-4 overflow-auto dark:bg-gray-800">
                        <h3 className="text-xl font-semibold mb-2">Top Performing Content</h3>
                        <table className="w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="text-left p-2">Content Title</th>
                                    <th className="text-center p-2">Views</th>
                                    <th className="text-center p-2">CTR</th>
                                    <th className="text-center p-2">Avg. Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contentPerformance.map((item, idx) => (
                                    <tr key={idx} className="border-t">
                                        <td className="p-2">{item.title}<br /><small>{item.type}</small></td>
                                        <td className="text-center p-2">{item.views.toLocaleString()}</td>
                                        <td className="text-center p-2">{item.ctr}</td>
                                        <td className="text-center p-2">{item.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="export-grid mt-4">
                        <button onClick={handlePerformanceExportCSV} className="export-button">
                            <FaFileCsv className="export-icon" /> Export as CSV
                        </button>
                        <button onClick={handlePerformanceExportPDF} className="export-button">
                            <FaFilePdf className="export-icon" /> Export as PDF
                        </button>
                        <button onClick={handlePerformanceExportExcel} className="export-button">
                            <FaFileExcel className="export-icon" /> Export as Excel
                        </button>
                    </div>
                </div>
            )}

            {activeTab === "revenue" && (
                <div className="space-y-6">
                    <div className="rounded-xl bg-white shadow p-4 dark:bg-gray-800">
                        <h3 className="text-xl font-semibold mb-2">Revenue Over Time</h3>
                        <Line data={{
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [{
                                label: 'Monthly Revenue ($)',
                                data: [18000, 22000, 25000, 24000, 26000, 28000],
                                borderColor: '#10b981',
                                backgroundColor: '#6ee7b7',
                                fill: true,
                                tension: 0.4
                            }]
                        }} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="rounded-xl bg-white shadow p-4 dark:bg-gray-800">
                            <h3 className="text-xl font-semibold mb-2">Revenue by Service</h3>
                            <Bar data={{
                                labels: ['Consulting', 'Subscription', 'Ads', 'Courses'],
                                datasets: [{
                                    label: 'Revenue ($)',
                                    data: [12000, 18000, 8000, 10000],
                                    backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171']
                                }]
                            }} />
                        </div>

                        <div className="rounded-xl bg-white shadow p-4 dark:bg-gray-800">
                            <h3 className="text-xl font-semibold mb-2">Revenue by Subscription Type</h3>
                            <Doughnut data={{
                                labels: ['Basic Plan', 'Pro Plan', 'Enterprise'],
                                datasets: [{
                                    data: [20000, 35000, 15000],
                                    backgroundColor: ['#8b5cf6', '#10b981', '#f59e0b']
                                }]
                            }} />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white shadow p-4 overflow-auto dark:bg-gray-800">
                        <h3 className="text-xl font-semibold mb-2">Revenue Summary</h3>
                        <table className="w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="text-left p-2">Month</th>
                                    <th className="text-center p-2">Basic Plan</th>
                                    <th className="text-center p-2">Pro Plan</th>
                                    <th className="text-center p-2">Enterprise</th>
                                    <th className="text-center p-2">Total</th>
                                    <th className="text-center p-2">Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { month: 'January', basic: 5000, pro: 10000, enterprise: 3000 },
                                    { month: 'February', basic: 6000, pro: 11000, enterprise: 5000 },
                                    { month: 'March', basic: 7000, pro: 12000, enterprise: 6000 },
                                    { month: 'April', basic: 6500, pro: 12500, enterprise: 5000 },
                                    { month: 'May', basic: 7200, pro: 13000, enterprise: 5800 },
                                    { month: 'June', basic: 8000, pro: 13500, enterprise: 6500 },
                                ].map((row, i, arr) => {
                                    const total = row.basic + row.pro + row.enterprise;
                                    const prevTotal = i > 0 ? arr[i - 1].basic + arr[i - 1].pro + arr[i - 1].enterprise : total;
                                    const growth = i > 0 ? (((total - prevTotal) / prevTotal) * 100).toFixed(1) + '%' : '—';
                                    return (
                                        <tr key={i} className="border-t">
                                            <td className="p-2">{row.month}</td>
                                            <td className="text-center p-2">${row.basic.toLocaleString()}</td>
                                            <td className="text-center p-2">${row.pro.toLocaleString()}</td>
                                            <td className="text-center p-2">${row.enterprise.toLocaleString()}</td>
                                            <td className="text-center p-2 font-semibold">${total.toLocaleString()}</td>
                                            <td className={`text-center p-2 ${parseFloat(growth) > 0 ? 'text-green-600' : 'text-red-500'}`}>{growth}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                    <h3 className="text-xl font-semibold mt-8">Export Reports</h3>
                    <br></br>

                    <div className="export-grid">
                        <button
                            onClick={exportToCSV}
                            className="export-button"
                        ><FaFileCsv className="export-icon" />
                            Export CSV
                        </button>
                        <button
                            onClick={exportToExcel}
                            className="export-button"
                        ><FaFilePdf className="export-icon" />
                            Export Excel
                        </button>
                        <button
                            onClick={exportToPDF}
                            className="export-button"
                        ><FaFileExcel className="export-icon" />
                            Export PDF
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Report;


