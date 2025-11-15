import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/booking.css";
import Stepper from "../components/Booking/Stepper.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar, FiUser } from "react-icons/fi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaPaypal } from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";
import { CiBank } from "react-icons/ci";
import penIcon from "/src/assets/images/pen.svg";
import bookingBg from "/src/assets/images/bookingBg.png";
import footerLogo from "/src/assets/images/footerlogo.svg";
import secureIcon from "/src/assets/images/secure.svg";
import bedroomIcon from "/src/assets/images/b-bedroom.svg";
import bedIcon from "/src/assets/images/b-bed.svg";
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState("Credit card");
  const isMobile = useIsMobile();
  const [seeMore, setSeeMore] = useState(isMobile);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const steps = ["Your Dates", "Your Details", "Payment"];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateNights = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const pricePerNight = 350; // Example price
  const totalPrice = nights * pricePerNight;

  return (
    <div className="b-container container-fluid">
      {/* <Header /> */}
      <div className="b-header ">
        <div className="container d-flex justify-content-between align-items-center py-3 px-4">
          <h2 className="b-brand">
            <img src={footerLogo} className="header_logo" />
          </h2>
          <div className="b-header-links d-flex align-items-center">
            <img src={secureIcon} style={{ marginRight: 5 }} />
            <span className="me-4"> Secure Booking</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      <div className="row b-main-section pt-5">
        {/* Left Section */}
        <div
          className="col-lg-8 col-md-7 b-left-section p-0 "
          style={{ borderRight: "1px solid #E5E7EB" }}
        >
          <div className="p-md-5">
            <div className="form-steps-container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="b-villa-card mb-4"
              >
                <div className="property-info-section mb-4 p-4 border rounded-0 d-flex align-items-center">
                  <div className="d-flex align-items-start">
                    <div>
                      <h4 className="b-property-title mb-1">Villa La Font</h4>
                      <p className="small mb-2 text-white b-subtitle">
                        Luxury villa · Saint-Tropez
                      </p>
                      <div className="d-flex flex-wrap gap-3">
                        <div className="d-flex align-items-center b-header-lable">
                          <img src={bedroomIcon} />
                          <span className="ms-2">5 Bedrooms</span>
                        </div>
                        <div className="d-flex align-items-center b-header-lable">
                          <span className="ms-2">5 Bathrooms</span>
                        </div>
                        <div className="d-flex align-items-center b-header-lable">
                          <img src={bedIcon} />
                          <span className="ms-2">6 Beds</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <Stepper steps={steps} currentStep={currentStep} />
            </div>

            <motion.div
              className="b-booking-form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {currentStep === 0 && (
                <>
                  <h3 className="b-form-title mb-3">SELECT YOUR DATES</h3>
                  <p className="b-subtitle mb-4" style={{ color: "#6A7282" }}>
                    Choose when you'd like to stay at Villa La Font
                  </p>

                  <h3 className="b-form-subtitle mb-3">Your trip</h3>

                  <div className="row g-4 mb-4">
                    <div className="col-md-6 b-input-field">
                      <label className="b-form-label">Check-in</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date: any) => setStartDate(date)}
                        startDate={startDate}
                        endDate={endDate}
                        // type="date"
                        minDate={new Date()}
                        className="b-input-field"
                        placeholderText="Check-in"
                      />
                      <div className="b-input-icon">
                        <FiCalendar fontSize={20} color="#99A1AF" />
                      </div>
                    </div>
                    <div className="col-md-6 b-input-field">
                      <label className="b-form-label">Check-out</label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date: any) => setEndDate(date)}
                        startDate={startDate}
                        minDate={startDate || new Date()}
                        // type="date"
                        icon={<FiCalendar fontSize={20} color="#99A1AF" />}
                        className="b-input-field"
                        placeholderText="Check-out"
                      />
                      <div className="b-input-icon">
                        <FiCalendar
                          fontSize={20}
                          color="#99A1AF"
                          // color={index === currentStep ? "#2C3E50" : "#99A1AF"}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-5">
                        <label className="b-form-label">Guests</label>
                        <div className="input-group b-guest-container">
                          <input
                            type="text"
                            value={`${guests} ${
                              guests === 1 ? "guest" : "guests"
                            }`}
                            readOnly
                            className="text-center border-0 outline-none b-guest-input"
                          />
                          <button
                            type="button"
                            className="btn b-guest-btn"
                            onClick={() =>
                              setGuests((prev) => Math.max(1, prev - 1))
                            }
                          >
                            -
                          </button>
                          <button
                            type="button"
                            className="btn b-guest-btn"
                            onClick={() => setGuests((prev) => prev + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <h3 className="b-form-title mb-3">YOUR INFORMATION</h3>
                  <p className="b-subtitle mb-4" style={{ color: "#6A7282" }}>
                    Enter your contact details
                  </p>

                  <div className="row g-3">
                    <div className="col-md-12">
                      <label className="b-form-label">Email address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control form-control-lg b-form-fields"
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="form-control form-control-lg b-form-fields"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="form-control form-control-lg b-form-fields"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-control form-control-lg b-form-fields"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <h3 className="b-form-title mb-3">PAYMENT DETAILS</h3>

                  {/* Your Trip Section */}
                  <div className="mb-4">
                    <h3 className="b-form-subtitle mb-3">Your trip</h3>
                    <div className="row g-3">
                      <div className="col-6">
                        <div className="b-trip-box d-flex justify-content-between align-items-center p-3 border">
                          <div>
                            <p className="small mb-1 b-trip-lable">Dates</p>
                            <p className="mb-0 b-selected-date">
                              {startDate && endDate
                                ? `${startDate.toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                  })} - ${endDate.toLocaleDateString(
                                    undefined,
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}`
                                : "Select dates"}
                            </p>
                          </div>
                          <img
                            src={penIcon}
                            alt=""
                            onClick={() => setCurrentStep(0)}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="b-trip-box d-flex justify-content-between align-items-center p-3 border">
                          <div>
                            <p className="small  mb-1 b-trip-lable">Guests</p>
                            <p className="mb-0 b-selected-date">
                              {guests} {guests === 1 ? "guest" : "guests"}
                            </p>
                          </div>
                          <img
                            src={penIcon}
                            alt=""
                            onClick={() => setCurrentStep(1)}
                          />
                          {/* <i className="bi bi-pencil text-muted"></i> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Tabs */}
                  <div className="mb-4">
                    <h3 className="b-form-subtitle mb-3">Pay with</h3>

                    <div className="d-flex flex-wrap gap-2">
                      {[
                        { name: "Credit card", icon: "bi-credit-card" },
                        { name: "PayPal", icon: "bi-paypal" },
                        { name: "Bank transfer", icon: "bi-bank" },
                      ].map(({ name, icon }) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => setPaymentMethod(name)}
                          className={`b-payment-tab-btn btn d-flex align-items-center justify-content-center flex-fill py-3 ${
                            paymentMethod === name
                              ? "b-tab-active"
                              : "b-tab-inactive border"
                          }`}
                        >
                          {name === "Credit card" ? (
                            <FiCreditCard />
                          ) : name === "PayPal" ? (
                            <FaPaypal />
                          ) : (
                            <CiBank />
                          )}
                          <i className={`bi ${icon} me-2`}></i>
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Common Payment Fields */}

                  <div className="mb-3">
                    <h3
                      className="b-form-subtitle mb-3"
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      Credit Card
                    </h3>
                    <label className="b-form-label payment-field-lable">
                      CARD NUMBER
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg b-form-fields"
                      placeholder="4141 4656 8987 4523"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="b-form-label payment-field-lable">
                      CARD HOLDER
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg b-form-fields"
                      placeholder="Tran Mai Tri Tam"
                    />
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="b-form-label payment-field-lable">
                        EXPIRATION DATE
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg b-form-fields"
                        placeholder="MM / YY"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="b-form-label payment-field-lable">
                        CVC
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg b-form-fields"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  {/* Policy Section */}
                  <div className="mt-4">
                    <h6 className="b-policy-title">Cancellation policy</h6>
                    <p className="small mb-3 policy-desc">
                      • 100% of paid prepayments refundable when canceled 60
                      day(s) before arrival or earlier.
                      <br />• 0% refundable if canceled after.
                    </p>

                    <h6 className="b-policy-title">Security deposit policy</h6>
                    <p className="small policy-desc mb-3">
                      A pre-authorization of EUR 600 is held on 1 day(s) before
                      arrival and voided on 2 day(s) after departure.
                    </p>

                    <h6
                      className="b-policy-title pt-1"
                      style={{ borderTop: "1px solid #E5E7EB" }}
                    >
                      Security & Payments
                    </h6>
                    <p className="small policy-desc mb-3">
                      This site is protected by reCAPTCHA. By using it you
                      accept the host’s privacy policy and Google’s terms of
                      service.
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </div>
          <div
            className="d-flex justify-content-between px-md-5 px-2 py-4 gap-2"
            style={{ borderTop: "1px solid  #E5E7EB" }}
          >
            {currentStep > 0 ? (
              <motion.button
                onClick={handlePrevious}
                className="btn-lg b-continue-btn full-width b-footer-btn b-footer-backbtn"
              >
                <IoChevronBackOutline className="me-3" />
                {isMobile
                  ? "Back"
                  : ` Return to ${currentStep === 1 ? "Dates" : "Contact"}`}
              </motion.button>
            ) : (
              <div></div>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-lg b-continue-btn full-width b-footer-btn"
              onClick={
                currentStep < steps.length - 1
                  ? handleNext
                  : () => navigate("/")
              }
            >
              {currentStep === steps.length - 1
                ? "Confirm reservation"
                : currentStep === 1
                ? "Continue to Payment"
                : "Continue to Contact"}
            </motion.button>
          </div>
        </div>

        {/* Right Section - Summary */}
        <motion.div
          className="col-lg-4 col-md-5 b-right-section p-md-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="b-summary-card  p-md-3 sticky-top"
            style={{ top: "100px" }}
          >
            {!isMobile && (
              <h4 className="b-summary-title mb-3">Reservation summary</h4>
            )}
            <div className="d-flex align-items-center mb-3">
              <img
                src={bookingBg}
                alt="villa"
                className="b-summary-img me-2"
                style={{
                  width: "48px",
                  height: "48px",
                  objectFit: "cover",
                }}
              />
              <div className="d-flex flex-fill">
                <h6 className="mb-0 b-res-title">Villa La Font</h6>
              </div>
              <button className="btn b-res-details-btn">More details</button>
              <div
                className="b-mob-details-btn"
                onClick={() => setSeeMore(!seeMore)}
              >
                {!seeMore ? (
                  <FaChevronUp fontSize={16} color="#4A5565" />
                ) : (
                  <FaChevronDown color="#4A5565" fontSize={16} />
                )}
              </div>
            </div>
            <div className="b-seperator" style={{ borderColor: "#E5E7EB" }} />
            {!seeMore && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 10 }}
                transition={{ duration: 0.6 }}
              >
                {startDate && endDate && guests && (
                  <div>
                    <div className="d-flex align-items-center">
                      <div className="d-flex flex-fill">
                        <h6 className="mb-0 b-res-title">Dates</h6>
                      </div>
                      <button
                        className="btn b-res-details-btn"
                        onClick={() => setCurrentStep(0)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="d-flex">
                          <div>
                            <FiCalendar color="#99A1AF" />
                          </div>
                          <div className="ps-2">
                            <span className="tex-included">Check-in</span>
                            <p className="reservation-selected">
                              {startDate
                                ? startDate.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })
                                : "Select date"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex">
                          <div>
                            <FiCalendar color="#99A1AF" />
                          </div>
                          <div className="ps-2">
                            <span className="tex-included">Check-out</span>
                            <p className="reservation-selected">
                              {endDate
                                ? endDate.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })
                                : "Select date"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="d-flex">
                          <div>
                            <FiUser color="#99A1AF" />
                          </div>
                          <div className="ps-2">
                            <span className="tex-included">Guests</span>
                            <p className="reservation-selected">
                              {guests} {guests === 1 ? "guest" : "guests"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="b-seperator"
                      style={{ borderColor: "#E5E7EB", marginTop: 5 }}
                    />
                    {/* ADD HERE INFO SECTION */}
                  </div>
                )}
                <div className="b-summary-line d-flex justify-content-between mb-2">
                  <span>Rental</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div
                  className="b-seperator"
                  style={{ borderColor: "#E5E7EB" }}
                />
                <div className="b-summary-line d-flex justify-content-between fw-bold">
                  <span className="b-total">Total (USD)</span>
                  <span className="b-total-price">
                    ${(totalPrice + 50 + totalPrice * 0.1).toFixed(2)}
                  </span>
                </div>
                <p className="tex-included m-0">Taxes included</p>
                <div
                  className="b-seperator"
                  style={{ borderColor: "#E5E7EB" }}
                />
                <div className="b-summary-line d-flex justify-content-between mb-2">
                  <span>Property's currency</span>
                  <span>€ {(totalPrice * 0.85).toFixed(2)}</span>
                </div>
                <div
                  className="b-seperator"
                  style={{ borderColor: "#E5E7EB" }}
                />
                <div className="b-summary-line d-flex justify-content-between mb-2">
                  <span>Payment schedule</span>
                  <span>(2 payments)</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;
