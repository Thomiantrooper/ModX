import { Container, Col, Button } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#333',color: '#fff', padding: '2rem 0' }}>
      <Container>
        <Col md={3} style={{ float: 'left',color: '#fff', marginRight: '100px' }}>
          <h3>SUBSCRIBE</h3>
          <p>Download our App and get extra 15% Discount on your first Order..</p>
          <Button variant="outline-secondary">Get it on Google play</Button>{' '}
          <Button variant="outline-secondary">Download on the App Store</Button>
        </Col>
        <Col md={3} style={{ float: 'left',color: '#fff', marginRight: '120px' }}>
          <h3>QUICK LINKS</h3>
          <ul style={{ listStyle: 'none',color: '#fff', padding: 0 }}>
            <li><a href="https://vegahelmets.com">Vega helmet</a></li>
            <li><a href="https://axorhelmets.com">Axor helmet</a></li>
            <li><a href="https://studdshelmets.com">Studds helmet</a></li>
            <li><a href="/Blog">Blogs</a></li>
          </ul>
        </Col>
        <Col md={3} style={{ float: 'left',color: '#fff', marginRight: '150px' }}>
          <h3>INFORMATION</h3>
          <ul style={{ listStyle: 'none',color: '#fff', padding: 0 }}>
            <li><a href="/About">Privacy Policy</a></li>
            <li><a href="/About">Refund Policy</a></li>
            <li><a href="/About">Shipping Policy</a></li>
            <li><a href="/About">Terms of Service</a></li>
            <li><a href="/About">FAQ</a></li>
            <li><a href="/Contact">Contact Us</a></li>
          </ul>
        </Col>
        <Col md={3} style={{ float: 'left',color: '#fff', marginRight: '80px' }}>
          <h3>CONTACT</h3>
          <ul style={{ listStyle: 'none',color: '#fff', padding: 0 }}>
            <li>No. 1259 Freedom. New York, 11111</li>
            <li>+91-987654321</li>
            <li><a href="mailto:Demo@Exampledemo.com">Demo@Exampledemo.com</a></li>
          </ul>
        </Col>
        <div style={{ clear: 'both' }}></div>
      </Container>
    </footer>
  );
};

export default Footer;
