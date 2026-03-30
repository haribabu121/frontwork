import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams, Link } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaCog,
  FaInfoCircle,
  FaIndustry,
  FaPhoneAlt,
  FaBookOpen,
  FaCloud,
  FaDatabase,
  FaRobot,
  FaCheckCircle,
  FaTools,
  FaServer,
  FaWarehouse,
  FaUserTie,
  FaGraduationCap,
  FaLightbulb,
  FaUsers,
//   FaBriefcase,
  FaChalkboardTeacher,
  FaStar,
//   FaHandshake,
  FaChevronDown,
  FaShieldAlt,
  FaClock,
  FaUserGraduate,
  FaHorse,
  FaFire,
  FaMusic,
  FaFireAlt,
  FaPaperPlane,
  FaBolt,
  FaSnowflake,
  FaSmog,
  FaWind
} from "react-icons/fa";
import { GiSparkles, GiFlowers, GiFireworkRocket } from "react-icons/gi";
import { API_URLS, fetchApi } from "../lib/api";

import Logo from './Logo.png';

const DEFAULT_BANNER =
  "✨ Book now and get 10% off on all services! Limited time offer: Free decoration with every booking! ✨";

const MarqueeText = () => {
  const [announcement, setAnnouncement] = useState(DEFAULT_BANNER);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetchApi(API_URLS.CMS_BANNER)
        .then((data) => {
          if (!cancelled && data.ok && data.banner?.text?.trim()) {
            setAnnouncement(data.banner.text.trim());
          }
        })
        .catch(() => {});
    };
    load();

    const onStorage = (e) => {
      if (e.key === "cmsUpdated") load();
    };
    const onCmsDataUpdated = () => load();
    window.addEventListener("storage", onStorage);
    window.addEventListener("cmsDataUpdated", onCmsDataUpdated);
    const t = setInterval(load, 60000);
    return () => {
      cancelled = true;
      clearInterval(t);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cmsDataUpdated", onCmsDataUpdated);
    };
  }, []);

  return (
    <div className="bg-yellow-500 text-black py-1.5 sm:py-2 overflow-hidden w-full z-50 relative">
      <div className="whitespace-nowrap w-full">
        <div className="inline-block whitespace-nowrap animate-marquee hover:pause-marquee">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="mx-4 sm:mx-8 text-xs sm:text-sm font-medium">
              {announcement}
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 25s linear infinite;
          will-change: transform;
        }
        .animate-marquee:hover,
        .hover\:pause-marquee:hover {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 35s;
          }
        }
      `}</style>
    </div>
  );
};

const Navbar = () => {
  return (
    <header className="site-header fixed top-0 left-0 right-0 z-40 flex w-full flex-col bg-white shadow-md">
      <MarqueeText />
      <NavbarContent />
    </header>
  );
};

const NavbarContent = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth > 1024);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth > 1024;
      setIsDesktop(desktop);
      if (desktop) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Close all dropdowns when toggling menu
    if (menuOpen) {
      setShowAbout(false);
      setShowProducts(false);
      setShowServices(false);
    }
  };

  const scrollToSection = (sectionId, closeMenu = true) => {
    const headerOffset = isDesktop ? 148 : 120;
    const performScroll = (attempt = 0) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const elementTop =
          element.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: elementTop > 0 ? elementTop : 0, behavior: "smooth" });
      } else if (attempt < 5) {
        setTimeout(() => performScroll(attempt + 1), 120);
      }
    };

    if (closeMenu) {
      setShowAbout(false);
      setShowProducts(false);
      setShowServices(false);
      setMenuOpen(false);
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => performScroll(), 360);
    } else {
      performScroll();
    }
  };

  const highlightProductCard = (id) => {
    const card = document.getElementById(`product-${id}`);
    if (!card) return;
    
    // Add highlight effect
    card.classList.add("ring-4", "ring-yellow-500", "ring-opacity-70", "transition-all", "duration-1000", "shadow-lg", "z-10", "relative");
    
    // Scroll to the card with some offset from the top
    const headerOffset = 100;
    const elementPosition = card.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Remove highlight after some time
    setTimeout(() => {
      card.classList.remove("ring-4", "ring-yellow-500", "ring-opacity-70", "shadow-lg", "z-10", "relative");
    }, 3000);
  };

  const scrollToProductCard = (productId) => {
    // First navigate to the products section
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: productId } });
    } else {
      // If already on home page, just scroll to the product
      const element = document.getElementById(`product-${productId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        highlightProductCard(productId);
      } else {
        // If product card not found, just scroll to products section
        scrollToSection("products");
      }
    }
    
    // Close mobile menu if open
    setMenuOpen(false);
    setShowProducts(false);
  };

  const scrollToServiceCard = (serviceId) => {
    // Close the menu and dropdowns
    setMenuOpen(false);
    setShowServices(false);
    
    // If not on home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/", { 
        state: { scrollToService: serviceId },
        replace: true
      });
      return;
    }

    // If already on home page, scroll to the service
    const element = document.getElementById(`service-${serviceId}`);
    if (element) {
      const headerOffset = 100; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Add highlight effect
      element.classList.add("ring-4", "ring-yellow-500", "ring-opacity-70", "transition-all", "duration-1000", "shadow-lg", "z-10", "relative");
      
      // Remove highlight after some time
      setTimeout(() => {
        element.classList.remove("ring-4", "ring-yellow-500", "ring-opacity-70", "shadow-lg", "z-10", "relative");
      }, 3000);
    } else {
      // If service card not found, just scroll to services section
      scrollToSection("services");
    }
  };

  // Handle scroll to product when component mounts or location state changes
  useEffect(() => {
    if (location.state?.scrollTo) {
      const productId = location.state.scrollTo;
      const scrollToElement = () => {
        const element = document.getElementById(`product-${productId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          highlightProductCard(productId);
          // Clear the state to prevent re-scrolling
          window.history.replaceState({}, document.title);
        } else if (document.readyState === 'complete') {
          // If document is already loaded but element not found, try one more time after a delay
          setTimeout(() => {
            const el = document.getElementById(`product-${productId}`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              highlightProductCard(productId);
              window.history.replaceState({}, document.title);
            }
          }, 500);
        }
      };

      // If products section is not loaded yet, wait for it
      if (!document.getElementById('products')) {
        const checkProductsLoaded = setInterval(() => {
          if (document.getElementById('products')) {
            clearInterval(checkProductsLoaded);
            scrollToElement();
          }
        }, 100);
      } else {
        scrollToElement();
      }
    }
  }, [location.state]);

  const handleCurrentOpeningsClick = () => {
    setMenuOpen(false);
    if (location.pathname !== "/careers") navigate("/careers");
  };

  // Handle scroll to service when component mounts or location state changes
  useEffect(() => {
    if (location.state?.scrollToService) {
      const serviceId = location.state.scrollToService;
      const scrollToElement = () => {
        const element = document.getElementById(`service-${serviceId}`);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Add highlight effect
          element.classList.add("ring-4", "ring-yellow-500", "ring-opacity-70", "transition-all", "duration-1000", "shadow-lg", "z-10", "relative");
          
          // Remove highlight after some time
          setTimeout(() => {
            element.classList.remove("ring-4", "ring-yellow-500", "ring-opacity-70", "shadow-lg", "z-10", "relative");
          }, 3000);

          // Clear the state to prevent re-scrolling
          window.history.replaceState({}, document.title);
        } else if (document.readyState === 'complete') {
          // If document is already loaded but element not found, try one more time after a delay
          setTimeout(() => {
            const el = document.getElementById(`service-${serviceId}`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              // Add highlight effect
              el.classList.add("ring-4", "ring-yellow-500", "ring-opacity-70", "transition-all", "duration-1000", "shadow-lg", "z-10", "relative");
              // Remove highlight after some time
              setTimeout(() => {
                el.classList.remove("ring-4", "ring-yellow-500", "ring-opacity-70", "shadow-lg", "z-10", "relative");
              }, 3000);
            }
          }, 100);
        }
      };

      // Try scrolling immediately
      scrollToElement();

      // Add event listener for when the component mounts
      window.addEventListener('load', scrollToElement);

      // Cleanup
      return () => {
        window.removeEventListener('load', scrollToElement);
      };
    }
  }, [location.state]);

  return (
    <nav className="relative w-full border-b border-gray-200 bg-white px-3 sm:px-6 lg:px-8 py-2 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 min-h-[3.25rem] sm:min-h-16 relative">
          {/* Logo */}
          <div className="flex h-10 sm:h-12 shrink-0 items-center max-w-[42vw] sm:max-w-none">
            <Link to="/" className="block leading-none">
              <img
                src={Logo}
                alt="AK Events & Fireworks"
                className="h-9 w-auto max-h-10 sm:h-11 sm:max-h-12 md:max-h-[3.25rem] object-contain object-left hover:scale-105 transition-transform"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-end">
            {/* Navigation items will be here */}
          </div>
          
          {/* Mobile Menu Button - Positioned on the right */}
          <div className="lg:hidden shrink-0">
            <button
              type="button"
              onClick={toggleMenu}
              className="rounded-lg p-2 text-2xl leading-none text-gray-700 hover:bg-gray-100 hover:text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Menu */}
          <ul
            className={`text-sm font-small z-[1001] lg:flex lg:items-center lg:gap-6 xl:gap-8 lg:static lg:w-auto lg:max-h-none lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none
            ${
              menuOpen
                ? "flex flex-col absolute left-0 right-0 top-full w-full max-h-[min(72vh,calc(100dvh-var(--header-stack-h)))] overflow-y-auto border-t border-gray-100 bg-white p-4 shadow-lg gap-1 sm:gap-2 sm:p-6"
                : "hidden lg:flex"
            }`}
          >

          {/* Home */}
          <Link
            to="/"
            className={`flex items-center gap-2 cursor-pointer rounded-lg py-2.5 lg:py-1 ${location.pathname === "/" ? "text-green-600" : "hover:text-green-600"}`}
          >
            <FaHome /> Home
          </Link>

          {/* About Us */}
          <div
            onMouseEnter={() => isDesktop && setShowAbout(true)}
            onMouseLeave={() => isDesktop && setShowAbout(false)}
            className="relative"
          >
            <div 
              onClick={() => !isDesktop && setShowAbout(!showAbout)}
              className="flex items-center gap-2 cursor-pointer hover:text-green-600 py-2.5 lg:py-1"
            >
              <FaInfoCircle /> About Us
              <FaChevronDown className={`transition ${showAbout ? "rotate-180" : ""}`} />
            </div>

            {/* Dropdown */}
            <ul
              className={`top-full rounded-lg border border-gray-100 bg-white p-2 shadow-xl transition-all z-50 w-full lg:absolute lg:left-0 lg:w-56 lg:border-0
              ${showAbout ? "opacity-100 visible translate-y-0" : "hidden lg:block lg:pointer-events-none lg:opacity-0 lg:invisible lg:-translate-y-3"}`}
              style={{ zIndex: 1002, maxHeight: "min(60vh, 20rem)", overflowY: "auto" }}
            >
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToSection("about-us")}>
                <FaInfoCircle /> About Us
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToSection("executive-team")}>
                <FaUsers /> Leadership Team
              </li>
              {/* <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToSection("collaboration")}>
                <FaHandshake /> Collaboration
              </li> */}
              {/* <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToSection("testimonials")}>
                <FaStar /> Customer Reviews
              </li> */}
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToSection("faq")}>
                <FaBookOpen /> FAQs
              </li>
            </ul>
          </div>

          {/* Products */}
          <div
            onMouseEnter={() => isDesktop && setShowProducts(true)}
            onMouseLeave={() => isDesktop && setShowProducts(false)}
            className="relative"
          >
            <div 
              onClick={() => !isDesktop && setShowProducts(!showProducts)}
              className="flex items-center gap-2 cursor-pointer hover:text-green-600 py-2.5 lg:py-1"
            >
              <FaBoxOpen /> Products
              <FaChevronDown className={`transition ${showProducts ? "rotate-180" : ""}`} />
            </div>

            {/* Dropdown */}
            <ul
              className={`top-full w-full rounded-lg border border-gray-100 bg-white p-2 shadow-xl transition-all z-50 lg:absolute lg:left-0 lg:w-60 lg:border-0
              ${showProducts ? "opacity-100 visible translate-y-0" : "hidden lg:block lg:pointer-events-none lg:opacity-0 lg:invisible lg:-translate-y-3"}`}
              style={{ zIndex: 1002, maxHeight: "min(55vh, 22rem)", overflowY: "auto" }}
            >
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("sparkcular-machines")}>
                <FaFireAlt className="text-orange-500" /> sparkcular machines
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("fire-flame-machines")}>
                <FaFire className="text-red-500" /> fire flame machines
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("co2-jets")}>
                <FaWind className="text-blue-300" /> co2 jets & liquid jets
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("smoke-bubble-machines")}>
                <FaCloud className="text-gray-400" /> smoke bubble machines
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("co2-jumbo-paper-machines")}>
                <FaPaperPlane className="text-blue-400" /> Co2 jumbo paper machines
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("co2-jet")}>
                <FaBolt className="text-yellow-400" /> Co2 jet
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("cold-fires")}>
                <FaSnowflake className="text-blue-200" /> cold fires
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("smoke-gun")}>
                <FaSmog className="text-gray-500" /> smoke gun
              </li>
            </ul>
          </div>

          {/* Services */}
          <div
            onMouseEnter={() => isDesktop && setShowServices(true)}
            onMouseLeave={() => isDesktop && setShowServices(false)}
            className="relative"
          >
            <div 
              className="flex items-center gap-2 cursor-pointer hover:text-green-600 py-2.5 lg:py-1"
              onClick={(e) => {
                e.stopPropagation();
                scrollToSection('services');
              }}
            >
              <FaCog /> Services
              <FaChevronDown 
                className={`transition ${showServices ? "rotate-180" : ""}`} 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowServices(!showServices);
                }}
              />
            </div>

            <ul
              className={`top-full w-full rounded-lg border border-gray-100 bg-white p-2 shadow-xl transition-all z-50 lg:absolute lg:left-0 lg:w-64 lg:border-0
              ${showServices ? "opacity-100 visible translate-y-0" : "hidden lg:block lg:pointer-events-none lg:opacity-0 lg:invisible lg:-translate-y-3"}`}
              style={{ zIndex: 1002, maxHeight: "min(55vh, 24rem)", overflowY: "auto" }}
            >
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("cloud-effects")}>
                <FaCloud className="text-blue-400" /> Cloud Effects
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("luxury-wedding")}>
                <GiSparkles className="text-yellow-500" /> Luxury Wedding & Event Design
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("grand-entry")}>
                <FaHorse className="text-amber-700" /> Grand Entry Concepts
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("venue-decoration")}>
                <GiFlowers className="text-pink-500" /> Venue Decoration
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("fireworks")}>
                <FaFire className="text-red-500" /> High-Impact Fireworks
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("sound-light")}>
                <FaMusic className="text-purple-500" /> Sound, Light & Visual Effects
              </li>
              {/* <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("data-engineering")}>
                <FaDatabase /> Data Engineering
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("event-support")}>
                <FaTools /> Event Support
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("software-engineering")}>
                <FaServer /> Software Engineering
              </li> */}
            </ul>
          </div>

          {/* Industries */}
          {/* <li className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
            <FaIndustry /> Industries
          </li> */}

          {/* Contact */}
          <Link
            to="/contact"
            className="flex items-center gap-2 rounded-lg py-2.5 hover:text-green-600 cursor-pointer lg:py-1"
          >
            <FaPhoneAlt /> Contact Us
          </Link>

          {/* Case Studies */}
          {/* <li className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
            <FaBookOpen /> Case Studies
          </li> */}
          </ul>
        </div>
      </nav>
  );
};

export default Navbar;
