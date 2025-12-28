import React, { useEffect, useRef } from "react";

const images = [
  "/img1.jpeg",
  "/img2.jpg",
  "https://images.pexels.com/photos/258149/pexels-photo-258149.jpeg?cs=srgb&dl=atmosphere-blue-sky-bright-258149.jpg&fm=jpg",
  "/img4.jpg",
  "/img5.jpg",
];

const Gallery = () => {
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  const startScroll = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      container.scrollLeft += 1; // speed

      // Seamless loop logic
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
    }, 20);
  };

  const stopScroll = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    startScroll();
    return stopScroll;
  }, []);

  return (
    <div className="w-full px-6 py-6">
      <h2 className="text-3xl font-semibold text-black-500">
        Gallery
      </h2>
      <p className="mt-1 text-gray-500">
        A vibrant showcase of Firworks for successfully completed.
      </p>

      <div
        ref={scrollRef}
        onMouseEnter={stopScroll}
        onMouseLeave={startScroll}
        className="mt-6 flex gap-5 overflow-x-hidden no-scrollbar"
      >
        {/* Duplicate images for infinite scroll */}
        {[...images, ...images].map((img, index) => (
          <div
            key={index}
            className="min-w-[320px] h-[200px] rounded-xl overflow-hidden shadow-lg bg-white"
          >
            <img
              src={img}
              alt={`Gallery ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
