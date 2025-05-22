import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Sidebar,
    Menu,
    MenuItem,
} from 'react-pro-sidebar';
import {
    FaTachometerAlt, FaUsers, FaChartBar,
    FaCog, FaBell,FaTasks, FaSignOutAlt, FaUserCircle, FaEdit,
} from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi';
import './Sidebar.css';

const SidebarComponent = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();



    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleToggleSidebar = () => {
        setToggled((prev) => !prev);
    };

    const handleLogout = () => {
        navigate('/'); // 👈 Redirect to AdminLogin
    };

    return (
        <Sidebar
            collapsed={collapsed}
            toggled={toggled}
            onBackdropClick={handleToggleSidebar}
            breakPoint="md"
            transitionDuration={500}
            style={{ height: '100vh', position: 'sticky', top: 0 }}
        >

            <div>
                <div className="sidebar-header" onClick={handleImageClick}>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    <div className="avatar-wrapper">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="avatar-image" />
                        ) : (
                            <FaUserCircle size={50} color="#8b5cf6" />
                        )}
                        <div className="edit-icon">
                            <FaEdit size={16} />
                        </div>
                    </div>

                </div>
                <div className='name'>
                    <h4>Admin</h4>
                    <p>Administrator</p>
                    <span className="online-indicator">
                        <span className="dot"></span> Online
                    </span>
                </div>
            </div>


            <Menu>
                <p className="menu-label">MAIN MENU</p>
                <MenuItem icon={<FaTachometerAlt />} component={<Link to="/dashboard" />} className='menu-button' active={location.pathname === "/dashboard"}>
                    Dashboard
                </MenuItem>
                <MenuItem icon={<FaUsers />} component={<Link to="/Users" />} className="menu-button" active={location.pathname === "/users"}>
                    Users
                </MenuItem>

                <MenuItem icon={<FaChartBar />} component={<Link to="/Report" />} className="menu-button" active={location.pathname === "/Report"}>Report Dashboard</MenuItem>
                <MenuItem icon={<HiOutlineDocumentText />} component={<Link to="/ContentManagement" />} className="menu-button" active={location.pathname === "/ContentManagement"}>Content Management</MenuItem>
                <MenuItem icon={<FaTasks />} component={<Link to="/Todolist" />} className="menu-button" active={location.pathname === "/Todolist"}>
                    TO DO LIST
                </MenuItem>
                <p className="menu-label">SETTINGS</p>
                <MenuItem icon={<FaCog />} component={<Link to="/MaintenanceDashboard" />} className="menu-button" active={location.pathname === "/MaintenanceDashboard"}>General Settings</MenuItem>
                <MenuItem icon={<FaBell />} component={<Link to="/Notification" />} className="menu-button" active={location.pathname === "/Notification"}>Notifications</MenuItem>
            </Menu>

            <Menu style={{ marginTop: 'auto' }}>
                <MenuItem icon={<FaSignOutAlt />} className="logout" onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Sidebar>
    );
};

export default SidebarComponent;

