"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("testimonials-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Orlando Bloom",
      role: "Manager, abc company",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4,
      text: "Etiam mattis posuere sem, a bibendum nulla congue nec. Donec eget metus nisl. Suspendisse potenti. Pellentesque sed sem sodales, malesuada sapien ut, rutrum sem.",
    },
    {
      name: "John Doe",
      role: "CEO, xyz Company",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4,
      text: "Etiam mattis posuere sem, a bibendum nulla congue nec. Donec eget metus nisl. Suspendisse potenti. Pellentesque sed sem sodales, malesuada sapien ut, rutrum sem.",
    },
    {
      name: "Camp Shiv",
      role: "Head, ccc Company",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4,
      text: "Etiam mattis posuere sem, a bibendum nulla congue nec. Donec eget metus nisl. Suspendisse potenti. Pellentesque sed sem sodales, malesuada sapien ut, rutrum sem.",
    },
  ];

  return (
    <section id="testimonials-section" className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-6 sm:mb-8 lg:mb-10 xl:mb-12 px-4 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Testimonials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`text-center group cursor-pointer transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 300}ms`,
                animationDelay: `${index * 300}ms`,
              }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 transition-all duration-300 hover:scale-125 ${
                        i < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <h3 className="font-bold text-lg mb-4 group-hover:text-slate-700 transition-colors duration-300">
                  100% Recommended
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {testimonial.text}
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <Avatar className="hover:scale-110 transition-transform duration-300">
                    <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-semibold text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
