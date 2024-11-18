import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const About = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                About Task Management Web App
              </Card.Title>
              <Card.Text>
                <strong>Task Management Web App</strong> is a simple yet
                efficient tool for managing your daily tasks. The app allows
                users to:
              </Card.Text>
              <ul>
                <li>Add new tasks with deadlines and descriptions.</li>
                <li>Edit existing tasks, including their completion status.</li>
                <li>Delete tasks that are no longer needed.</li>
                <li>Mark tasks as completed when finished.</li>
              </ul>
              <Card.Text>
                This app is designed to help individuals stay organized and keep
                track of their tasks with ease. Whether you are a student,
                professional, or anyone who needs to manage tasks, this app will
                help you stay on top of your responsibilities.
              </Card.Text>
              <Button variant="primary" href="/" className="w-100">
                Go to Home
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
