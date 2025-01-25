import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <Slide direction="up" triggerOnce>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold">
                  PR
                </div>
                <span className="text-xl font-semibold">Product Recs</span>
              </div>
              <p className="text-gray-400 text-sm">
                Discover the best products tailored for your needs. Reliable
                recommendations for every shopper.
              </p>
            </div>
          </Slide>

          {/* Quick Links */}
          <Slide direction="up" triggerOnce delay={200}>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-1 text-gray-400">
                <li>
                  <Link to="#home" className="hover:text-blue-400 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="#categories"
                    className="hover:text-blue-400 transition"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="#about" className="hover:text-blue-400 transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="#contact"
                    className="hover:text-blue-400 transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </Slide>

          {/* Newsletter & Social Media */}
          <Slide direction="up" triggerOnce delay={400}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Stay Updated</h3>
              <div className="flex items-center bg-gray-700 rounded-full px-3 py-1">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-transparent outline-none text-sm px-2 text-white w-full"
                />
                <button className="bg-blue-500 px-4 py-2 rounded-full text-white text-sm font-semibold hover:bg-blue-600 transition">
                  Subscribe
                </button>
              </div>
              <div className="flex space-x-4">
                <Link
                  to={"https://www.facebook.com/"}
                  target="_blank"
                  className="text-blue-400 hover:text-blue-500 transition text-xl"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  to={"https://x.com/"}
                  target="_blank"
                  className="text-blue-400 hover:text-blue-500 transition text-xl"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </Link>
                <Link
                  to={"https://www.instagram.com/"}
                  target="_blank"
                  className="text-blue-400 hover:text-blue-500 transition text-xl"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </Link>
                <Link
                  to={"https://linkedin.com/"}
                  target="_blank"
                  className="text-blue-400 hover:text-blue-500 transition text-xl"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </Link>
              </div>
            </div>
          </Slide>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Product Recs. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
