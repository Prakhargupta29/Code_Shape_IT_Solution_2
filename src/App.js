import './App.css';
import AdminLogin from './component/AdminLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./component/Dashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './component/Users';
import Layout from './component/layout';
import MaintenanceDashboard from "./component/MaintenanceDashboard";
import Notification from './component/Notification';
import ContentManagement from './component/ContentManagement';
import Report from './component/Report';
import Todolist from './component/Todolist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route element={<Layout />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Todolist" element={<Todolist />} />
          <Route path="/Report" element={<Report/>} />
          <Route path="/MaintenanceDashboard" element={<MaintenanceDashboard/>} />
          <Route path="/Notification" element={<Notification/>} />
          <Route path="/ContentManagement" element={<ContentManagement/>} />
        </Route>
      </Routes>
      </Router>
  );
}

export default App;




