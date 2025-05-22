import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [{
    label: 'User Activity',
    data: [12, 19, 3, 5, 2],
    backgroundColor: 'rgba(54, 162, 235, 0.6)',
  }]
};

const doughnutData = {
  labels: ['Posts', 'Pages', 'Media'],
  datasets: [{
    label: 'Content Type',
    data: [10, 5, 2],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
  }]
};

function Reports() {
  return (
    <div>
      <h2>Reporting & Analytics</h2>
      <Row className="mt-4">
        <Col md={6}>
          <Card body><h5>User Behavior</h5><Bar data={barData} /></Card>
        </Col>
        <Col md={6}>
          <Card body><h5>Content Distribution</h5><Doughnut data={doughnutData} /></Card>
        </Col>
      </Row>
    </div>
  );
}

export default Reports;