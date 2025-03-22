import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { listHighRiskCustomers } from '../actions/customerActions';
import ChurnTrend from '../components/churntrend';
import RiskDistribution from '../components/riskdistribution';
import HighRiskCustomers from '../components/HighRiskCustomers';
import InterventionEffectiveness from '../components/InterventionEffectiveness';

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const highRiskCustomerList = useSelector((state) => state.highRiskCustomerList);
  const { loading, error, customers } = highRiskCustomerList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(listHighRiskCustomers());
    }
  }, [dispatch, history, userInfo]);

  // Calculate metrics
  const totalCustomers = 4827; // Will come from an API in the real app
  const highRiskCount = customers ? customers.length : 0;
  const retentionRate = 87; // Will come from an API in the real app
  const savedRevenue = 142800; // Will come from an API in the real app

  return (
    <>
      <h1>Dashboard</h1>
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center p-3">
            <h1>{totalCustomers}</h1>
            <h4>Total Customers</h4>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 bg-danger text-white">
            <h1>{highRiskCount}</h1>
            <h4>High Churn Risk</h4>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 bg-success text-white">
            <h1>{retentionRate}%</h1>
            <h4>Retention Rate</h4>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 bg-warning">
            <h1>${savedRevenue.toLocaleString()}</h1>
            <h4>Saved Revenue</h4>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <Card.Header>Churn Prediction Trends</Card.Header>
            <Card.Body>
              <ChurnTrend />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Risk Distribution</Card.Header>
            <Card.Body>
              <RiskDistribution />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>High-Risk Customers</Card.Header>
            <Card.Body>
              <HighRiskCustomers customers={customers} loading={loading} error={error} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>Intervention Effectiveness</Card.Header>
            <Card.Body>
              <InterventionEffectiveness />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Churn Factors</Card.Header>
            <Card.Body>
              {/* Churn Factors Component will go here */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardScreen;