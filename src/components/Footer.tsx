
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h5 className="font-bold text-lg mb-4">Products</h5>
            <ul className="space-y-2">
              <li><Link to="/products/wisblock" className="text-gray-300 hover:text-white transition-colors">WisBlock</Link></li>
              <li><Link to="/products/wisgate" className="text-gray-300 hover:text-white transition-colors">WisGate</Link></li>
              <li><Link to="/products/wisnode" className="text-gray-300 hover:text-white transition-colors">WisNode</Link></li>
              <li><Link to="/products/meshtastic" className="text-gray-300 hover:text-white transition-colors">Meshtastic</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Resources</h5>
            <ul className="space-y-2">
              <li><Link to="/documentation" className="text-gray-300 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/tutorials" className="text-gray-300 hover:text-white transition-colors">Tutorials</Link></li>
              <li><Link to="/faqs" className="text-gray-300 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/videos" className="text-gray-300 hover:text-white transition-colors">Videos</Link></li>
              <li><Link to="/community" className="text-gray-300 hover:text-white transition-colors">Community</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Support</h5>
            <ul className="space-y-2">
              <li><Link to="/support/contact" className="text-gray-300 hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/support/troubleshooting" className="text-gray-300 hover:text-white transition-colors">Troubleshooting</Link></li>
              <li><Link to="/support/warranty" className="text-gray-300 hover:text-white transition-colors">Warranty Information</Link></li>
              <li><Link to="/support/returns" className="text-gray-300 hover:text-white transition-colors">Returns Policy</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Company</h5>
            <ul className="space-y-2">
              <li><a href="https://www.rakwireless.com/about-us" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">About RAK</a></li>
              <li><a href="https://www.rakwireless.com/blog" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Blog</a></li>
              <li><a href="https://www.rakwireless.com/careers" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Careers</a></li>
              <li><a href="https://www.rakwireless.com/contact" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} RAKwireless. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
