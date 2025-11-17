import { Container } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
// Gallery images
import gallery1 from "/src/assets/images/gallery1.png";
import gallery2 from "/src/assets/images/gallery2.png";
import gallery3 from "/src/assets/images/gallery3.png";
import gallery4 from "/src/assets/images/gallery4.png";
import gallery5 from "/src/assets/images/gallery5.png";
import gallery6 from "/src/assets/images/gallery6.png";
import gallery7 from "/src/assets/images/gallery7.png";
import gallery8 from "/src/assets/images/gallery8.png";
import gallery9 from "/src/assets/images/gallery9.png";
// Dynamically import ALL images from folder

const images = import.meta.glob("/src/assets/gallery/*.{png,jpg,jpeg,webp}", {
  eager: true,
});

const galleryPics: GalleryImage[] = Object.keys(images).map((key, index) => {
  return {
    id: index,
    src: (images[key] as any).default,
    alt: key.split("/").pop() || `Gallery Image ${index + 1}`,
  };
});

console.log(galleryPics);
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

// -------------------------------------------------------------
// Gallery Images Data
// -------------------------------------------------------------
const galleryImages: GalleryImage[] = [
  { id: 1, src: gallery1, alt: "Villa exterior with stone walls" },
  { id: 7, src: gallery7, alt: "Garden seating area" },
  { id: 8, src: gallery8, alt: "Rustic indoor fireplace" },
  { id: 9, src: gallery9, alt: "Historic kitchen area" },
  { id: 3, src: gallery3, alt: "Living room interior" },
  { id: 6, src: gallery6, alt: "Bedroom with fireplace" },
  { id: 4, src: gallery4, alt: "Swimming pool area" },
  { id: 5, src: gallery5, alt: "Outdoor dining area" },
  { id: 2, src: gallery2, alt: "Main entrance with vines" },
];

// -------------------------------------------------------------
// Component: Gallery
// -------------------------------------------------------------
const Gallery: React.FC = () => {
  // Modal & lightbox state
  const [isOpen, setIsOpen] = useState(false); // Full gallery modal
  const [lightboxOpen, setLightboxOpen] = useState(false); // Airbnb-style lightbox
  const [currentIndex, setCurrentIndex] = useState(0);
  const [type, settype] = useState("gallery");
  // Drag / pinch state
  const [scale, setScale] = useState(1);
  const [x, setX] = useState(0);

  // -----------------------------------------------------------
  // Open/Close Full Gallery
  // -----------------------------------------------------------
  const openGallery = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeGallery = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  // -----------------------------------------------------------
  // Open/Close Lightbox
  // -----------------------------------------------------------
  const openLightbox = (index: number, type: string) => {
    settype(type);
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  // Reset scale when changing images
  useEffect(() => {
    setScale(1);
  }, [currentIndex]);

  // -----------------------------------------------------------
  // Navigate Lightbox Slides
  // -----------------------------------------------------------
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === (type === "gallery" ? galleryImages.length - 1 : galleryPics.length - 1) ? 0 : prev + 1
    );
  };
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? (type === "gallery" ? galleryImages.length - 1 : galleryPics.length - 1) : prev - 1
    );
  };

  return (
    <section id="gallery-section" className="gallery-section py-5">
      <Container>
        {/* -------------------------------------------------------
            Section Title
        ------------------------------------------------------- */}
        <h2 className="text-center sec-title mt-3 mb-4">EXPLORE THE VILLA</h2>

        {/* -------------------------------------------------------
            Thumbnail Grid
        ------------------------------------------------------- */}
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => openLightbox(index, "gallery")}
            >
              <img src={image.src} alt={image.alt} className="img-fluid" />
            </div>
          ))}
        </div>

        {/* Full Gallery Button */}
        <div className="text-center mt-4">
          <button className="gallery-btn rounded-0" onClick={openGallery}>
            VIEW FULL GALLERY
          </button>
        </div>

        {/* -------------------------------------------------------
            Full Gallery Modal
        ------------------------------------------------------- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="full-gallery-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div className="gallery-modal-header">
                <button className="close-btn" onClick={closeGallery}>
                  <IoIosArrowBack fontSize={20} />
                </button>
              </div>

              {/* Full Grid */}
              <div className="container">
                <div className="gallery-grid full-gallery-grid">
                  {galleryPics.map((image, idx) => (
                    <div
                      key={image.id}
                      className="gallery-item full-gallery-item"
                      onClick={() => openLightbox(idx, "full")}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        style={{ width: "100%" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -------------------------------------------------------
            Airbnb Lightbox Modal
            - Fullscreen dark modal
            - Supports swipe, drag, and desktop nav
        ------------------------------------------------------- */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              className="airbnb-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Top Bar */}
              <div className="airbnb-lightbox-top">
                <button className="airbnb-close" onClick={closeLightbox}>
                  <IoIosArrowBack size={22} color="black" />
                </button>
                <div className="airbnb-counter">
                  {currentIndex + 1} / {type === "gallery" ? galleryImages.length : galleryPics.length}
                </div>
                <div style={{ width: 30 }} />
              </div>

              {/* Draggable / Swipeable Image */}
              <motion.div
                className="lightbox-image-wrapper"
                drag="x"
                style={{ x }}
                dragElastic={0.15}
                dragConstraints={{ left: 0, right: 0 }}
                onDrag={(_, info) => setX(info.offset.x)}
                onDragEnd={(_, info) => {
                  const threshold = 150;
                  if (info.offset.x < -threshold) nextSlide();
                  else if (info.offset.x > threshold) prevSlide();
                  setX(0);
                }}
              >
                <motion.img
                  key={currentIndex}
                  src={type === "gallery" ? galleryImages[currentIndex].src : galleryPics[currentIndex].src}
                  alt=""
                  className="airbnb-lightbox-image"
                  style={{ scale }}
                  drag={scale > 1}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.15}
                />
              </motion.div>

              {/* Desktop Navigation Buttons */}
              <button
                className="airbnb-nav prev desktop-only"
                onClick={prevSlide}
              >
                <div className="circle-btn">‹</div>
              </button>
              <button
                className="airbnb-nav next desktop-only"
                onClick={nextSlide}
              >
                <div className="circle-btn">›</div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      {/* -------------------------------------------------------
          Inline CSS (can move to SCSS)
      ------------------------------------------------------- */}
      <style>{`
        /* Thumbnail hover effect */
        .gallery-item {
          cursor: pointer;
          transition: 0.3s;
        }
        .gallery-item:hover {
          transform: translateY(-5px);
        }

        /* Full Gallery Modal */
        .full-gallery-modal {
          padding-top: 170px;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: white;
          z-index: 1000;
          padding: 2rem;
          overflow-y: auto;
        }
        .gallery-modal-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          background: white;
          padding: 1rem 2rem;
          z-index: 1001;
        }
        .close-btn {
          background: #fff;
          border: none;
          padding: 10px;
          border-radius: 50%;
          cursor: pointer;
        }

        /* Airbnb Lightbox */
        .airbnb-lightbox {
          position: fixed;
          inset: 0;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3000;
          overflow: hidden;
        }
        .airbnb-lightbox-top {
          position: fixed;
          top: 18px; left: 18px; right: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 4000;
        }
        .airbnb-close {
          background: #ffffff;
          border: 1px solid #000000;
          color: #fff;
          border-radius: 50%;
          display:flex;
          align-items:center;
          justify-content:center;
          height:50px;
          width:50px
        }
        .airbnb-counter { color: #000; font-size: 18px; }

        .lightbox-image-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color:white
        }
        .airbnb-lightbox-image {
          max-width: 100%;
          max-height: 100%;
          touch-action: none;
          object-fit: contain;
        }

        /* Desktop navigation arrows */
        .desktop-only { display: block; }
        .airbnb-nav {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .airbnb-nav.prev { left: 40px; }
        .airbnb-nav.next { right: 40px; }
        .circle-btn {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          border: 1px solid;
          // color: #fff;
          font-size: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom:5px
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .airbnb-lightbox-image { width: 100%; height: 100%; max-height: 92vh; }
          .airbnb-lightbox-top { top: 12px; left: 12px; right: 12px; }
          .airbnb-counter { font-size: 16px;color:black }
          .airbnb-close { padding: 0px;display:flex;align-items:center;justify-content:center;height:40px;width:40px }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
