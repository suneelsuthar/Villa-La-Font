import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import heroBg from "/src/assets/images/hero-background.png";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import calendarIcon from "/src/assets/images/calendar.png";
import { useAppContext } from "../../context/AppContext";
import { DateRangePicker } from "rsuite";
type AvailabilityPeriod = {
  start: string;
  end: string;
  available: number;
  closed_period: { id: number } | null;
  bookings: Array<{ id: number; status: string }>;
};
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
  const [guests, setGuests] = useState(1);
  const [range, setRange] = useState<any>([null, null]);
  const { currency, language, availabilities } = useAppContext();
  const [nights, setNights] = useState(0);
  const [checkInDate, setCheckInDate] = useState<any>(null);
  const [checkOutDate, setCheckOutDate] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

  useEffect(() => {
    if (!availabilities || availabilities.length === 0) {
      return;
    }

    if (!availabilities[0]?.periods) {
      return;
    }

    const unavailableDateStrings = new Set<string>();

    availabilities[0].periods.forEach((period: AvailabilityPeriod) => {
      const hasBookings = period.bookings?.length > 0;

      // Work with date strings directly to avoid timezone issues
      const [startYear, startMonth, startDay] = period.start
        .split("-")
        .map(Number);
      const [endYear, endMonth, endDay] = period.end.split("-").map(Number);

      let currentDate = new Date(startYear, startMonth - 1, startDay);
      const endDate = new Date(endYear, endMonth - 1, endDay);

      while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const dateStr = `${year}-${month}-${day}`;

        if (hasBookings || period.available === 0 || period.closed_period) {
          unavailableDateStrings.add(dateStr);
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    // Convert to Date objects for state (using local timezone)
    const unavailableDatesArray = Array.from(unavailableDateStrings).map(
      (dateStr) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
      }
    );
    setUnavailableDates(unavailableDatesArray);
  }, [availabilities]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper to convert Date to YYYY-MM-DD string in local timezone
  const formatDateToLocalString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isDateDisabled = (date: Date): boolean => {
    const dateString = formatDateToLocalString(date);
    return unavailableDates.some(
      (d) => formatDateToLocalString(d) === dateString
    );
  };

  const countAvailableNights = (startDate: Date, endDate: Date): number => {
    let count = 0;
    const current = new Date(startDate);

    // Loop through each day in the range
    while (current <= endDate) {
      if (!isDateDisabled(current)) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    return count - 1; // Subtract 1 because we're counting nights, not days
  };

  const formatDateForLodgify = (dateString: string): string => {
    if (!dateString) return "";
    return dateString;
  };
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
                <div className="col-md-6 mb-3">
                  <label className="h-form-label" style={{ color: "#ffffff" }}>
                    Check-in
                  </label>
                  <div className="res_field_sec">
                    <p
                      className={
                        checkInDate ? "_res_inpu_value" : "place_res_inpu_value"
                      }
                      style={{ color: checkInDate ? "#ffffff" : "#D7D7D7" }}
                    >
                      {checkInDate ? checkInDate : "dd-mm-yyyy"}
                    </p>
                    <DateRangePicker
                      showHeader={false}
                      showMeridiem={false}
                      ranges={[]}
                      showOneCalendar={isMobile} // This will be true on mobile, false on desktop
                      value={range}
                      onChange={(date: any) => {
                        if (date && date[0] && date[1]) {
                          const startDate = new Date(date[0]);
                          const endDate = new Date(date[1]);

                          // Count only available nights
                          const availableNights = countAvailableNights(
                            startDate,
                            endDate
                          );

                          // Format dates using local timezone
                          const formattedStartDate =
                            formatDateToLocalString(startDate);
                          const formattedEndDate =
                            formatDateToLocalString(endDate);

                          setRange([startDate, endDate]);
                          setCheckInDate(formattedStartDate);
                          setCheckOutDate(formattedEndDate);
                          setNights(availableNights);
                        } else {
                          setRange(date);
                        }
                      }}
                      disabledDate={isDateDisabled}
                      className="h-input-container d-flex align-items-center justify-content-between"
                      format="dd-MM-yyyy"
                      placeholder="dd-MM-yyyy"
                      cleanable={false}
                      caretAs={() => (
                        <img src={calendarIcon} height={24} width={24} />
                      )}
                    />
                  </div>
                </div>

                {/* CHECK-OUT */}
                <div className="col-md-6 mb-3">
                  <label className="h-form-label" style={{ color: "#ffffff" }}>
                    Check-out
                  </label>
                  <div className="res_field_sec">
                    <p
                      className={
                        checkInDate ? "_res_inpu_value" : "place_res_inpu_value"
                      }
                      style={{ color: checkInDate ? "#ffffff" : "#D7D7D7" }}
                    >
                      {checkOutDate ? checkOutDate : "dd-mm-yyyy"}
                    </p>
                    <DateRangePicker
                      showHeader={false}
                      showMeridiem={false}
                      value={range}
                      placement="bottomEnd"
                      showOneCalendar={isMobile} // This will be true on mobile, false on desktop
                      onChange={(date: any) => {
                        if (date && date[0] && date[1]) {
                          const startDate = new Date(date[0]);
                          const endDate = new Date(date[1]);

                          // Count only available nights
                          const availableNights = countAvailableNights(
                            startDate,
                            endDate
                          );

                          // Format dates using local timezone
                          const formattedStartDate =
                            formatDateToLocalString(startDate);
                          const formattedEndDate =
                            formatDateToLocalString(endDate);

                          setRange([startDate, endDate]);
                          setCheckInDate(formattedStartDate);
                          setCheckOutDate(formattedEndDate);
                          setNights(availableNights);
                        } else {
                          setRange(date);
                        }
                      }}
                      className="h-input-container d-flex align-items-center justify-content-between"
                      format="dd-MM-yyyy"
                      placeholder="dd-MM-yyyy"
                      disabledDate={isDateDisabled}
                      cleanable={false}
                      caretAs={() => (
                        <img src={calendarIcon} height={24} width={24} />
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* CHECK-IN */}

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
                    onClick={() => setGuests((prev) => Math.min(8, prev + 1))}
                    disabled={guests >= 8}
                  >
                    +
                  </button>
                </div>
                {guests >= 8 && (
                  <small className="text-white mt-1 d-block">
                    Maximum 8 guests allowed
                  </small>
                )}
              </div>

              {/* --- Nights + Price --- */}
              <div className="d-flex justify-content-between align-items-center pt-3 pb-4">
                <span className="h-form-label">{nights} Nights</span>
              </div>

              {/* CTA BUTTON */}
              <Button
                variant="outline-light"
                size="lg"
                className="h-form-booknow mb-4"
                onClick={() => {
                  if (!checkInDate || !checkOutDate || guests < 1) {
                    alert("Please fill in all required fields");
                    return;
                  }

                  const formattedCheckIn = formatDateForLodgify(checkInDate);
                  const formattedCheckOut = formatDateForLodgify(checkOutDate);

                  const url = `https://checkout.lodgify.com/${language}/villastrias/506741/reservation?adults=${guests}&currency=${currency}&slug=villastrias&arrival=${formattedCheckIn}&departure=${formattedCheckOut}`;

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
  // padding: 0 15px;
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
