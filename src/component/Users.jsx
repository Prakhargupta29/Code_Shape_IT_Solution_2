
// import { useState, useEffect } from 'react';
// import './Users.css';
// // import { AlignCenter } from 'lucide-react';

// const Users = () => {
//     const [users, setUsers] = useState(() => {
//         const storedUsers = localStorage.getItem('users');
//         return storedUsers ? JSON.parse(storedUsers) : [
//             { id: 1, name: 'Alice Smith', role: 'Writer', joiningDate: '2025-05-18' },
//             { id: 2, name: 'Bob Miller', role: 'Editor', joiningDate: '2025-05-18' }
//         ];
//     });

//     const [newUser, setNewUser] = useState({ name: '', role: '' });
//     const [editingUserId, setEditingUserId] = useState(null);
//     const [editedName, setEditedName] = useState('');
//     const [editedRole, setEditedRole] = useState('');

//     useEffect(() => {
//         localStorage.setItem('users', JSON.stringify(users));
//     }, [users]);

//     // Helper to get today's date as YYYY-MM-DD
//     const getTodayDate = () => {
//         const today = new Date();
//         return today.toISOString().slice(0, 10);
//     };

//     const handleAddUser = () => {
//         if (newUser.name && newUser.role) {
//             const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
//             const newUserObj = {
//                 ...newUser,
//                 id: newId,
//                 joiningDate: getTodayDate()
//             };

//             // Add user
//             setUsers(prevUsers => [...prevUsers, newUserObj]);
//             setNewUser({ name: '', role: '' });

//             // Add notification to localStorage
//             const notifString = localStorage.getItem('notifications');
//             let notifs = notifString ? JSON.parse(notifString) : [];

//             // Create new notification
//             const newNotif = {
//                 id: notifs.length > 0 ? notifs[notifs.length - 1].id + 1 : 1,
//                 type: 'user',
//                 title: 'New user registered',
//                 detail: `${newUser.name} created a new account with role ${newUser.role}`,
//                 time: 'Just now',
//                 read: false,
//                 date: getTodayDate() // optional, to support sorting/filtering by date
//             };

//             notifs = [newNotif, ...notifs]; // add at beginning so newest first

//             // Save back to localStorage
//             localStorage.setItem('notifications', JSON.stringify(notifs));
//         }
//     };


//     const handleDeleteUser = (id) => {
//         const userToDelete = users.find(user => user.id === id);
//         const updatedUsers = users.filter(user => user.id !== id);
//         setUsers(updatedUsers);

//         if (userToDelete) {
//             const notifString = localStorage.getItem('notifications');
//             let notifs = notifString ? JSON.parse(notifString) : [];

//             const newNotif = {
//                 id: notifs.length > 0 ? notifs[0].id + 1 : 1,
//                 type: 'user',
//                 title: 'User deleted',
//                 detail: `${userToDelete.name} with role ${userToDelete.role} was removed`,
//                 time: 'Just now',
//                 read: false,
//                 date: getTodayDate()
//             };

//             notifs = [newNotif, ...notifs];
//             localStorage.setItem('notifications', JSON.stringify(notifs));
//         }
//     };


//     const handleEditUser = (user) => {
//         setEditingUserId(user.id);
//         setEditedName(user.name);
//         setEditedRole(user.role);
//     };

//     const handleSaveEdit = (id) => {
//         const updatedUsers = users.map(user =>
//             user.id === id ? { ...user, name: editedName, role: editedRole } : user
//         );
//         setUsers(updatedUsers);
//         setEditingUserId(null);
//     };

//     const handleCancelEdit = () => {
//         setEditingUserId(null);
//     };

//     // Returns initials like "AS" from "Alice Smith"
//     const getInitials = (fullName) => {
//         const names = fullName.trim().split(' ');
//         const first = names[0]?.charAt(0).toUpperCase() || '';
//         const last = names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : '';
//         return first + last;
//     };

//     return (
//         <div className="users-container">
//             <h2>User Management</h2>

//             <div className="add-user-form">
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={newUser.name}
//                     onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Role"
//                     value={newUser.role}
//                     onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//                 />
//                 <button onClick={handleAddUser}>Add User</button>
//             </div>
//             <div className="table-responsive">
//                 <table className="users-table">
//                     <thead>
//                         <tr>
//                             <th>Initials</th>
//                             <th>Name</th>
//                             <th>Role</th>
//                             <th>Joining Date</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user) => (
//                             <tr key={user.id}>
//                                 <td data-label="Initials">
//                                     <div className="user-initials-circle">{getInitials(user.name)}</div>
//                                 </td>
//                                 <td data-label="Name">
//                                     {editingUserId === user.id ? (
//                                         <input
//                                             type="text"
//                                             value={editedName}
//                                             onChange={(e) => setEditedName(e.target.value)}
//                                         />
//                                     ) : (
//                                         user.name
//                                     )}
//                                 </td>
//                                 <td data-label="Role">
//                                     {editingUserId === user.id ? (
//                                         <input
//                                             type="text"
//                                             value={editedRole}
//                                             onChange={(e) => setEditedRole(e.target.value)}
//                                         />
//                                     ) : (
//                                         user.role
//                                     )}
//                                 </td>
//                                 <td data-label="Joining Date">{user.joiningDate}</td>
//                                 <td data-label="Actions">
//                                     {editingUserId === user.id ? (
//                                         <div className="action-buttons">
//                                             <button onClick={() => handleSaveEdit(user.id)}>Save</button>
//                                             <button onClick={handleCancelEdit}>Cancel</button>
//                                         </div>
//                                     ) : (
//                                         <div className="action-buttons">
//                                             <button className="edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
//                                             <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
//                                         </div>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Users;


import { useState, useEffect, useRef } from 'react';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState(() => {
        const storedUsers = localStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers) : [
            { id: 1, name: 'Alice Smith', role: 'Writer', joiningDate: '2025-05-18' },
            { id: 2, name: 'Bob Miller', role: 'Editor', joiningDate: '2025-05-18' }
        ];
    });

    const [newUser, setNewUser] = useState({ name: '', role: '' });
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedRole, setEditedRole] = useState('');

    const audioRef = useRef(null); // 🔊 Ref for audio

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().slice(0, 10);
    };

    const playNotificationSound = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err => console.warn("Sound play failed:", err));
        }
    };

    const handleAddUser = () => {
        if (newUser.name && newUser.role) {
            const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
            const newUserObj = {
                ...newUser,
                id: newId,
                joiningDate: getTodayDate()
            };

            setUsers(prevUsers => [...prevUsers, newUserObj]);
            setNewUser({ name: '', role: '' });

            const notifString = localStorage.getItem('notifications');
            let notifs = notifString ? JSON.parse(notifString) : [];

            const newNotif = {
                id: notifs.length > 0 ? notifs[0].id + 1 : 1,
                type: 'user',
                title: 'New user registered',
                detail: `${newUser.name} created a new account with role ${newUser.role}`,
                time: 'Just now',
                read: false,
                date: getTodayDate()
            };

            notifs = [newNotif, ...notifs];
            localStorage.setItem('notifications', JSON.stringify(notifs));

            playNotificationSound(); // 🔊 Play sound on user added
        }
    };

    const handleDeleteUser = (id) => {
        const userToDelete = users.find(user => user.id === id);
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);

        if (userToDelete) {
            const notifString = localStorage.getItem('notifications');
            let notifs = notifString ? JSON.parse(notifString) : [];

            const newNotif = {
                id: notifs.length > 0 ? notifs[0].id + 1 : 1,
                type: 'user',
                title: 'User deleted',
                detail: `${userToDelete.name} with role ${userToDelete.role} was removed`,
                time: 'Just now',
                read: false,
                date: getTodayDate()
            };

            notifs = [newNotif, ...notifs];
            localStorage.setItem('notifications', JSON.stringify(notifs));

            playNotificationSound(); // 🔊 Play sound on user deleted
        }
    };

    const handleEditUser = (user) => {
        setEditingUserId(user.id);
        setEditedName(user.name);
        setEditedRole(user.role);
    };

    const handleSaveEdit = (id) => {
        const updatedUsers = users.map(user =>
            user.id === id ? { ...user, name: editedName, role: editedRole } : user
        );
        setUsers(updatedUsers);
        setEditingUserId(null);
    };

    const handleCancelEdit = () => {
        setEditingUserId(null);
    };

    const getInitials = (fullName) => {
        const names = fullName.trim().split(' ');
        const first = names[0]?.charAt(0).toUpperCase() || '';
        const last = names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : '';
        return first + last;
    };

    return (
        <div className="users-container">
            <h2>User Management</h2>

            {/* 🔊 Audio element for notification */}
            <audio ref={audioRef} src="/notify.mp3" preload="auto" />

            <div className="add-user-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Role"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                />
                <button onClick={handleAddUser}>Add User</button>
            </div>

            <div className="table-responsive">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Initials</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Joining Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td data-label="Initials">
                                    <div className="user-initials-circle">{getInitials(user.name)}</div>
                                </td>
                                <td data-label="Name">
                                    {editingUserId === user.id ? (
                                        <input
                                            type="text"
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                        />
                                    ) : (
                                        user.name
                                    )}
                                </td>
                                <td data-label="Role">
                                    {editingUserId === user.id ? (
                                        <input
                                            type="text"
                                            value={editedRole}
                                            onChange={(e) => setEditedRole(e.target.value)}
                                        />
                                    ) : (
                                        user.role
                                    )}
                                </td>
                                <td data-label="Joining Date">{user.joiningDate}</td>
                                <td data-label="Actions">
                                    {editingUserId === user.id ? (
                                        <div className="action-buttons">
                                            <button onClick={() => handleSaveEdit(user.id)}>Save</button>
                                            <button onClick={handleCancelEdit}>Cancel</button>
                                        </div>
                                    ) : (
                                        <div className="action-buttons">
                                            <button className="edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
                                            <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;

