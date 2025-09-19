"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

const logo = "../assets/logo.png";

const links = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "/products",
    submenu: [
      { name: "Life Insurance", href: "/products/life-insurance" },
      { name: "Whole Life Insurance Policy", href: "/products/whole-life-insurance" },
      { name: "Unit Linked Insurance Plan", href: "/products/unit-linked-insurance" },
      { name: "Term Insurance", href: "/products/term-insurance" },
      { name: "Health Insurance", href: "/products/health-insurance" },
      { name: "Individual Insurance", href: "/products/individual-insurance" },
      { name: "Family Insurance", href: "/products/family-insurance" },
      { name: "Group Insurance", href: "/products/group-insurance" },
      { name: "Mutual Fund", href: "/products/mutual-fund" },
    ],
  },
  {
    name: "Services",
    href: "/services",
    submenu: [
      { name: "Portfolio Management", href: "/services/portfolio-management" },
      { name: "Investment Advice", href: "/services/investment-advice" },
      { name: "Financial Consultant", href: "/services/financial-consultant" },
      { name: "How to Invest?", href: "/services/how-to-invest" },
    ],
  },
  { name: "Learn", href: "/learn" },
  { name: "Calc", href: "/calc" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export default function EnhancedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  interface SubmenuToggle {
    (name: string): void;
  }

  const toggleSubmenu: SubmenuToggle = (name) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/50"
            : "bg-white/90 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo with bounce animation */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center justify-center group">
                <div className="h-32 w-32 flex items-center justify-center rounded-tl-lg rounded-br-xl overflow-hidden transition-transform duration-300 group-hover:scale-110">
                  <img 
                    src={logo} 
                    alt="Keys Fintech Info Logo" 
                    className="h-100 w-100 object-contain transition-transform duration-300 group-hover:rotate-3" 
                  />
                </div>
              </a>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {links.map((link, index) =>
                link.submenu ? (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => setHoveredItem(link.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button className="text-gray-700 hover:text-emerald-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-300 hover:bg-emerald-50 relative overflow-hidden group">
                      <span className="relative z-10">{link.name}</span>
                      <ChevronDown
                        size={16}
                        className={`ml-1 transition-all duration-300 ${
                          hoveredItem === link.name ? 'rotate-180 text-emerald-600' : ''
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                    
                    {/* Desktop Dropdown */}
                    <div className={`absolute top-full left-0 min-w-[220px] bg-white border border-gray-100 rounded-xl shadow-xl p-2 z-50 transform transition-all duration-300 ${
                      hoveredItem === link.name 
                        ? 'opacity-100 translate-y-2 visible' 
                        : 'opacity-0 translate-y-0 invisible'
                    }`}>
                      {link.submenu.map((subitem, subIndex) => (
                        <a
                          key={subitem.name}
                          href={subitem.href}
                          className="block text-sm text-gray-700 rounded-lg px-3 py-3 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 transform hover:translate-x-1"
                          style={{
                            animationDelay: hoveredItem === link.name ? `${subIndex * 50}ms` : '0ms'
                          }}
                        >
                          {subitem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-700 hover:text-emerald-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-emerald-50 relative overflow-hidden group"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </a>
                )
              )}
            </div>

            {/* Desktop Button */}
            <div className="hidden md:flex">
              <a href="/contact">
                <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transform">
                  Get Started
                </button>
              </a>
            </div>

            {/* Mobile Menu Toggle with hamburger animation */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-700 hover:text-emerald-600 p-2 rounded-lg transition-all duration-300 hover:bg-emerald-50 relative"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isOpen ? 'rotate-45 top-3' : 'top-1'
                  }`}></span>
                  <span className={`absolute h-0.5 w-6 bg-current top-3 transition-all duration-300 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isOpen ? '-rotate-45 top-3' : 'top-5'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with staggered animations */}
        <div
          className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${
            isOpen 
              ? "max-h-screen opacity-100 translate-y-0" 
              : "max-h-0 opacity-0 -translate-y-4"
          }`}
        >
          <div className="px-4 pt-2 pb-6 bg-white/95 backdrop-blur-xl shadow-xl border-t border-gray-100/50">
            {links.map((link, index) => (
              <div
                key={link.name}
                className={`border-b border-gray-100/50 last:border-0 transform transition-all duration-500 ${
                  isOpen 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-8 opacity-0'
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
                }}
              >
                {link.submenu ? (
                  <div className="py-2">
                    <button
                      onClick={() => toggleSubmenu(link.name)}
                      className="flex justify-between items-center w-full px-4 py-4 text-gray-800 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-100/50 rounded-xl text-left transition-all duration-300 group"
                    >
                      <span className="font-medium text-lg group-hover:text-emerald-600 transition-colors duration-300">{link.name}</span>
                      <div className={`transform transition-all duration-300 ${
                        openSubmenu === link.name ? 'rotate-180 text-emerald-600' : 'text-gray-500'
                      }`}>
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </button>
                    
                    {/* Submenu with slide animation */}
                    <div
                      className={`transition-all duration-500 ease-out overflow-hidden ${
                        openSubmenu === link.name
                          ? "max-h-96 opacity-100 translate-y-0"
                          : "max-h-0 opacity-0 -translate-y-2"
                      }`}
                    >
                      <div className="pl-4 py-2 space-y-1">
                        {link.submenu.map((subitem, subIndex) => (
                          <a
                            key={subitem.name}
                            href={subitem.href}
                            className={`block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-100/50 hover:text-emerald-600 rounded-lg text-sm transition-all duration-300 transform hover:translate-x-2 hover:scale-105 ${
                              openSubmenu === link.name 
                                ? 'translate-x-0 opacity-100' 
                                : 'translate-x-4 opacity-0'
                            }`}
                            onClick={handleLinkClick}
                            style={{
                              transitionDelay: openSubmenu === link.name ? `${subIndex * 50}ms` : '0ms'
                            }}
                          >
                            <span className="relative">
                              {subitem.name}
                              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></div>
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    href={link.href}
                    className="block px-4 py-4 text-gray-800 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-100/50 hover:text-emerald-600 rounded-xl font-medium text-lg transition-all duration-300 transform hover:translate-x-2 hover:scale-105 relative group"
                    onClick={handleLinkClick}
                  >
                    <span className="relative">
                      {link.name}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></div>
                    </span>
                  </a>
                )}
              </div>
            ))}
            
            {/* Mobile CTA Button */}
            <div className={`pt-6 transform transition-all duration-500 ${
              isOpen 
                ? 'translate-y-0 opacity-100 scale-100' 
                : 'translate-y-4 opacity-0 scale-95'
            }`}
            style={{
              transitionDelay: isOpen ? `${links.length * 100}ms` : '0ms'
            }}>
              <a href="/contact" onClick={handleLinkClick}>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-4 rounded-2xl font-medium text-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 transform hover:scale-105 hover:-translate-y-1">
                  <span className="flex items-center justify-center">
                    Get Started
                    <div className="ml-2 w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
                      →
                    </div>
                  </span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(20px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(-5px); 
          }
          70% {
            transform: scale(0.95) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-slide-in {
          animation: slideInFromTop 0.3s ease-out;
        }

        .animate-slide-left {
          animation: slideInFromLeft 0.3s ease-out;
        }

        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out;
        }
      `}</style>
    </>
  );
}