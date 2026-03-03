import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 mt-5">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-white">TripPlanner</h2>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Plan smarter trips with ease. Discover destinations, organize
            itineraries, and travel better with our intelligent planner.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>

          <p className="text-sm text-gray-400">
            Have questions or feedback? I'd love to hear from you.
          </p>
          <p className="mt-4 text-sm font-medium text-white">
            Email: aniket.14vishwa@gmail.com
          </p>

          <a
            href="mailto:your@email.com?subject=Contact from TripPlanner"
            className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            Email Me
          </a>
        </div>

        {/* Build With Me */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Build With Me
          </h3>

          <p className="text-sm text-gray-400 leading-relaxed">
            Want to build a modern web app, SaaS product, or platform like this?
            I help turn ideas into scalable and production-ready applications.
          </p>

          <p className="mt-4 text-sm font-medium text-white">
            — Aniket Vishwakarma
          </p>

          <div className="flex gap-3 mt-4">
            <a
              href="mailto:aniket.14vishwa@gmail.com?subject=Project Inquiry"
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              Start a Project
            </a>

            <a
              href="https://linkedin.com/in/aniket-vishwakarma1401"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-600 hover:border-white text-sm px-4 py-2 rounded-lg transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center text-sm py-6 text-gray-500">
        © {new Date().getFullYear()} TripPlanner. Built by Your Name. All rights reserved.
      </div>
    </footer>
  );
}