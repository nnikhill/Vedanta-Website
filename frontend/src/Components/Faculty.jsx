import nikhilImg from "../images/nikhil.jpeg";
import vikramImg from "../images/vikram.jpeg";
import ankitaImg from "../images/ankita.jpeg";
import anitaImg from "../images/anita.jpeg";
import seemaImg from "../images/seema.jpeg";
import manishaImg from "../images/manisha.jpeg";
export default function Faculty() {
  const faculty = [
    {
      name: "Nikhil Sharma",
      role: "Web Development Trainer",
      img: nikhilImg,
    },
    {
      name: "Vikram Singh",
      role: "personality Development trainer",
      img: vikramImg,
    },
    {
      name: "Ankita ma'am",
      role: "Python Trainer",
      img: ankitaImg,
    },
    {
      name: "Anita Kumari",
      role: "Python Trainer",
      img: anitaImg,
    },
    {
      name: "Seema Kandulna",
      role: "Python Trainer",
      img: seemaImg,
    },
    {
      name: "Manisha Kumari",
      role: "Python Trainer",
      img: manishaImg,
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