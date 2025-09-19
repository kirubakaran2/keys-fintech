import HeroSection from '@/components/hero-section';
import ServicesSection from '@/components/services-section';
import ProductsSection from '@/components/products-section';
import TestimonialsSection from '@/components/testimonials-section';
import CTASection from '@/components/cta-section';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}