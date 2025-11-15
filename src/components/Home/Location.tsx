import { Container, Row, Col } from "react-bootstrap";

type LocationProps = {
  title?: string;
  description?: string;
  mapSrc?: string;
};

const Location = ({ 
  title = "OUR LOCATION", 
  description = "Feel completely private and peaceful in the hills, yet you are just minutes from the action. The villa is perfectly located to explore Pollença's historic old town, local supermarkets, and the beautiful north coast.", 
  mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7703.685411442059!2d3.008243011227028!3d39.87557741609948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x129639a3778a62e3%3A0xa00c12e44e0f640!2sPollen%C3%A7a%2C%20Balearic%20Islands%2C%20Spain!5e0!3m2!1sen!2s!4v1730781000000!5m2!1sen!2s"
}: LocationProps) => {
  return (
    <section className="location-section py-5">
      <Container id="location-section">
        {/* Section Title and Description */}
        <Row className="justify-content-center" style={{ marginBottom: 40 }}>
          <Col lg={4}>
            <h2 className="sec-title mb-3 mx-md-0 mx-3">{title}</h2>
          </Col>
          <Col lg={8}>
            <p className="booknow-description">{description}</p>
          </Col>
        </Row>

        {/* Map Display */}
        <Row className="justify-content-center">
          <Col lg={12}>
            <div className="map-container">
              <iframe
                title="Villa La Font Location"
                src={mapSrc}
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: "15px" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Location;
