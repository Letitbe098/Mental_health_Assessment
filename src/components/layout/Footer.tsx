import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Logo />
              <span className="text-xl font-bold text-primary-700">Calm Corner</span>
            </div>
            <p className="text-gray-600 mb-4">
              Revolutionizing mental health support with user-friendly self-assessment and personalized guidance.
            </p>
            <div className="flex items-center text-gray-500">
              <span>Made with</span>
              <Heart size={16} className="mx-1 text-error-500" />
              <span>for better mental health</span>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Assessment
                </Link>
              </li>
              <li>
                <Link to="/mood-tracker" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Mood Tracker
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/find-help" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Find Help
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Mental Health Articles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Self-Care Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Crisis Hotlines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-primary-500 mt-0.5" />
                <span className="text-gray-600">support@Calm Corner.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-primary-500 mt-0.5" />
                <span className="text-gray-600">+91 81250 52430 </span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary-500 mt-0.5" />
                <span className="text-gray-600">9G35+5MC, Santosh Nagar Cross Roads, Saroornagar, Vinay Nagar, Saidabad, Hyderabad, Telangana 500059</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Calm Corner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
