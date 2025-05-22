import SidebarComponent from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="d-flex">
            <SidebarComponent />
            <main>
                <Outlet />
            </main>

        </div>
    );
};

export default Layout;


