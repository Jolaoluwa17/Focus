import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { FeaturedCollection } from "@/components/featured-collection"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FlashSaleSection } from "@/components/flash-sale-section"
import { BlogSection } from "@/components/blog-section"
import { BrandLogos } from "@/components/brand-logos"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FeaturedCollection />
        <TestimonialsSection />
        <FlashSaleSection />
        <BlogSection />
        <BrandLogos />
      </main>
      <Footer />
    </div>
  )
}
