import { useEffect } from "react";
import calendarIcon from "/src/assets/images/calendar.svg";
import Spinner from "react-bootstrap/Spinner";
import { useAppContext } from "../../context/AppContext";

interface BookingWidgetProps {
  placeholderColor?: string; // color for placeholder text
  color?: string;
}

const BookingWidget = ({
  placeholderColor = "#D7D7D7",
}: BookingWidgetProps) => {
  const { currency, language } = useAppContext();
  console.log(language);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const fieldWrappers = document.getElementsByClassName("css-hd63sv");

      if (fieldWrappers.length > 0) {
        const field1: any = fieldWrappers[0].childNodes[1];
        const field2: any = fieldWrappers[1].childNodes[1];

        //  btn.style.display="none"

        const addPlaceholderWithIcon = (field: HTMLElement) => {
          if (field && field.innerText.trim() === "") {
            var btn = document.getElementsByClassName("css-13bifmc")[0];
            var btn2 = document.getElementsByClassName("css-13bifmc")[1];

            btn.innerHTML = "BOOK NOW";
            btn2.innerHTML = "BOOK NOW";
            console.log(btn);
            // Clear current text
            field.innerHTML = "";

            // Create container span
            const span = document.createElement("span");
            span.style.display = "flex";
            span.style.alignItems = "center";
            span.style.gap = "6px";
            span.style.color = placeholderColor;
            span.className = "custom-placeholder";

            // Calendar icon
            const icon = document.createElement("img");
            icon.src = calendarIcon;
            icon.style.height = "25px";
            icon.style.width = "25px";
            icon.style.marginRight = "5px";
            // <img
            //   src={calendarIcon}
            //   alt=""
            //   style={{ height: 25, width: 25, marginRight: 5 }}
            // />
            // icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${placeholderColor}" viewBox="0 0 24 24"><path d="M7 10h5v5H7zm-5 11h20V8H2zm16-15V4h-2v2H8V4H6v2H2v18h20V6z"/></svg>`;

            // Placeholder text
            const text = document.createElement("span");
            text.innerText = "dd-mm-yyyy";

            // Append
            span.appendChild(icon);
            span.appendChild(text);
            field.appendChild(span);
          }

          // Change color if user selects a date
          if (field && field.innerText !== "dd-mm-yyyy") {
            const placeholder = field.querySelector(".custom-placeholder");
            if (placeholder) placeholder.remove();
            field.style.color = "#2A2A2A";
          }
        };

        addPlaceholderWithIcon(field1);
        addPlaceholderWithIcon(field2);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="p-4 h-form">
      <h2 className="mb-1 form-title" style={{ color: "#000000" }}>
        Villa La Font
      </h2>
      <p className="mb-4 form-lable" style={{ color: "#000000" }}>
        Balearic Islands, Spain
      </p>
      <div
        id="lodgify-search-bar"
        data-rental-id="506741"
        data-website-id="284736"
        data-language-code={language}
        data-checkout-page-url={`https://checkout.lodgify.com/villastrias/506741/reservation?adults=1&currency=${currency}`}
        data-dates-check-in-label="Check-in"
        data-dates-check-out-label="Check-out"
        data-guests-counter-label="Guests"
        data-guests-input-singular-label="{{NumberOfGuests}} guest"
        data-guests-input-plural-label="{{NumberOfGuests}} guests"
        data-location-input-label="Location"
        data-search-button-label="Search"
        data-dates-input-min-stay-tooltip-text='{"one":"Minimum {minStay} night","other":"Minimum {minStay} nights"}'
        data-guests-breakdown-label="Guests"
        data-adults-label='{"one":"adult","other":"adults"}'
        data-adults-description="Ages {minAge} or above"
        data-children-label='{"one":"child","other":"children"}'
        data-children-description="Ages {minAge}-{maxAge}"
        data-children-not-allowed-label="Not suitable for children"
        data-infants-label='{"one":"infant","other":"infants"}'
        data-infants-description="Under {maxAge}"
        data-infants-not-allowed-label="Not suitable for infants"
        data-pets-label='{"one":"pet","other":"pets"}'
        data-pets-not-allowed-label="Not allowed"
        data-done-label="Done"
        data-new-tab="true"
        data-version="stable"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="grow" />
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
