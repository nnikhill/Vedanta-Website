import { useEffect, useState } from "react";

import img1 from "../images/image1.jpeg";
import img2 from "../images/img2.jpeg";
import img3 from "../images/img3.jpeg";
import img4 from "../images/img4.jpeg";
import img5 from "../images/img5.jpeg";
import img6 from "../images/img6.jpeg";
import img7 from "../images/img7.jpeg";
import img8 from "../images/img8.jpeg";
import img9 from "../images/img9.jpeg";
import img10 from "../images/img10.jpeg";
import img11 from "../images/img11.jpeg";
import img12 from "../images/img12.jpeg";
import img13 from "../images/img13.jpeg";
import img14 from "../images/img14.jpeg";
import img15 from "../images/img15.jpeg";

export default function Gallery() {
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
  ];

  const [start, setStart] = useState(0);

  // Auto Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setStart((prev) => (prev + 4) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // 8 images show (2 rows × 4 columns)
  const visibleImages = [];

  for (let i = 0; i < 8; i++) {
    visibleImages.push(images[(start + i) % images.length]);
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-14 overflow-hidden">
      
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
        Our Gallery
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {visibleImages.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl shadow-lg"
          >
            <img
              src={img}
              alt="gallery"
              className="w-full h-64 object-cover hover:scale-110 transition duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}