"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import {
  FaShieldAlt,
  FaUserPlus,
  FaChartLine,FaCreditCard,FaHospital,FaSearch,
  FaBolt,FaRupeeSign,FaSearchDollar,
    FaHandHoldingMedical,
  FaFileMedical,
  FaCheck,
  FaHospitalSymbol,
  FaPlus,
  FaPiggyBank,
  FaWallet,
  FaMobileAlt,
  FaVirus,
  FaAmbulance,
  FaBaby,
  FaStethoscope,
  FaClinicMedical,
  FaUsers,
  FaLock,
  FaHome,
  FaRunning,
  FaGem,
  FaFileAlt,
  FaCheckCircle,
  FaStar,
  FaAward,
  FaDollarSign,
  FaRegSmileBeam,
  FaMoneyBillAlt,
  FaHandHoldingHeart,
  FaBalanceScale
} from "react-icons/fa";

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    age: "",
    coverage: "₹10,00,000",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ← loading state

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  interface FormDataInterface {
    email: string;
    age: string;
    coverage: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // ← start loading

    const { email, age, coverage } = formData;
    const htmlBody = `
      <h2>Instant Quote Request</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Coverage Amount:</strong> ${coverage}</p>
    `;

    try {
      const res = await fetch("/api/sendemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "christy@christel.in",
          subject: `Quote Request from ${email}`,
          html: htmlBody,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error ${res.status}: ${text}`);
      }

      const data = await res.json();
      console.log("Email sent:", data);
      alert("Quote request submitted! We will contact you soon.");

      setFormData({ email: "", age: "", coverage: "₹10,00,000" });
    } catch (err: any) {
      console.error("Error sending email:", err);
      alert("Failed to submit. Please try again later.");
    } finally {
      setIsLoading(false); // ← stop loading
    }
  };

  return (
    <div
      className={`transform transition-all duration-1000 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
      } bg-white/15 backdrop-blur-xl p-8 rounded-3xl border border-white/30 mt-8 shadow-2xl hover:shadow-3xl hover:bg-white/20 transition-all duration-500`}
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
          <FaShieldAlt className="text-white w-6 h-6" />
        </div>
        <h3 className="text-white text-2xl font-bold">Get Your Instant Quote</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label className="block text-white/90 mb-3 font-semibold text-sm uppercase tracking-wide">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your Email-id"
            className="w-full p-4 border border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/30 transition-all duration-300 group-hover:border-white/50"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
            disabled={isLoading}
          />
        </div>

        <div className="group">
          <label className="block text-white/90 mb-3 font-semibold text-sm uppercase tracking-wide">
            Age
          </label>
          <input
            type="number"
            placeholder="Enter your age"
            className="w-full p-4 border border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/30 transition-all duration-300 group-hover:border-white/50"
            value={formData.age}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, age: e.target.value }))
            }
            required
            disabled={isLoading}
          />
        </div>

        <div className="group">
          <label className="block text-white/90 mb-3 font-semibold text-sm uppercase tracking-wide">
            Coverage Amount
          </label>
          <select
            className="w-full text-black/80 p-4 border border-white/80 rounded-xl bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/30 transition-all duration-300 group-hover:border-white/50"
            value={formData.coverage}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, coverage: e.target.value }))
            }
            disabled={isLoading}
          >
            <option>₹10,00,000</option>
            <option>₹25,00,000</option>
            <option>₹50,00,000</option>
            <option>₹1,00,00,000</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform relative overflow-hidden group ${
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-2 hover:scale-105"
          }`}
        >
          {isLoading ? (
            <span className="relative flex items-center justify-center gap-2">
              {/* You can replace this with any spinner icon */}
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Sending…
            </span>
          ) : (
            <span className="relative flex items-center justify-center gap-2">
              <FaChartLine className="mr-2 w-5 h-5" />
              Get My Quote Now
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

import { ReactNode } from "react";
const AnimatedCard = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  index,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: string;
  index: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`card-${index}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [delay, index]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "left":
          return "translateX(-100px)";
        case "right":
          return "translateX(100px)";
        case "down":
          return "translateY(-50px)";
        default:
          return "translateY(50px)";
      }
    }
    return "translate(0)";
  };

  return (
    <div
      id={`card-${index}`}
      className={`transform transition-all duration-1000 ease-out ${className}`}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

const FloatingElement = ({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay: number;
}) => (
  <div
    className="floating-element"
    style={{
      animationDelay: `${delay}s`,
      animation: "float-gentle 8s ease-in-out infinite",
    }}
  >
    {children}
  </div>
);

const TypewriterText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }
    }, delay + currentIndex * 50);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState(0);
  const [selectedRequirement, setSelectedRequirement] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setHeroVisible(true), 200);
    const timer2 = setTimeout(() => setStatsVisible(true), 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-gray-900 text-white">
      <style jsx>{`
        @keyframes float-gentle {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }
        .floating-element {
          animation: float-gentle 6s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center relative z-10 pt-2"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-vector/gradient-blur-pink-blue-abstract-background_53876-117324.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-pink-900/40 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-0" />

        <div className="max-w-7xl mx-auto px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div
              className={`transform transition-all duration-1200 ease-out ${
                heroVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 leading-tight text-white drop-shadow-2xl mt-2">
                Family Insurance
                <br />
                <span className="text-black drop-shadow-lg">Plan</span>
              </h1>
              <p
                className={`text-xl text-white/95 mb-10 max-w-lg leading-relaxed drop-shadow-lg transform transition-all duration-1000 ${
                  heroVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
"A happy family makes life truly fulfilling. Protect your loved ones from unexpected medical costs with a comprehensive family health insurance plan."              </p>
              <div
                className={`flex flex-col sm:flex-row gap-6 mb-10 transform transition-all duration-1000 ${
                  heroVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <a
                  href="#quote"
                  className="group bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/60 hover:-translate-y-3 hover:scale-105 transition-all duration-300 text-center relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center justify-center">
                    <FaChartLine className="mr-3 w-5 h-5" />
                    Get Instant Quote
                  </span>
                </a>
                <a
                  href="/contact"
                  className="group border-2 border-white/60 backdrop-blur-sm text-white font-bold px-10 py-5 rounded-2xl hover:bg-white hover:text-gray-900 hover:-translate-y-3 hover:scale-105 transition-all duration-300 text-center relative overflow-hidden"
                >
                  <span className="flex items-center justify-center">
                    <FaUsers className="mr-3 w-5 h-5" />
                    Talk to Expert
                  </span>
                </a>
              </div>
              <QuoteForm />
            </div>

            {/* Right Side with Moving Ball Animation */}
            <div
              className={`transform transition-all duration-1200 ease-out ${
                heroVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="relative z-10 transform hover:scale-105 transition-all duration-700">
                <div className="relative">
                  <img
                    src="https://img.freepik.com/free-vector/protection-concept-illustration_114360-17285.jpg?t=st=1748619613~exp=1748623213~hmac=3d587f0cdf6a77b11ceb7a813c4fbfb1e11d1fda4f712e40bee8cbd3b8da2676&w=1380"
                    alt="Family Protection"
                    className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl shadow-emerald-500/20 border-4 border-white/30 backdrop-blur-sm"
                  />

                  {/* Moving Ball Element */}
                  <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-80 floating-element shadow-2xl"></div>

                  {/* Floating Stats */}
                  <FloatingElement delay={1}>
                    <div
                      className={`absolute -top-16 -left-16 transform transition-all duration-1000 ${
                        statsVisible
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0"
                      }`}
                    >
                      <div className="bg-white/15 backdrop-blur-xl p-6 rounded-2xl border border-white/30 shadow-2xl hover:bg-white/20 transition-all duration-300">
                        <div className="text-emerald-400 font-black text-3xl flex items-center">
                          <FaDollarSign className="mr-2 w-8 h-8" />
                          ₹10L+
                        </div>
                        <div className="text-white/90 text-sm font-semibold">
                          Maximum Coverage
                        </div>
                      </div>
                    </div>
                  </FloatingElement>

                  <FloatingElement delay={2}>
                    <div
                      className={`absolute -bottom-16 -right-16 transform transition-all duration-1000 ${
                        statsVisible
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0"
                      }`}
                      style={{ transitionDelay: "200ms" }}
                    >
                      <div className="bg-white/15 backdrop-blur-xl p-6 rounded-2xl border border-white/30 shadow-2xl hover:bg-white/20 transition-all duration-300">
                        <div className="text-cyan-400 font-black text-3xl flex items-center">
                          <FaStar className="mr-2 w-8 h-8" />
                          4.9/5
                        </div>
                        <div className="text-white/90 text-sm font-semibold">
                          Customer Rating
                        </div>
                      </div>
                    </div>
                  </FloatingElement>

                  <FloatingElement delay={3}>
                    <div
                      className={`absolute top-1/2 -left-20 transform transition-all duration-1000 ${
                        statsVisible
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0"
                      }`}
                      style={{ transitionDelay: "400ms" }}
                    >
                      <div className="bg-white/15 backdrop-blur-xl p-4 rounded-2xl border border-white/30 shadow-2xl hover:bg-white/20 transition-all duration-300">
                        <div className="text-pink-400 font-black text-2xl flex items-center">
                          <FaAward className="mr-2 w-6 h-6" />
                          99.2%
                        </div>
                        <div className="text-white/90 text-xs font-semibold">
                          Claim Success
                        </div>
                      </div>
                    </div>
                  </FloatingElement>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

<section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-green-200 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-gray-300 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-800 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4 border border-green-200">
            Family Protection
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-gray-800">
              Family Health Insurance: Protect What Matters Most
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive coverage designed for your entire family's healthcare needs
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Comprehensive Coverage */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4 border border-green-200">
                  <FaShieldAlt className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Comprehensive Coverage for Hospitalisation</h3>
                  <p className="text-gray-600">
                    Covers pre- and post-hospitalisation (30-60 days prior, 90 days after) with cashless treatment at network hospitals. 
                    Focus on recovery, not payments.
                  </p>
                </div>
              </div>
            </div>

            {/* Coverage for Family */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4 border border-green-200">
                  <FaUserPlus className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Single Policy for Entire Family</h3>
                  <p className="text-gray-600">
                    One sum insured shared by all members. Balance coverage limits with affordable premiums based on your family's needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Who Should Opt */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4 border border-green-200">
                  <FaFileMedical className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Ideal For Breadwinners</h3>
                  <p className="text-gray-600">
                    Married individuals or family providers can safeguard loved ones from medical financial burdens during emergencies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="bg-green-100 p-2 rounded-lg mr-3 border border-green-200">
                <FaSearch className="text-green-600" />
              </div>
              Choosing the Right Family Plan
            </h3>

            <ul className="space-y-4 mb-8">
              {[
                "Coverage amount vs premium balance",
                "List of covered diseases & treatments",
                "Add-ons: maternity, health checkups",
                "Cashless claim process simplicity",
                "Lifelong renewability options"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1 border border-green-200">
                    <FaCheck className="text-green-600 text-xs" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            {/* Diseases Covered */}
            <div className="mb-6 bg-green-50 p-5 rounded-lg border border-green-100">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-2 border border-green-200">
                  <FaHandHoldingMedical className="text-green-600" />
                </div>
                Diseases Covered
              </h4>
              <p className="text-gray-600 text-sm">
                Review covered illnesses carefully—this determines claim eligibility for your family's specific health needs.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Diabetes", "Cardiac", "Cancer", "Renal", "Neurological"].map((disease, i) => (
                  <span key={i} className="bg-white text-green-800 text-xs px-3 py-1 rounded-full border border-green-200">
                    {disease}
                  </span>
                ))}
                <span className="bg-white text-green-800 text-xs px-3 py-1 rounded-full border border-green-200 flex items-center">
                  <FaPlus className="mr-1 text-xs" /> 30+ more
                </span>
              </div>
            </div>

            {/* Network Hospitals */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-2 border border-green-200">
                  <FaHospitalSymbol className="text-green-600" />
                </div>
                Network Hospitals
              </h4>
              <p className="text-gray-600 text-sm">
                5,000+ cashless hospitals nationwide for emergency access. Wider network = better convenience.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Link href="/contact">
          <button className="bg-gradient-to-r from-green-600 to-gray-800 hover:from-green-700 hover:to-gray-900 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-sm">
            Get Family Health Quote
          </button>
          </Link>
          <p className="text-gray-500 text-sm mt-4">
            *Terms apply. Coverage varies by plan. Premiums eligible for 80D tax benefits.
          </p>
        </div>
      </div>
    </section>
      {/* Benefits Section with Numbered Points */}
<section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-green-200 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-gray-300 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-800 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4 border border-green-200">
            Smart Protection
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-gray-800">
              Benefits of Family Health Insurance
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            One policy for complete family protection - smarter, simpler, and more affordable
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Benefit 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-200">
              <FaShieldAlt className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Complete Family Coverage</h3>
            <p className="text-gray-600">
              Single policy protects all members - no need for multiple individual plans
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-200">
              <FaHospital className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Hassle-Free Hospitalisation</h3>
            <p className="text-gray-600">
              Cashless treatment at 5,000+ network hospitals nationwide
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-200">
              <FaRupeeSign className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Financial Security</h3>
            <p className="text-gray-600">
              Protect savings from unexpected medical expenses
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-200">
              <FaWallet className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Cost-Effective</h3>
            <p className="text-gray-600">
              More affordable than individual policies for each member
            </p>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Benefit 5 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-200">
              <FaUserPlus className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Easy Member Addition</h3>
            <p className="text-gray-600">
              Simply add newborns or new family members anytime
            </p>
          </div>

          {/* Benefit 6 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-200">
              <FaVirus className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">COVID-19 Coverage</h3>
            <p className="text-gray-600">
              Special protection against pandemic-related treatments
            </p>
          </div>

          {/* Benefit 7 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-200">
              <FaPiggyBank className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Tax Benefits</h3>
            <p className="text-gray-600">
              Premiums eligible under Section 80D (₹25,000-₹50,000)
            </p>
          </div>

          {/* Benefit 8 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-200">
              <FaMobileAlt className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Corporate Coverage Gap Filler</h3>
            <p className="text-gray-600">
              Supplements limited employer-provided health plans
            </p>
          </div>
        </div>

        {/* Online Purchase Benefits */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-gray-800">
                Why Buy Family Health Insurance Online?
              </span>
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Digital purchase brings unmatched convenience and advantages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Online Benefit 1 */}
            <div className="border-l-4 border-green-500 pl-4">
              <div className="bg-green-100 p-2 rounded-lg w-10 h-10 flex items-center justify-center mb-3 border border-green-200">
                <FaMobileAlt className="text-green-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">24/7 Convenience</h4>
              <p className="text-gray-600 text-sm">
                Compare and purchase anytime - no queues or paperwork
              </p>
            </div>

            {/* Online Benefit 2 */}
            <div className="border-l-4 border-green-500 pl-4">
              <div className="bg-green-100 p-2 rounded-lg w-10 h-10 flex items-center justify-center mb-3 border border-green-200">
                <FaSearchDollar className="text-green-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Instant Quotes</h4>
              <p className="text-gray-600 text-sm">
                Real-time premium comparisons from top insurers
              </p>
            </div>

            {/* Online Benefit 3 */}
            <div className="border-l-4 border-green-500 pl-4">
              <div className="bg-green-100 p-2 rounded-lg w-10 h-10 flex items-center justify-center mb-3 border border-green-200">
                <FaCreditCard className="text-green-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Secure Payments</h4>
              <p className="text-gray-600 text-sm">
                Multiple protected payment options available
              </p>
            </div>

            {/* Online Benefit 4 */}
            <div className="border-l-4 border-green-500 pl-4">
              <div className="bg-green-100 p-2 rounded-lg w-10 h-10 flex items-center justify-center mb-3 border border-green-200">
                <FaBolt className="text-green-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Fast Issuance</h4>
              <p className="text-gray-600 text-sm">
                Digital policy documents delivered within hours
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Link href="/contact">
          <button className="bg-gradient-to-r from-green-600 to-gray-800 hover:from-green-700 hover:to-gray-900 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-sm">
            Compare Family Plans Online
          </button>
          </Link>
          <p className="text-gray-500 text-sm mt-4">
            *Terms apply. Tax benefits subject to change. Network hospitals may vary.
          </p>
        </div>
      </div>
    </section>
    </main>
  );
}
