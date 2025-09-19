"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
// Sample background image URL for demo
const backgroundImageUrl =
  "https://img.freepik.com/free-vector/modern-blue-vibrant-backdrop-with-round-curve-lines-vector_1017-53562.jpg?t=st=1758037183~exp=1758040783~hmac=e4c003a9c38675fabaf851f009a4865f3fd72ac0aeb5f7f98b22cbd8a61eea8c&w=2000";

interface Service {
  name: string;
  type: "gif" | "video";
  url: string;
  thumbnail?: string;
}

interface Stat {
  number: number;
  label: string;
  suffix: string;
}

export default function ProfessionalHero(): JSX.Element {
  const [customerCount, setCustomerCount] = useState<number>(0);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  // Optimized counter with requestAnimationFrame
  useEffect(() => {
    let animationId: number;
    let startTime: number;
    const duration = 3000; // 3 seconds
    const targetCount = 15000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutCubic * targetCount);
      
      setCustomerCount(currentCount);
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Memoized services data
  const services: Service[] = useMemo(() => [
    {
      name: "Fixed Deposits",
      type: "gif",
      url: "https://res.cloudinary.com/dy2gwtbjb/image/upload/v1748412186/fixeddeposit_thhupe.gif",
    },
    {
      name: "Health Insurance",
      type: "gif",
      url: "https://res.cloudinary.com/dy2gwtbjb/image/upload/v1748415598/healthinsurance_vd7enh.gif",
    },
    {
      name: "Home Insurance",
      type: "video",
      url: "https://res.cloudinary.com/dy2gwtbjb/video/upload/v1748412186/homeinsurance_h3v70b.mp4",
      thumbnail:
        "https://res.cloudinary.com/dy2gwtbjb/video/upload/v1748412186/homeinsurance_h3v70b.jpg",
    },
    {
      name: "Mutual Funds",
      type: "video",
      url: "https://res.cloudinary.com/dy2gwtbjb/video/upload/v1748412186/mutualfunds_qx7yrj.mp4",
      thumbnail:
        "https://res.cloudinary.com/dy2gwtbjb/video/upload/v1748412186/mutualfunds_qx7yrj.jpg",
    },
    {
      name: "NPS",
      type: "video",
      url: "https://res.cloudinary.com/dy2gwtbjb/video/upload/v1748412186/nps_oxpyp0.mp4",
      thumbnail:
        "https://res.cloudinary.com/dy2gwtbjb/video/upload/v1748412186/nps_oxpyp0.jpg",
    },
    {
      name: "Stocks",
      type: "video",
      url: "https://res.cloudinary.com/dy2gwtbjb/video/upload/v1748412186/stocks_yrmryu.mp4",
      thumbnail:
        "https://res.cloudinary.com/dy2gwtbjb/video/upload/v1748412186/stocks_yrmryu.jpg",
    },
  ], []);

  // Memoized stats data
  const stats: Stat[] = useMemo(() => [
    { number: customerCount, label: "Happy Customers", suffix: "+" },
    { number: 2025, label: "Year of Excellence", suffix: "" },
    { number: 6, label: "Financial Services", suffix: "+" },
    { number: 24, label: "Hours Support", suffix: "/7" },
  ], [customerCount]);

  // Memoized hover handlers
  const handleServiceHover = useCallback((serviceName: string) => {
    setHoveredService(serviceName);
  }, []);

  const handleServiceLeave = useCallback(() => {
    setHoveredService(null);
  }, []);

  // Optimized video error handler
  const handleVideoError = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const fallback = video.parentElement?.querySelector('.video-fallback') as HTMLElement;
    if (fallback) {
      video.style.display = 'none';
      fallback.style.display = 'flex';
    }
  }, []);

  // Memoized service media renderer
  const renderServiceMedia = useCallback((service: Service) => {
    if (service.type === "gif") {
      return (
        <img
          src={service.url}
          alt={service.name}
          className="w-full h-full object-contain rounded-lg"
          loading="lazy"
          decoding="async"
        />
      );
    } else {
      return (
        <div className="relative w-full h-full">
          <video
            className="w-full h-full object-contain rounded-lg"
            autoPlay
            muted
            loop
            playsInline
            poster={service.thumbnail}
            preload="metadata"
            onError={handleVideoError}
          >
            <source src={service.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Fallback placeholder */}
          <div className="video-fallback absolute inset-0 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold text-xs hidden">
            {service.name
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </div>
        </div>
      );
    }
  }, [handleVideoError]);

  // Optimized background styles
  const backgroundStyles = useMemo(() => ({
          backgroundImage:
            "url(https://img.freepik.com/free-vector/modern-blue-vibrant-backdrop-with-round-curve-lines-vector_1017-53562.jpg?t=st=1758037183~exp=1758040783~hmac=e4c003a9c38675fabaf851f009a4865f3fd72ac0aeb5f7f98b22cbd8a61eea8c&w=2000)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        
    backgroundRepeat: "repeat, no-repeat, no-repeat",
    // backgroundSize: "60px 60px, cover, cover",
    // backgroundPosition: "top left, center center, center center",
    willChange: "transform",
  }), []);

  return (
    <div className="bg-white" style={{ willChange: 'transform' }}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-12 sm:py-16 lg:py-32 overflow-hidden">
        {/* Optimized background */}
        <div
          className="absolute inset-0 "
          style={backgroundStyles}
        />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-4 lg:space-y-6">
                <div className="mt-4 sm:mt-0">
                  <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Trusted Financial Partner Since 2020
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight px-2 sm:px-0">
                  Bringing Wealth Wisdom Home
                </h1>
              </div>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 px-2 sm:px-0">
                Smart financial strategies for insurance, investments, and
                wealth expertly tailored to protect today and build your
                family's future.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-2 sm:px-0 justify-center lg:justify-start">
                <Link href="/contact">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto">
                  Get Free Consultation
                </button>
                </Link>
                <a href="tel:+919444567777">
  <button className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-colors w-full sm:w-auto">
    Call: +91 9444567777
  </button>
</a>

              </div>

              {/* Services Grid */}
              <div className="pt-6 lg:pt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center lg:text-left">
                  Our Services
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto lg:mx-0">
                  {services.map((service) => (
                    <div
                      key={service.name}
                      className="flex flex-col items-center p-3 sm:p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer transform hover:scale-105"
                      onMouseEnter={() => handleServiceHover(service.name)}
                      onMouseLeave={handleServiceLeave}
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mb-2 flex items-center justify-center overflow-hidden">
                        {renderServiceMedia(service)}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-tight">
                        {service.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="relative mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 mx-2 sm:mx-0 backdrop-blur-sm">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Performance Overview 2025
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Building trust through excellence
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className="text-center p-3 sm:p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                        {index === 0
                          ? customerCount.toLocaleString()
                          : stat.number}
                        <span className="text-lg sm:text-xl">
                          {stat.suffix}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 sm:p-6 bg-red-50 rounded-xl border-l-4 border-red-500">
                  <div className="flex items-center">
                    <span className="text-xl sm:text-2xl mr-3 flex-shrink-0">
                      🔒
                    </span>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-red-700 mb-1">
                        Secure Your Family's Future
                      </h4>
                      <p className="text-red-600 text-xs sm:text-sm">
                        Don't wait - start planning today
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements - optimized */}
              <div className="hidden sm:block absolute -top-4 -right-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply opacity-30 -z-10 will-change-transform"></div>
              <div className="hidden sm:block absolute -bottom-4 -left-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply opacity-30 -z-10 will-change-transform"></div>
            </div>
          </div>
        </div>

        {/* Optimized bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 will-change-transform">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 px-4">
              Why Choose Keys Fintech Financial Services?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Professional expertise and personalized service for all your
              financial needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            {[
              {
                icon: "🏠",
                title: "Doorstep Service",
                description:
                  "Convenient consultation at your preferred location",
              },
              {
                icon: "👨‍💼",
                title: "Expert Advisors",
                description: "Certified professionals with proven track record",
              },
              {
                icon: "🔒",
                title: "Trusted & Secure",
                description: "Your financial security is our commitment",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 sm:p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}