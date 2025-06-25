"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "DISCOVER YOUR",
    highlight: "STYLE",
    subtitle: "Elevate your wardrobe with our curated collection of premium fashion pieces",
    primaryBtn: "SHOP NOW",
    secondaryBtn: "VIEW LOOKBOOK",
    background: "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900",
  },
  {
    id: 2,
    title: "UNLEASH YOUR",
    highlight: "CONFIDENCE",
    subtitle: "Bold designs that make a statement. Express yourself with our exclusive collection",
    primaryBtn: "EXPLORE",
    secondaryBtn: "NEW ARRIVALS",
    background: "bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900",
  },
  {
    id: 3,
    title: "EMBRACE THE",
    highlight: "FUTURE",
    subtitle: "Where fashion meets innovation. Step into tomorrow's trends today",
    primaryBtn: "DISCOVER",
    secondaryBtn: "TRENDING NOW",
    background: "bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentSlideData = slides[currentSlide]

  return (
    <section className="relative h-[700px] overflow-hidden">
      {/* Background with smooth transition */}
      <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${currentSlideData.background}`}>
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-ping delay-2000"></div>
          <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-white z-10">
        <div className="text-center max-w-5xl mx-auto px-4">
          {/* Badge with animation */}
          <div className="mb-8 animate-fade-in-up delay-200">
            <span className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30 animate-pulse">
              ✨ New Collection 2025 ✨
            </span>
          </div>

          {/* Main Title with fun typography and animations */}
          <div className="mb-8 animate-fade-in-up delay-400">
            <h1 className="text-6xl md:text-8xl font-black mb-4 leading-tight tracking-tight">
              <span
                className="block transform transition-all duration-700 ease-out"
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                  textShadow: "0 0 30px rgba(255,255,255,0.3)",
                  transform: isAnimating ? "translateY(-20px) scale(0.95)" : "translateY(0) scale(1)",
                  opacity: isAnimating ? 0.7 : 1,
                }}
              >
                {currentSlideData.title}
              </span>
              <span
                className="block bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x transform transition-all duration-700 ease-out delay-100"
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                  fontWeight: "900",
                  letterSpacing: "-0.02em",
                  textShadow: "0 0 50px rgba(255,165,0,0.5)",
                  transform: isAnimating ? "translateY(20px) scale(1.05)" : "translateY(0) scale(1)",
                  opacity: isAnimating ? 0.7 : 1,
                }}
              >
                {currentSlideData.highlight}
              </span>
            </h1>
          </div>

          {/* Subtitle with typewriter effect */}
          <div className="mb-10 animate-fade-in-up delay-600">
            <p
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed transform transition-all duration-500"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: "300",
                letterSpacing: "0.01em",
                opacity: isAnimating ? 0.5 : 1,
              }}
            >
              {currentSlideData.subtitle}
            </p>
          </div>

          {/* Action Buttons with hover animations */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-800">
            <Button
              size="lg"
              className="bg-white text-slate-800 hover:bg-gray-100 px-10 py-4 font-bold text-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-white/25"
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              {currentSlideData.primaryBtn}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-800 px-10 py-4 font-bold text-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-white/25"
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              {currentSlideData.secondaryBtn}
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
              index === currentSlide ? "bg-white shadow-lg shadow-white/50" : "bg-white/40 hover:bg-white/60"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  )
}
