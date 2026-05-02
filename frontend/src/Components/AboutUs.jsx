export default function About() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      {/* 🔥 TOP SECTION */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        {/* Image */}
        <img
          src="https://i.pinimg.com/1200x/c1/55/bb/c155bbaf77944bfa767d8b357c53583b.jpg"
          alt="institute"
          className="rounded-xl hover:scale-105 transition duration-300 "
        />

        {/* Content */}
        <div>
          <h1 className="text-3xl font-bold text-purple-700 mb-4">
            About Us
          </h1>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Vedanta Computer Education is a leading institute providing
            high-quality computer education with practical knowledge.
            We focus on building real-world skills.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Our mission is to make students industry-ready through modern
            courses like Web Development, Programming, and IT training.
          </p>

          {/* Button */}
          <button className="mt-6 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
            Explore Courses
          </button>
        </div>
      </div>

      {/* 🔥 FEATURES SECTION */}
      <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
        
        <div className="bg-rose-400 shadow-md rounded-xl p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Expert Trainers
          </h2>
          <p className="text-white text-sm">
            Learn from experienced professionals with real industry knowledge.
          </p>
        </div>

        <div className="bg-emerald-300 shadow-md rounded-xl p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Practical Learning
          </h2>
          <p className="text-white text-sm">
            Hands-on projects and real-world training approach.
          </p>
        </div>

        <div className="bg-yellow-300 shadow-md rounded-xl p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Certification
          </h2>
          <p className="text-white text-sm">
            Get recognized certificates after course completion.
          </p>
        </div>

      </div>

      {/* 🔥 STATS SECTION */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        
        <div>
          <h2 className="text-2xl font-bold text-purple-700">500+</h2>
          <p className="text-gray-600 text-sm">Students</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-purple-700">20+</h2>
          <p className="text-gray-600 text-sm">Courses</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-purple-700">10+</h2>
          <p className="text-gray-600 text-sm">Trainers</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-purple-700">5+</h2>
          <p className="text-gray-600 text-sm">Years Experience</p>
        </div>

      </div>

    </section>
  );
}