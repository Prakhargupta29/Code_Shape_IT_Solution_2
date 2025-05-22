import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'Editor' }
  ]);
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', role: '' });

  const handleSave = () => {
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setShow(false);
  };

  const handleDelete = id => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h2>User Management</h2>
      <Button className="mb-3" onClick={() => setShow(true)}>Add User</Button>
      <Table bordered>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton><Modal.Title>Add User</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" onChange={e => setNewUser({ ...newUser, role: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Users;