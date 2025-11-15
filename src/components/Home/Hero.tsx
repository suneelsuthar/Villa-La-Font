import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import heroBg from "/src/assets/images/hero-background.png";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import calendarIcon from "/src/assets/images/calendar.png";
import { useAppContext } from "../../context/AppContext";
/* ---------- SplitText Utility ---------- */
const SplitText = ({
  text,
  className,
  delay = 0,
  wordDelay = 0.08,
  style,
}: any) => {
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block", overflow: "hidden", ...style }}
    >
      {text.split(" ").map((word: any, i: any) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: delay + i * wordDelay,
            duration: 0.9,
            ease: "backOut",
          }}
          style={{ display: "inline-block", marginRight: "8px" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Hero = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const { currency, language } = useAppContext();
  const [nights, setNights] = useState(0);

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

      setNights(diff > 0 ? diff : 0);
    }
  }, [checkIn, checkOut]);


  return (
    <section
      className="hero-section position-relative"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
      id="home"
    >
      {/* Background */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -2,
        }}
      />
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: -1,
        }}
      />

      <Container>
        <Row className="align-items-center justify-content-between">
          {/* LEFT SIDE */}
          <Col lg={7} md={12} className="mobile-view gap-3">
            <div className="text-start">
              <SplitText
                text="FIND YOUR ESCAPE "
                className={`d-block font-300 h-heading text-white`}
                delay={0.2}
                style={{ letterSpacing: 0 }}
              />

              <SplitText
                text="VILLA LA FONT"
                className={`d-block h-title text-white`}
                style={{
                  fontWeight: 500,
                  letterSpacing: 0,
                  fontFamily: "Cormorant",
                }}
                delay={0.6}
              />

              <SplitText
                text="The ultimate private villa experience in Pollença."
                className={`d-block font-300 hero-subtitle text-white`}
                delay={0.8}
                wordDelay={0.05}
              />
            </div>
          </Col>

          {/* RIGHT SIDE - Booking Card */}
          <Col lg={5} md={12}>
            <div className="h-form p-4">
              <h2 className="mb-1 form-title pt-3">Villa La Font</h2>
              <p className="mb-4 form-lable">Balearic Islands, Spain</p>

              <div className="row">
                {/* CHECK-IN */}
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 mb-3">
                  <label className="h-form-label">Check-in</label>
                  <div
                    className="h-input-container d-flex align-items-center justify-content-between"
                    onClick={() =>
                      document.getElementById("checkInInput")?.click()
                    }
                  >
                    <div className="d-flex align-items-center gap-2">
                      <img src={calendarIcon} alt="" height={24} width={24} />
                      <span
                        style={{
                          color: checkIn ? "#FFF" : "#D7D7D7",
                        }}
                      >
                        {checkIn
                          ? new Date(checkIn).toLocaleDateString()
                          : "dd-mm-yyyy"}
                      </span>
                    </div>
                    <input
                      id="checkInInput"
                      type="date"
                      className="h-input"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
                    />
                  </div>
                </div>

                {/* CHECK-OUT */}
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 mb-3">
                  <label className="h-form-label">Check-out</label>
                  <div
                    className="h-input-container d-flex align-items-center justify-content-between"
                    onClick={() =>
                      document.getElementById("checkOutInput")?.click()
                    }
                  >
                    <div className="d-flex align-items-center gap-2">
                      <img src={calendarIcon} alt="" height={24} width={24} />
                      <span
                        style={{
                          color: checkOut ? "#FFF" : "#D7D7D7",
                        }}
                      >
                        {checkOut
                          ? new Date(checkOut).toLocaleDateString()
                          : "dd-mm-yyyy"}
                      </span>
                    </div>
                    <input
                      id="checkOutInput"
                      type="date"
                      className="h-input"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split("T")[0]} // Can't select before check-in
                    />
                  </div>
                </div>
              </div>

              {/* --- GUESTS FIELD --- */}
              <div className="mb-4">
                <label className="h-form-label">Guests</label>

                <div className="h-input-container d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className="guest-btn"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                  >
                    −
                  </button>

                  <span className="h-guests text-white">{guests}</span>

                  <button
                    type="button"
                    className="guest-btn"
                    onClick={() => setGuests(guests + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* --- Nights + Price --- */}
              <div className="d-flex justify-content-between align-items-center pt-3 pb-4">
                <span className="h-form-label">{nights} Nights</span>
                {/* <span className="h-form-price">${price}</span> */}
              </div>

              {/* CTA BUTTON */}
              <Button
                variant="outline-light"
                size="lg"
                className="h-form-booknow mb-4"
                onClick={() => {
                  if (!checkIn || !checkOut || guests < 1) {
                    alert("Please fill in all required fields");
                    return;
                  }

                  const url = `https://checkout.lodgify.com/${language}/villastrias/506741/reservation?adults=1&currency=${currency}&slug=villastrias&arrival=${checkIn}&departure=${checkOut}`;

                  window.open(url);
                }}
              >
                Book Now
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <style>{`
        .title {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: #2c3e50;
          font-family: "Montserrat";
        }

        .subtitle {
          font-size: 55px;
          color: #7f8c8d;
          max-width: 800px;
          line-height: 1.6;
        }
        /* Add these styles to Home.module.css */
        .h-heading {
          font-size: 55px;
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }

        .h-title {
          font-size: 50px;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          font-weight: var(--font-semibold);
          font-family: "Cormorant" !important;
        }

        .h-subtitle {
          font-size: 18px;
          max-width: 90%;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.5);
          font-weight: var(--font-light);
        }

        .form-title {
          font-family: "Cormorant" !important;
          font-size: 33px;
          font-weight: var(--font-semibold);
          color: #FFFFFF;
        }

        .form-lable {
          /* font-family: "Montserrat" !important; */
          font-size: 15px;
          font-weight: var(--font-light);
          color: #FFFFFF;

        }

        .h-form {
          background-color: #ECECEC1A;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius:15px;
        }

        .h-input {
          opacity: 0;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          cursor: "pointer";
         


        }

        .h-input-container {
  border: 1px solid rgba(169, 169, 169, 1);
  height: 54px !important;
  padding: 0 15px;
  position: relative;
  cursor: pointer;
  border-radius: 0x;
   font-family: var(--font-primary) !important;
          font-weight: var(--font-regular) !important;
}
        .h-form-label {
          font-size: 16px;
          font-weight: var(--font-light);
          font-family: var(--font-primary);
          color: #FFFFFF;
        }
        .h-form-booknow {
          border: 1px solid rgba(169, 169, 169, 1);
          height: 54px;
          padding-left: 10px;
          padding-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          font-weight: var(--font-regular);
          font-size: 15px;
          text-transform: uppercase;
          font-family: var(--font-primary);
          border-radius: 0px;
        }
          .h-form-booknow:hover{
          background-color: #ffffff !important;
          color: #000000 !important;
          }

        .h-form-price {
          font-weight: var(--font-semibold);
          font-family: var(--font-primary);
          color: #FFFFFF;
        }

        .h-guests {
          font-weight: var(--font-light);
          font-family: var(--font-primary);
          font-size: 23px;
        }
        /* ✅ Responsive adjustments */
        @media (max-width: 991px) {
         
        .h-subtitle{
        font-size:16px !important
        }
          .h-heading {
            font-size: 30px;
            letter-spacing:0px;
            margin-bottom:10px

          }
          .h-title {
            font-size: 36px;
            margin-bottom:10px;
            font-family: "Cormorant" !important;


          }

          .hero-subtitle {
            font-size: 16px;
          }

          .h-form {
            padding: 2rem !important;
            margin-bottom: 20px;
          }
        }

        @media (max-width: 768px) {
 
          .hero-subtitle {
            font-size: 15px;
            line-height: 1.4;
          }

          .h-form {
            width: 100%;
            padding: 1.5rem !important;
            margin-bottom: 20px;
          }

          .h-form-booknow {
            font-size: 14px;
          }

          .h-guests {
            font-size: 20px;
          }
          .mobile-view {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: left;
            margin-top:100px;
            margin-bottom:30px
          }
        }
           .css-1h2fvt2{
            margin-top:25px !important
            }

        @media (max-width: 576px) {
          .h-title {
            font-size: 30px;
            font-family: "Cormorant" !important;
          }
            .css-khkv60{
            display:flex;
            flex-direction:row;
            flex-direction:column
            }
            .css-hd63sv{
            margin-top:30px
            }
           

          .hero-subtitle {
            font-size: 16px;
            margin-bottom:20px
          }

          .h-form-label {
            font-size: 14px;
          }

          .h-form-booknow {
            font-size: 13px;
            height: 48px;
          }
        }
          .guest-btn {
  background: none;
  border: none;
  font-size: 25px;
  color: #fff;
  cursor: pointer;
  width: 40px;
  text-align: center;
}

.h-input-container {
  border: 1px solid rgba(169, 169, 169, 1);
  height: 54px;
}

.h-input {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* Hide the calendar icon that appears in some browsers */
.h-input::-webkit-calendar-picker-indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  cursor: pointer;
  opacity: 0;
}

      `}</style>
    </section>
  );
};

export default Hero;
