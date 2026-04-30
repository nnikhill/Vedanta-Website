export default function Gallery() {
  const images = [
    "https://i.pinimg.com/736x/93/bf/d1/93bfd1c9bcce4b7b1ae589c94a0616e6.jpg",
    "https://i.pinimg.com/736x/d1/ce/a5/d1cea5763844a786a38c05453daa9292.jpg",
    "https://i.pinimg.com/736x/df/f2/62/dff2622f434a926f3fa8cc54aaf8f298.jpg",
    "https://i.pinimg.com/736x/bf/40/65/bf4065bdf22a347ec6f3625ace69f633.jpg",
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        Gallery
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="gallery"
            className="rounded-lg shadow-md hover:scale-105 transition"
          />
        ))}
      </div>
    </section>
  );
}