"use client";

import Link from "next/link";
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export function Footer() {
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

    const element = document.getElementById("footer");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <footer id="footer" className="bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">About company</h2>
          <p className="text-gray-600 max-w-4xl mx-auto">
            Welcome to Hint your ultimate destination for all things fashion. We
            pride ourselves on being a leading fashion retailer, offering a wide
            range of trendy and high-quality clothing, accessories, and footwear
            for men, women, and children. we believe that fashion is an
            expression of individuality and style.
          </p>
          <div className="flex justify-center space-x-6 mt-6">
            {[
              { Icon: Twitter, hoverColor: "hover:text-[#1DA1F2]" }, // Twitter Blue
              { Icon: Facebook, hoverColor: "hover:text-[#1877F2]" }, // Facebook Blue
              { Icon: Instagram, hoverColor: "hover:text-[#E4405F]" }, // Instagram Pink
              { Icon: Youtube, hoverColor: "hover:text-[#FF0000]" }, // YouTube Red
            ].map(({ Icon, hoverColor }, index) => (
              <Icon
                key={index}
                className={`h-6 w-6 text-gray-600 cursor-pointer hover:scale-125 transition-all duration-300 transform ${hoverColor} ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {[
            {
              title: "NEWSLETTER",
              content: (
                <div>
                  <p className="text-gray-600 mb-4 text-sm">
                    Signup Our newsletter And get latest updates!
                  </p>
                  <div className="flex">
                    <Input
                      placeholder="Email"
                      className="rounded-r-none outline-none"
                    />
                    <Button className="rounded-l-none bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300">
                      SUBSCRIBE
                    </Button>
                  </div>
                </div>
              ),
            },
            {
              title: "PRODUCTS",
              content: (
                <ul className="space-y-2 text-sm">
                  {[
                    "All products",
                    "All collections",
                    "News",
                    "Women tops",
                  ].map((item, index) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-gray-600 hover:text-black hover:translate-x-2 transition-all duration-300 inline-block"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              title: "QUICK LINKS",
              content: (
                <ul className="space-y-2 text-sm">
                  {[
                    "Search",
                    "About us",
                    "FAQ",
                    "Privacy Policy",
                    "Terms & Condition",
                  ].map((item, index) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-gray-600 hover:text-black hover:translate-x-2 transition-all duration-300 inline-block"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              title: "CUSTOMER SUPPORT",
              content: (
                <div>
                  <p className="text-gray-600 mb-4 text-sm">
                    Available between 8AM to 8PM. Ready to answer your
                    questions.
                  </p>
                  <p className="text-sm mb-2 hover:scale-105 transition-transform duration-300">
                    📞 (+1) 525-2522225
                  </p>
                  <p className="text-sm hover:scale-105 transition-transform duration-300">
                    ✉️ info@yourstore.com
                  </p>
                </div>
              ),
            },
          ].map((section, index) => (
            <div
              key={section.title}
              className={`transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              {section.content}
            </div>
          ))}
        </div>

        <div
          className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2025, focus-fashion Powered by Jolaoluwa
          </p>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex space-x-2">
              {["VISA", "MC", "AE", "PP"].map((card, index) => (
                <div
                  key={card}
                  className={`w-8 h-5 rounded text-white text-xs flex items-center justify-center hover:scale-110 transition-transform duration-300 ${
                    card === "VISA"
                      ? "bg-blue-600"
                      : card === "MC"
                      ? "bg-red-600"
                      : card === "AE"
                      ? "bg-blue-500"
                      : "bg-blue-700"
                  }`}
                >
                  {card}
                </div>
              ))}
            </div>
            <select className="text-sm border rounded px-2 py-1 hover:scale-105 transition-transform duration-300">
              <option>United Kingdom (GBP £)</option>
            </select>
            <select className="text-sm border rounded px-2 py-1 hover:scale-105 transition-transform duration-300">
              <option>English</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
