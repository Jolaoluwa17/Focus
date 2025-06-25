"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function FlashSaleSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 106,
    hours: 9,
    minutes: 0,
    seconds: 43,
  });
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

    const element = document.getElementById("flash-sale-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="flash-sale-section"
      className="hidden sm:flex relative h-[500px] w-full items-center justify-center text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      <div
        className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-[3000ms]"
        style={{
          backgroundImage: "url('/countDown.jpg?height=500&width=1200')",
        }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-white/30 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-white/15 rounded-full animate-ping delay-500"></div>
      </div>

      <div
        className={`relative z-10 w-full max-w-xl text-center bg-black/80 p-12 rounded-2xl backdrop-blur-sm border border-white/20 transform transition-all duration-1000 hover:scale-105 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-4xl font-bold mb-4 animate-pulse">Flash Sale</h2>
        <p className="text-xl mb-8 animate-fade-in-up delay-200">
          Hurry! Offers End Soon.
        </p>

        <div className="flex justify-center space-x-4 mb-8">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Mins" },
            { value: timeLeft.seconds, label: "Sec" },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`text-center transform transition-all duration-500 hover:scale-110 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100 + 400}ms` }}
            >
              <div className="text-3xl font-bold text-purple-400 bg-white/10 rounded-lg p-3 mb-2 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                {item.value}
              </div>
              <div className="text-sm">{item.label}</div>
            </div>
          ))}
        </div>

        <Button
          size="lg"
          variant="outline"
          className="bg-transparent border-white text-white hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-white/25 animate-fade-in-up delay-800"
        >
          Shop Flash Sale
        </Button>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>
    </section>
  );
}
