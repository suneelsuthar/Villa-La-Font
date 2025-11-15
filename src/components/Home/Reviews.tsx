import { Container } from "react-bootstrap";
import { useSnapCarousel } from "react-snap-carousel";
import airnbIcon from "/src/assets/images/airbnb.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Review = {
  name: string;
  rating: number;
  image: string;
  review: string;
};

const reviews: Review[] = [
  {
    name: "Diana",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "We loved our stay and the villa. It was full of character with so many nooks and crannies. We had some terrible storms and Drew was very responsive when the local area lost electricity. We knew we were in safe hands!",
  },
  {
    name: "Christian",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "Brilliant stay at Villa La Font. Traditional Mallorca home in a beautiful hillside just out of Pollenca. The garden was particularly amazing with so much to explore… just wonderful.",
  },
  {
    name: "Prachi",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/46.jpg",
    review:
      "We loved the house. Full of character, lots of really nice sitting and eating spaces outside. The house was spotlessly clean and we thoroughly enjoyed our stay. He was super helpful and can highly recommend.",
  },
  {
    name: "Thomas",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/47.jpg",
    review:
      "Great experience overall. The house was spotless and full of charm. The outdoor spaces were beautiful, and the host was very responsive.",
  },
];

export default function Reviews() {
  const { scrollRef, pages, activePageIndex, goTo } = useSnapCarousel();
  const totalPages = pages.length;

  const canGoPrev = activePageIndex > 0;
  const canGoNext = activePageIndex < totalPages - 1;

  const goToPrev = () => {
    if (canGoPrev) goTo(activePageIndex - 1);
  };

  const goToNext = () => {
    if (canGoNext) goTo(activePageIndex + 1);
  };

  return (
    <Container fluid className="p-0 m-0 mt-5" id="reviews">
      <section className="rev-section py-5 position-relative">
        <div className="container text-center">
          <h2 className="sec-title mb-5 mt-4 rev-sec-title text-white pt-5">
            WHAT OUR GUESTS SAY
          </h2>

          <div className="rev-carousel-wrapper position-relative d-flex align-items-center justify-content-center pt-3">
            {/* Left Arrow */}
            <button
              className="rev-arrow left-arrow"
              onClick={goToPrev}
              aria-label="Previous Review"
              disabled={!canGoPrev}
            >
              <FaChevronLeft />
            </button>

            {/* Scrollable Carousel */}
            <ul className="rev-scroll" ref={scrollRef}>
              {reviews.map((review, index) => (
                <li key={review.name + index} className="rev-card">
                  <img src={review.image} alt={review.name} className="rev-img" />

                  <div className="rev-content">
                    <h4 className="rev-name">{review.name}</h4>

                    <div className="rev-rating">
                      <span
                        style={{
                          color: "#2A2A2A",
                          fontSize: 16,
                          fontWeight: "var(--font-light)",
                          marginRight: 5,
                        }}
                      >
                        {review.rating.toFixed(1)}
                      </span>

                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="star">
                          ★
                        </span>
                      ))}
                    </div>

                    <p className="rev-text pt-2">{review.review}</p>
                    <img src={airnbIcon} alt="Airbnb" />
                  </div>
                </li>
              ))}
            </ul>

            {/* Right Arrow */}
            <button
              className="rev-arrow right-arrow"
              onClick={goToNext}
              aria-label="Next Review"
              disabled={!canGoNext}
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Dots */}
          <div className="rev-dots mt-3">
            {pages.map((_, i) => (
              <span
                key={i}
                className={`rev-dot ${activePageIndex === i ? "active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
