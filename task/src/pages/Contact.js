import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && message) {
      const mailtoLink = `mailto:22pa1a12@vishnu.edu.in?subject=Task Management Web App Feedback&body=Email: ${email}%0D%0AMessage: ${message}`;
      window.location.href = mailtoLink;
      setShowSuccess(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="text-center">Contact Us</h3>
      <Form onSubmit={handleSubmit}>
        {showSuccess && (
          <Alert variant="success" className="text-center">
            Your message has been sent successfully!
          </Alert>
        )}
        {showError && (
          <Alert variant="danger" className="text-center">
            Please fill in both email and message fields.
          </Alert>
        )}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your problem or feedback"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Contact;
