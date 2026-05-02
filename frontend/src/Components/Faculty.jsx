export default function Faculty() {
  const faculty = [
    {
      name: "Nikhil Sharma",
      role: "Web Development Trainer",
      img: "https://i.pinimg.com/736x/bf/40/65/bf4065bdf22a347ec6f3625ace69f633.jpg",
    },
    {
      name: "Anita Ma'am",
      role: "Java Instructor",
      img: "https://i.pinimg.com/736x/93/bf/d1/93bfd1c9bcce4b7b1ae589c94a0616e6.jpg",
    },
    {
      name: "Ankita ma'am",
      role: "Python Trainer",
      img: "https://i.pinimg.com/736x/d1/ce/a5/d1cea5763844a786a38c05453daa9292.jpg",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 bg-purple-50">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        Our Faculty
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {faculty.map((f, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 text-center"
          >
            <img
              src={f.img}
              alt={f.name}
              className="w-24 h-24 mx-auto rounded-full mb-3"
            />
            <h2 className="text-lg font-semibold">{f.name}</h2>
            <p className="text-gray-500 text-sm">{f.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}