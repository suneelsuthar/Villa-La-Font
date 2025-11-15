import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import calendarIcon from "/src/assets/images/calendar2.png";
import { useAppContext } from "../../context/AppContext";
/* -------------------------------------------------
   Types
-------------------------------------------------- */
type AvailabilityPeriod = {
  start: string;
  end: string;
  available: number;
  closed_period: { id: number } | null;
  bookings: Array<{ id: number; status: string }>;
};

/* -------------------------------------------------
   Reserve Component
-------------------------------------------------- */
const Reserve = () => {
  const { availabilities } = useAppContext();
  const { currency, language } = useAppContext();

  // Date state
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  // Booking form
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  // Cost calculation
  const [nights, setNights] = useState(0);

  /* -------------------------------------------------
     Process availability data → mark unavailable,
     available, and booked dates.
  -------------------------------------------------- */
  useEffect(() => {
    if (!availabilities || !availabilities[0]?.periods) return;

    const unavailable: Date[] = [];
    const available: Date[] = [];
    const booked: Date[] = [];

    availabilities[0].periods.forEach((period: AvailabilityPeriod) => {
      const start = new Date(period.start);
      const end = new Date(period.end);

      // Loop through each date in range
      const loopEnd = new Date(end);
      loopEnd.setDate(loopEnd.getDate() + 1);

      const hasBookings = period.bookings?.length > 0;

      for (let d = new Date(start); d < loopEnd; d.setDate(d.getDate() + 1)) {
        const day = new Date(d);

        if (hasBookings) {
          booked.push(day);
          unavailable.push(day);
        } else if (period.available === 0 || period.closed_period) {
          unavailable.push(day);
        } else {
          available.push(day);
        }
      }
    });

    setBookedDates(booked);
    setUnavailableDates(unavailable);
    setAvailableDates(available);
  }, [availabilities]);

  /* -------------------------------------------------
     Calendar Styling Helpers
  -------------------------------------------------- */
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;

    const dateString = date.toISOString().split("T")[0];

    const isUnavailable = unavailableDates.some(
      (d) => d.toISOString().split("T")[0] === dateString
    );
    const isAvailable = availableDates.some(
      (d) => d.toISOString().split("T")[0] === dateString
    );

    if (isUnavailable) return <div className="unavailable-date" />;
    if (isAvailable) return <div className="available-date" />;

    return null;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return "res-day";

    const dateString = date.toISOString().split("T")[0];
    const classes = ["res-day"];

    const isUnavailable = unavailableDates.some(
      (d) => d.toISOString().split("T")[0] === dateString
    );
    const isBooked = bookedDates.some(
      (d) => d.toISOString().split("T")[0] === dateString
    );

    if (isBooked) classes.push("res-selected");
    else if (isUnavailable) classes.push("res-unavailable");
    else classes.push("res-available");

    return classes.join(" ");
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return false;

    const dateString = date.toISOString().split("T")[0];
    return unavailableDates.some(
      (d) => d.toISOString().split("T")[0] === dateString
    );
  };

  /* -------------------------------------------------
     Calculate price when dates change
  -------------------------------------------------- */
  useEffect(() => {
    if (!checkIn || !checkOut) return;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    setNights(diff > 0 ? diff : 0);
  }, [checkIn, checkOut]);

  /* -------------------------------------------------
     UI
  -------------------------------------------------- */

  console.log(checkIn);
  return (
    <section className="res-section text-light py-5" id="reserve">
      <h2 className="sec-title mb-3 text-center">RESERVE YOUR ESCAPE</h2>
      <p className="booknow-description mb-md-5 mb-3 text-center">
        Our rates may vary. Please select a period to see the exact price for
        your stay.
      </p>

      <div className="container res-container">
        <div className="row justify-content-evenly">
          {/* ----------------- Calendar ----------------- */}
          <div className="col-lg-5 col-md-12">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="p-3 rounded-0 h-form res-form res-calendar"
            >
              <Calendar
                selectRange
                showNeighboringMonth={false}
                tileDisabled={tileDisabled}
                tileClassName={tileClassName}
                tileContent={tileContent}
                className="res-calendar"
              />

              {/* Legend */}
              <div className="res-legend mt-3 d-flex justify-content-center gap-4 pt-3">
                <div>
                  <span className="res-legend-box res-available res-cal-footer"></span>
                  Available
                </div>
                <div>
                  <span className="res-legend-box res-unavailable res-cal-footer"></span>
                  Unavailable
                </div>
                <div>
                  <span className="res-legend-box res-selected res-cal-footer"></span>
                  Selected
                </div>
              </div>
            </motion.div>
          </div>

          {/* ----------------- Booking Form ----------------- */}
          <div
            className="col-lg-5 col-md-12"
            style={{ border: "1px solid #E0E0E0" }}
          >
            <div className="h-form p-4">
              <h2 className="mb-1 form-title pt-3" style={{ color: "#000" }}>
                Villa La Font
              </h2>
              <p className="mb-4 form-lable" style={{ color: "#000" }}>
                Balearic Islands, Spain
              </p>

              <div className="row">
                {/* CHECK-IN */}
                <div className="col-md-6 mb-3">
                  <label className="h-form-label" style={{ color: "#5D5D5D" }}>
                    Check-in
                  </label>

                  <div
                    className="h-input-container d-flex align-items-center justify-content-between"
                    onClick={() =>
                      document.getElementById("checkInInput")?.click()
                    }
                  >
                    <div className="d-flex align-items-center gap-2">
                      <img src={calendarIcon} height={24} width={24} />
                      <span style={{ color: checkIn ? "#000" : "#5D5D5D" }}>
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
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                {/* CHECK-OUT */}
                <div className="col-md-6 mb-3">
                  <label className="h-form-label" style={{ color: "#5D5D5D" }}>
                    Check-out
                  </label>

                  <div
                    className="h-input-container d-flex align-items-center justify-content-between"
                    onClick={() =>
                      document.getElementById("checkOutInput")?.click()
                    }
                  >
                    <div className="d-flex align-items-center gap-2">
                      <img src={calendarIcon} height={24} width={24} />
                      <span style={{ color: checkOut ? "#000" : "#5D5D5D" }}>
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
                      min={checkIn || new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              </div>

              {/* GUESTS */}
              <div className="mb-4">
                <label className="h-form-label" style={{ color: "#5D5D5D" }}>
                  Guests
                </label>

                <div className="h-input-container d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className="guest-btn"
                    style={{ color: "#5D5D5D" }}
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                  >
                    −
                  </button>

                  <span className="h-guests" style={{ color: "#5D5D5D" }}>
                    {guests}
                  </span>

                  <button
                    type="button"
                    className="guest-btn"
                    style={{ color: "#5D5D5D" }}
                    onClick={() => setGuests(guests + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="d-flex justify-content-between align-items-center pt-3 pb-4">
                <span className="h-form-label" style={{ color: "#5D5D5D" }}>
                  {nights} Nights
                </span>
              </div>

              {/* BOOK NOW BUTTON */}
              <Button
                size="lg"
                className="mb-4 h-form-booknow-2"
                style={{ backgroundColor: "#000" }}
                onClick={() => {
                  if (!checkIn || !checkOut || guests < 1) {
                    alert("Please fill in all required fields");
                    return;
                  }

                  const url = `https://checkout.lodgify.com/${language}/villastrias/506741/reservation?adults=${guests}&currency=${currency}&slug=villastrias&arrival=${checkIn}&departure=${checkOut}`;

                  window.open(url);
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reserve;
