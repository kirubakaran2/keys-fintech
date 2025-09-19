"use client"

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Business Owner",
    content: "Keys Fintech Info transformed how I plan for my family's future. Their expert guidance on life insurance and investment options has given me peace of mind and financial security.",
    avatar: "https://img.freepik.com/free-photo/painting-woman-s-portrait_23-2151155326.jpg"
  },
  {
    id: 2,
    name: "Rahul Gupta",
    role: "Software Engineer",
    content: "As a tech professional, I wanted an investment strategy that balanced growth with security. Keys Fintech Info created a personalized plan that perfectly aligns with my long-term goals.",
    avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    name: "Anjali Patel",
    role: "Healthcare Professional",
    content: "The team at Keys Fintech Info helped me navigate the complex world of health insurance policies. Their attention to detail ensured I got coverage that truly meets my family's needs.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Retired Government Employee",
    content: "After retirement, I needed to ensure my savings would last. Keys Fintech Info restructured my portfolio for stable income while preserving capital. Their advice has been invaluable.",
    avatar: "https://img.freepik.com/free-photo/full-shot-old-man-sitting-bench_23-2150493050.jpg"
  }
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  }, [current]);

  const nextSlide = useCallback(() => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  }, [current]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent"
          >
            Client Testimonials
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Don't just take our word for it. Hear what our clients have to say about our services.
          </motion.p>
        </div>

        <div 
          className="relative max-w-4xl mx-auto overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative h-[480px] md:h-[320px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                  index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: index === current ? 1 : 0,
                  y: index === current ? 0 : 20
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-10 flex flex-col md:flex-row items-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover border-4 border-emerald-100 dark:border-emerald-900"
                    />
                    <div className="absolute -top-2 -left-2 bg-emerald-500 text-white p-2 rounded-full">
                      <Quote size={16} />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-emerald-600 dark:text-emerald-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 p-2 rounded-full shadow-md hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 p-2 rounded-full shadow-md hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === current
                    ? 'bg-emerald-600 dark:bg-emerald-400 w-8'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-emerald-300 dark:hover:bg-emerald-700'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}