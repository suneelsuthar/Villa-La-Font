import { Container, Row, Col } from "react-bootstrap";
import Img1 from "../../assets/images/amenties-1.png";
import Img2 from "../../assets/images/amanties-2.png";
import guestsImg from "/src/assets/images/guests.svg";
import bedRoomImg from "/src/assets/images/bedrooms.svg";
import bedsImg from "/src/assets/images/beds.svg";
import bothRoomImg from "/src/assets/images/bathrooms.svg";

// Define a type for the InfoCard to improve reusability and avoid repetitive code
type InfoCardProps = {
  imgSrc: string;
  number: number;
  label: string;
};

const InfoCard = ({ imgSrc, number, label }: InfoCardProps) => (
  <Col xs={6}>
    <div className="info-card text-center p-4">
      <img src={imgSrc} alt={label} />
      <h4 className="info-number">{number}</h4>
      <p className="info-label">{label}</p>
    </div>
  </Col>
);

const AmenitiesSection = () => {
  return (
    <section className="villa-section" id="info">
      <Container>
        {/* Section Title and Description */}
        <Row className="mb-4 mt-4">
          <Col lg={5} md={12} className="mb-md-4 mb-md-0">
            <h2 className="villa-heading">ESCAPE TO THE HILLS OF MALLORCA</h2>
          </Col>
          <Col lg={7} md={12} className="mb-md-0">
            <p className="villa-description">
              Tucked into the peaceful hills just above Pollença and only 4 km
              from the sparkling beaches of northern Mallorca, Villa La Font is
              a private retreat designed for families and groups seeking space,
              comfort, and natural beauty.
            </p>
          </Col>
        </Row>

        {/* Info Cards */}
        <Row className="align-items-center">
          <Col lg={5} md={12} className="mb-4 mb-md-4 mb-sm-0">
            <Row className="g-3">
              <InfoCard imgSrc={guestsImg} number={8} label="Guests" />
              <InfoCard imgSrc={bedRoomImg} number={5} label="Bedrooms" />
              <InfoCard imgSrc={bedsImg} number={6} label="Beds" />
              <InfoCard imgSrc={bothRoomImg} number={5} label="Bathrooms" />
            </Row>
          </Col>

          {/* Image Gallery */}
          <Col lg={7} md={12}>
            <Row className="g-3">
              <Col xs={5} md={5}>
                <div className="villa-image-box">
                  <img src={Img1} alt="Pool" className="villa-image" />
                </div>
              </Col>
              <Col xs={7} md={7}>
                <div className="villa-image-box">
                  <img src={Img2} alt="Villa View" className="villa-image-2" />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AmenitiesSection;
