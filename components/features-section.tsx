"use client"

import { Shield, Tag, Truck, Headphones } from "lucide-react"
import { useEffect, useState } from "react"

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("features-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: Shield,
      title: "100% SATISFACTION",
      description:
        "Premium quality products with expert craftsmanship. We guarantee your complete satisfaction with every purchase.",
    },
    {
      icon: Tag,
      title: "SAVE 20% WHEN YOU",
      description:
        "Exclusive discounts and special offers for our valued customers. Join our newsletter for the best deals.",
    },
    {
      icon: Truck,
      title: "FAST FREE SHIPMENT",
      description:
        "Complimentary express shipping on all orders over $75. Get your items delivered quickly and safely.",
    },
    {
      icon: Headphones,
      title: "24/7 FREE SUPPORT",
      description:
        "Round-the-clock customer service ready to help. Contact us anytime for assistance with your orders.",
    },
  ]

  return (
    <section id="features-section" className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-center px-4 sm:px-2 transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
                animationDelay: `${index * 200}ms`,
              }}
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 rounded-full bg-gradient-to-br from-slate-100 to-slate-200">
                  <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-800 stroke-1" />
                </div>
              </div>
              <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-3 sm:mb-4 text-gray-900 tracking-wide px-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-2 max-w-xs mx-auto lg:max-w-none">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
