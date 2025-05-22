import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard Overview</h2>
      <Row className="mt-4">
        <Col><Card body>User Stats: 150</Card></Col>
        <Col><Card body>Posts: 34</Card></Col>
        <Col><Card body>System Uptime: 99.9%</Card></Col>
      </Row>
    </div>
  );
}

export default Dashboard;