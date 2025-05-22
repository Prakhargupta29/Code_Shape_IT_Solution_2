import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

function Content() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'First Post', category: 'News' }
  ]);
  const [show, setShow] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', category: '' });

  const handleAdd = () => {
    setPosts([...posts, { id: Date.now(), ...newPost }]);
    setShow(false);
  };

  const handleDelete = id => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div>
      <h2>Content Management</h2>
      <Button className="mb-3" onClick={() => setShow(true)}>Add Content</Button>
      <Table bordered>
        <thead>
          <tr><th>ID</th><th>Title</th><th>Category</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.category}</td>
              <td><Button variant="danger" size="sm" onClick={() => handleDelete(post.id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton><Modal.Title>Add Content</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" onChange={e => setNewPost({ ...newPost, title: e.target.value })} />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" onChange={e => setNewPost({ ...newPost, category: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAdd}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Content;