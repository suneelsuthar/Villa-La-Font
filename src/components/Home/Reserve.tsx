import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import calendarIcon from "/src/assets/images/calendar2.png";
import { useAppContext } from "../../context/AppContext";
import { DateRangePicker } from "rsuite";
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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Date state
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [openPicker, setOpenPicker] = useState(false);
  const [range, setRange] = useState<any>([null, null]);
  const [checkInDate, setCheckInDate] = useState<any>(null);
  const [checkOutDate, setCheckOutDate] = useState<any>(null);
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0);

  /* -------------------------------------------------
     Process availability data → mark unavailable,
     available, and booked dates.
  -------------------------------------------------- */
  useEffect(() => {
    if (!availabilities || availabilities.length === 0) {
      return;
    }

    if (!availabilities[0]?.periods) {
      return;
    }

    const unavailableDateStrings = new Set<string>();
    const availableDateStrings = new Set<string>();
    const bookedDateStrings = new Set<string>();

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

        if (hasBookings) {
          bookedDateStrings.add(dateStr);
          unavailableDateStrings.add(dateStr);
        } else if (period.available === 0 || period.closed_period) {
          unavailableDateStrings.add(dateStr);
        } else {
          availableDateStrings.add(dateStr);
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
    const availableDatesArray = Array.from(availableDateStrings).map(
      (dateStr) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
      }
    );
    const bookedDatesArray = Array.from(bookedDateStrings).map((dateStr) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day);
    });

    setBookedDates(bookedDatesArray);
    setUnavailableDates(unavailableDatesArray);
    setAvailableDates(availableDatesArray);
  }, [availabilities]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  /* -------------------------------------------------
     Helper Functions
  -------------------------------------------------- */
  // Helper to convert Date to YYYY-MM-DD string in local timezone
  const formatDateToLocalString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  /* -------------------------------------------------
     Calendar Styling Helpers
  -------------------------------------------------- */
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;

    const dateString = formatDateToLocalString(date);

    const isUnavailable = unavailableDates.some(
      (d) => formatDateToLocalString(d) === dateString
    );
    const isAvailable = availableDates.some(
      (d) => formatDateToLocalString(d) === dateString
    );

    if (isUnavailable) return <div className="unavailable-date" />;
    if (isAvailable) return <div className="available-date" />;

    return null;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return "res-day";

    const dateString = formatDateToLocalString(date);
    const classes = ["res-day"];

    const isUnavailable = unavailableDates.some(
      (d) => formatDateToLocalString(d) === dateString
    );
    const isBooked = bookedDates.some(
      (d) => formatDateToLocalString(d) === dateString
    );

    if (isBooked) classes.push("res-selected");
    else if (isUnavailable) classes.push("res-unavailable");
    else classes.push("res-available");

    return classes.join(" ");
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return false;

    const dateString = formatDateToLocalString(date);
    return unavailableDates.some(
      (d) => formatDateToLocalString(d) === dateString
    );
  };

  const isDateDisabled = (date: Date): boolean => {
    const dateString = formatDateToLocalString(date);
    return unavailableDates.some(
      (d) => formatDateToLocalString(d) === dateString
    );
  };

  const disabledDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getFullYear() < 2025 || isDateDisabled(date);
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

              <DateRangePicker
                ranges={[]}
                open={openPicker}
                onOpen={() => setOpenPicker(true)}
                onClose={() => setOpenPicker(false)}
                value={range}
                onChange={(value) => {
                  setRange(value);
                  if (value && value[0] && value[1]) {
                    setOpenPicker(false);
                  }
                }}
                format="dd-MM-yyyy"
                style={{ display: "none" }} // keep hidden
              />
              <div className="row">
                {/* CHECK-IN */}
                <div className="col-md-6 mb-3">
                  <label className="h-form-label" style={{ color: "#5D5D5D" }}>
                    Check-in
                  </label>
                  <div className="res_field_sec">
                    <p
                      className={
                        checkInDate ? "_res_inpu_value" : "place_res_inpu_value"
                      }
                    >
                      {checkInDate ? checkInDate : "Date"}
                    </p>
                    <DateRangePicker
                      showHeader={false}
                      showMeridiem={false}
                      ranges={[]}
                      showOneCalendar={isMobile} // This will be true on mobile, false on desktop
                      value={range}
                      open={isCalendarOpen}
                      onOpen={() => setIsCalendarOpen(true)}
                      onClose={() => setIsCalendarOpen(false)}
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
                          setIsCalendarOpen(false);
                        } else {
                          setRange(date);
                        }
                      }}
                      shouldDisableDate={(date) => isDateDisabled(date)}
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
                  <label className="h-form-label" style={{ color: "#5D5D5D" }}>
                    Check-out
                  </label>
                  <div className="res_field_sec">
                    <p
                      className={
                        checkInDate ? "_res_inpu_value" : "place_res_inpu_value"
                      }
                    >
                      {checkOutDate ? checkOutDate : "Date"}
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
                          setIsCalendarOpen(false);
                        } else {
                          setRange(date);
                        }
                      }}
                      className="h-input-container d-flex align-items-center justify-content-between"
                      format="dd-MM-yyyy"
                      placeholder="dd-MM-yyyy"
                      shouldDisableDate={(date) => isDateDisabled(date)}
                      cleanable={false}
                      caretAs={() => (
                        <img src={calendarIcon} height={24} width={24} />
                      )}
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
                    onClick={() => setGuests((prev) => Math.min(8, prev + 1))}
                    disabled={guests >= 8}
                  >
                    +
                  </button>
                </div>
                {guests >= 8 && (
                  <small className="mt-1 d-block" style={{ color: "gray" }}>
                    Maximum 8 guests allowed
                  </small>
                )}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reserve;
