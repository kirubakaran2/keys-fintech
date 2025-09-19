"use client";
import Link from 'next/link';
import { useState, useEffect, ReactNode } from "react";
import {
  FaShieldAlt,
  FaChartBar,
  FaChartLine,
  FaPuzzlePiece,
  FaChartPie,
  FaChessKnight,
  FaFileInvoiceDollar,
  FaRupeeSign,
  FaExchangeAlt,
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
  FaBalanceScale,
  FaChessKing,
  FaChessPawn,
  FaUserTie,
  FaHandshake,
  FaCoins
} from "react-icons/fa";

interface FormSubmitEvent {
  preventDefault: () => void;
}

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    age: "",
    coverage: "₹10,00,000",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: FormSubmitEvent): void => {
    e.preventDefault();
    alert("Quote request submitted! We will contact you soon.");
  };

  return (
    <div
      className={`transform transition-all duration-1000 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
      } bg-white/15 backdrop-blur-xl p-8 rounded-3xl border border-white/30 mt-8 shadow-2xl hover:shadow-3xl hover:bg-white/20 transition-all duration-500`}
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
          <FaShieldAlt className="text-white w-6 h-6" />
        </div>
        <h3 className="text-white text-2xl font-bold">
          Get Your Instant Quote
        </h3>
      </div>
      <div className="space-y-6">
        <div className="group">
          <label className="block text-white/90 mb-3 font-semibold text-sm uppercase tracking-wide">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your Email-id"
            className="w-full p-4 border border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/30 transition-all duration-300 group-hover:border-white/50"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="group">
          <label className="block text-white/90 mb-3 font-semibold text-sm uppercase tracking-wide">
            Age
          </label>
          <input
            type="number"
            placeholder="Enter your age"
            className="w-full p-4 border border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/30 transition-all duration-300 group-hover:border-white/50"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>
        <div className="group">
          <label className="block text-white/90 mb-3 font-semibold text-sm uppercase tracking-wide">
            Coverage Amount
          </label>
          <select
            className="w-full p-4 border border-green-30 rounded-xl bg-black/10 backdrop-blur-sm text-black focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/30 transition-all duration-300 group-hover:border-green/50"
            value={formData.coverage}
            onChange={(e) =>
              setFormData({ ...formData, coverage: e.target.value })
            }
          >
            <option>₹10,00,000</option>
            <option>₹25,00,000</option>
            <option>₹50,00,000</option>
            <option>₹1,00,00,000</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:-translate-y-2 hover:scale-105 transform relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center justify-center">
            <FaChartLine className="mr-2 w-5 h-5" />
            Get My Quote Now
          </span>
        </button>
      </div>
    </div>
  );
};

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

const PortfolioManagement = () => {
  const [activeTab, setActiveTab] = useState('definition');
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  const managementTypes = [
    {
      id: 'active',
      title: 'Active Management',
      icon: <FaChessKing className="text-2xl" />,
      color: 'from-green-500 to-emerald-600',
      description: 'Strategic moves to outperform market benchmarks through continuous analysis and timely decisions.'
    },
    {
      id: 'passive',
      title: 'Passive Management',
      icon: <FaChessPawn className="text-2xl" />,
      color: 'from-emerald-500 to-teal-600',
      description: 'Market-mirroring approach that prioritizes steady growth with minimal intervention.'
    },
    {
      id: 'discretionary',
      title: 'Discretionary',
      icon: <FaUserTie className="text-2xl" />,
      color: 'from-lime-500 to-green-600',
      description: 'Full delegation to experts who make real-time decisions on your behalf.'
    },
    {
      id: 'non-discretionary',
      title: 'Non-Discretionary',
      icon: <FaHandshake className="text-2xl" />,
      color: 'from-green-500 to-cyan-600',
      description: 'Collaborative approach where you retain final approval on all investment moves.'
    }
  ];

  const managerRoles = [
    { icon: <FaChartLine />, title: "Market Analyst", description: "Deciphers complex market trends" },
    { icon: <FaBalanceScale />, title: "Risk Balancer", description: "Maintains optimal risk-reward ratio" },
    { icon: <FaCoins />, title: "Asset Allocator", description: "Designs diversified investment mix" },
    { icon: <FaShieldAlt />, title: "Wealth Guardian", description: "Protects your financial future" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-green-200 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-60 h-60 rounded-full bg-green-200 blur-3xl animate-float-delay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Interactive header */}
        <div className="text-center mb-12">
          <div className="inline-flex bg-white shadow-sm rounded-full p-1 mb-6 border border-gray-200">
            <button
              onClick={() => setActiveTab('definition')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'definition' ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md' : 'text-gray-600 hover:text-green-600'}`}
            >
              What is it?
            </button>
            <button
              onClick={() => setActiveTab('types')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'types' ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md' : 'text-gray-600 hover:text-green-600'}`}
            >
              Management Types
            </button>
            <button
              onClick={() => setActiveTab('manager')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'manager' ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md' : 'text-gray-600 hover:text-green-600'}`}
            >
              The Manager's Role
            </button>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              {activeTab === 'definition' && 'Strategic Wealth Architecture'}
              {activeTab === 'types' && 'Investment Strategy Spectrum'}
              {activeTab === 'manager' && 'Your Financial Conductor'}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {activeTab === 'definition' && 'Crafting investment symphonies that grow with your ambitions'}
            {activeTab === 'types' && 'Different approaches for different financial personalities'}
            {activeTab === 'manager' && 'The maestro who orchestrates your financial future'}
          </p>
        </div>

        {/* Content sections */}
        <div className="transition-all duration-300">
          {activeTab === 'definition' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Portfolio Management Defined</h3>
                  <p className="text-gray-600 mb-6">
                    Portfolio management is the <span className="font-semibold text-green-600">art and science</span> of strategically combining different investment instruments—equities, bonds, mutual funds, FDs, RDs—into a cohesive financial ecosystem tailored to your unique goals and risk appetite.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-lg mr-4">
                        <FaChartLine className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Purpose</h4>
                        <p className="text-gray-600">Align investments with your financial DNA—balancing growth aspirations with risk tolerance</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-lg mr-4">
                        <FaBalanceScale className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Outcome</h4>
                        <p className="text-gray-600">Optimized returns through strategic diversification and continuous performance tuning</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <div className="grid grid-cols-2 gap-4">
                    {['Stocks', 'Bonds', 'Mutual Funds', 'FDs', 'RDs', 'ETFs'].map((item, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center flex-col">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                          <div className="w-2 h-2 rounded-full bg-green-600"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-4">Investment Building Blocks</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'types' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {managementTypes.map((type) => (
                <div
                  key={type.id}
                  onMouseEnter={() => setHoveredType(type.id)}
                  onMouseLeave={() => setHoveredType(null)}
                  className={`bg-white rounded-xl shadow-sm border transition-all duration-300 ${hoveredType === type.id ? 'border-green-500 transform -translate-y-2 shadow-lg' : 'border-gray-200'}`}
                >
                  <div className={`p-6 rounded-t-xl bg-gradient-to-r ${type.color} text-white`}>
                    <div className="flex justify-between items-center">
                      {type.icon}
                      <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
                        {type.id === 'active' && 'High Engagement'}
                        {type.id === 'passive' && 'Low Maintenance'}
                        {type.id === 'discretionary' && 'Full Trust'}
                        {type.id === 'non-discretionary' && 'Shared Control'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mt-4">{type.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        {type.id === 'active' && '🔍 Daily Monitoring'}
                        {type.id === 'passive' && '📅 Quarterly Reviews'}
                        {type.id === 'discretionary' && '🤝 Full Authority'}
                        {type.id === 'non-discretionary' && '✅ Approval Needed'}
                      </span>
                      <span>
                        {type.id === 'active' && 'Risk: ▲▲▲'}
                        {type.id === 'passive' && 'Risk: ▲'}
                        {type.id === 'discretionary' && 'Risk: ▲▲'}
                        {type.id === 'non-discretionary' && 'Risk: ▲▲'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'manager' && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-b from-green-600 to-emerald-700 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">The Portfolio Maestro</h3>
                  <p className="mb-8 opacity-90">
                    A financial virtuoso who transforms market complexity into personalized wealth strategies.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-white/20 p-2 rounded-lg mr-4">
                        <FaUserTie className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold">Qualifications</h4>
                        <p className="text-sm opacity-80">CFA, CFP, or equivalent certifications</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-white/20 p-2 rounded-lg mr-4">
                        <FaChartLine className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold">Experience</h4>
                        <p className="text-sm opacity-80">5+ years in investment management</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-6">Key Responsibilities</h4>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {managerRoles.map((role, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-green-300 transition-colors">
                        <div className="flex items-center mb-3">
                          <div className="bg-green-100 p-2 rounded-lg mr-3 text-green-600">
                            {role.icon}
                          </div>
                          <h5 className="font-bold text-gray-800">{role.title}</h5>
                        </div>
                        <p className="text-gray-600 text-sm">{role.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 bg-green-50 rounded-lg p-4 border border-green-100">
                    <h5 className="font-bold text-green-800 mb-2">Client Relationship</h5>
                    <p className="text-green-700 text-sm">
                      Regular performance reports • Quarterly strategy reviews • 24/7 access during market crises • Personalized tax optimization advice
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interactive CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl">
              Find Your Management Style
            </button>
            <Link href="/contact">
            <button className="bg-white hover:bg-gray-50 text-green-600 font-bold py-3 px-8 rounded-lg transition-all border border-green-200 shadow-sm hover:shadow-md">
              Connect With a Manager
            </button>
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Take our 2-minute quiz to discover your ideal portfolio strategy
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(15px); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 10s ease-in-out infinite; }
      `}</style>
    </section>
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
          0%, 100% {
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
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-green-900/30 to-green-900/40 z-0" />
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
                Portfolio Management
                <br />
              </h1>
              <p
                className={`text-xl text-white/95 mb-10 max-w-lg leading-relaxed drop-shadow-lg transform transition-all duration-1000 ${
                  heroVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                Maximize your portfolio’s potential with guidance from our expert financial advisors. Better returns are within reach—discover how today.
              </p>
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
                  className="group bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl shadow-green-500/30 hover:shadow-green-500/60 hover:-translate-y-3 hover:scale-105 transition-all duration-300 text-center relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
                    src="https://img.freepik.com/free-vector/profile-analysis-concept-illustration_114360-26613.jpg?t=st=1748622025~exp=1748625625~hmac=0473e49282a909a4418c9a3ad366531bb7195680a3bc7097ea433e4b7be54468&w=1380"
                    alt="Family Protection"
                    className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl shadow-green-500/20 border-4 border-white/30 backdrop-blur-sm"
                  />

                  {/* Moving Ball Element */}
                  <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full opacity-80 floating-element shadow-2xl"></div>

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
                        <div className="text-green-400 font-black text-3xl flex items-center">
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

      <PortfolioManagement />
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Metallic decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-green-600 to-gray-700 blur-3xl mix-blend-overlay"></div>
        <div className="absolute bottom-20 right-1/4 w-60 h-60 rounded-full bg-gradient-to-r from-gray-600 to-green-900 blur-3xl mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with metallic accent */}
        <div className="text-center mb-16">
          <span className="inline-block bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-green-500 shadow-lg">
            Strategic Wealth Orchestration
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gray-300">
              Precision Portfolio Management
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Architecting investment strategies that balance growth, security, and tax efficiency
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Left column - Manager Roles */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30">
                  <FaChessKnight className="text-green-400 text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  The Portfolio <span className="text-green-400">Strategist</span>
                </h3>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: <FaPuzzlePiece className="text-green-400" />, title: "Investment Architect", desc: "Crafts bespoke asset combinations matching client profiles" },
                  { icon: <FaShieldAlt className="text-green-400" />, title: "Risk Sentinel", desc: "Implements protective strategies during market volatility" },
                  { icon: <FaBalanceScale className="text-green-400" />, title: "Asset Allocator", desc: "Balances growth and stability through diversification" },
                  { icon: <FaChartBar className="text-green-400" />, title: "Performance Analyst", desc: "Continuously monitors and optimizes portfolio health" },
                  { icon: <FaCoins className="text-green-400" />, title: "Tax Strategist", desc: "Incorporates tax-efficient instruments and timing" },
                  { icon: <FaFileInvoiceDollar className="text-green-400" />, title: "Client Advocate", desc: "Maintains transparent communication and reporting" }
                ].map((role, index) => (
                  <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-800/50 transition-colors border border-transparent hover:border-green-900/30">
                    <div className="bg-gray-700 p-2 rounded-lg mr-4 mt-0.5">
                      {role.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{role.title}</h4>
                      <p className="text-sm text-gray-400">{role.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right columns - Process and Benefits */}
          <div className="lg:col-span-2">
            {/* Process Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30">
                  <FaExchangeAlt className="text-green-400 text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  The <span className="text-green-400">5-Step</span> Management Process
                </h3>
              </div>

              <div className="grid md:grid-cols-5 gap-4">
                {[
                  { step: "1", title: "Planning", color: "from-green-600 to-green-800" },
                  { step: "2", title: "Market Analysis", color: "from-green-700 to-green-900" },
                  { step: "3", title: "Allocation", color: "from-gray-600 to-gray-800" },
                  { step: "4", title: "Execution", color: "from-gray-700 to-gray-900" },
                  { step: "5", title: "Review", color: "from-green-800 to-green-900" }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className={`bg-gradient-to-br ${item.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold border border-gray-500 shadow-inner`}>
                      {item.step}
                    </div>
                    <p className="text-sm font-medium text-gray-300">{item.title}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-green-400 mb-2">Strategic Allocation</h4>
                  <p className="text-sm text-gray-400">Long-term asset mix aligned with financial objectives</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-green-400 mb-2">Tactical Shifts</h4>
                  <p className="text-sm text-gray-400">Opportunistic adjustments based on market conditions</p>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="bg-green-900/50 p-2 rounded-lg mr-4 border border-green-600/30">
                  <FaCoins className="text-green-400 text-xl" />
                </div>
                <span>Strategic <span className="text-green-400">Advantages</span></span>
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Risk Mitigation", desc: "Diversification across uncorrelated assets", icon: "🛡️" },
                  { title: "Tax Optimization", desc: "Strategic use of tax-efficient instruments", icon: "🧾" },
                  { title: "Disciplined Approach", desc: "Systematic investment plans (SIPs)", icon: "📅" },
                  { title: "Liquidity Buffer", desc: "Maintains accessible emergency funds", icon: "💧" },
                  { title: "Performance Tracking", desc: "Regular reviews and rebalancing", icon: "📊" },
                  { title: "Market Adaptation", desc: "Adjusts to changing economic conditions", icon: "🌐" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start p-3 rounded-lg bg-gray-800/30 border border-gray-700 hover:border-green-900/50 transition-colors">
                    <span className="text-xl mr-3 mt-0.5">{benefit.icon}</span>
                    <div>
                      <h4 className="font-bold text-white">{benefit.title}</h4>
                      <p className="text-sm text-gray-400">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Components Section */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Core <span className="text-green-400">Portfolio</span> Components
          </h3>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { 
                title: "Diversification Matrix", 
                desc: "Assets with inverse correlation patterns", 
                icon: <FaPuzzlePiece className="text-green-400 text-2xl" />,
                bg: "bg-gradient-to-br from-gray-700 to-gray-800"
              },
              { 
                title: "Cost Efficiency", 
                desc: "Minimized transaction fees and expense ratios", 
                icon: <FaFileInvoiceDollar className="text-green-400 text-2xl" />,
                bg: "bg-gradient-to-br from-green-900/50 to-gray-800"
              },
              { 
                title: "Tax Shield", 
                desc: "ELSS, tax-free bonds, and harvesting strategies", 
                icon: <FaShieldAlt className="text-green-400 text-2xl" />,
                bg: "bg-gradient-to-br from-gray-800 to-green-900/50"
              },
              { 
                title: "Active Monitoring", 
                desc: "Quarterly rebalancing and performance reviews", 
                icon: <FaChartPie className="text-green-400 text-2xl" />,
                bg: "bg-gradient-to-br from-green-900/70 to-gray-800"
              }
            ].map((component, index) => (
              <div key={index} className={`${component.bg} p-5 rounded-xl border border-gray-700 hover:border-green-600/50 transition-colors`}>
                <div className="flex justify-between items-start mb-4">
                  {component.icon}
                  <span className="text-xs font-bold bg-green-900/30 text-green-400 px-2 py-1 rounded-full border border-green-800">
                    {index+1}
                  </span>
                </div>
                <h4 className="font-bold text-white mb-2">{component.title}</h4>
                <p className="text-sm text-gray-400">{component.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link href="/contact">
          <button className="relative overflow-hidden group bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white font-bold py-4 px-10 rounded-lg transition-all shadow-xl hover:shadow-2xl border border-green-700">
            <span className="relative z-10">Design Your Portfolio Strategy</span>
            <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
          </Link>
          <p className="text-gray-400 text-sm mt-4">
            Get a free portfolio health check with our certified managers
          </p>
        </div>
      </div>
    </section>
    </main>
  );
}
