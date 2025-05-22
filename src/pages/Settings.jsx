import React from 'react';
import { Form, Card } from 'react-bootstrap';

function Settings() {
  return (
    <div>
      <h2>Settings & Configuration</h2>
      <Card body className="mb-3">
        <Form.Check type="switch" label="Enable Notifications" />
        <Form.Check type="switch" label="Auto-Update" />
        <Form.Check type="switch" label="Enable Third-Party Integration" />
      </Card>
    </div>
  );
}

export default Settings;