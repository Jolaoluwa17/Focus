"use client";

import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { useEffect, useState } from "react";
import { posts } from "@/utils/posts";

export function BlogSection() {
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

    const element = document.getElementById("blog-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="blog-section" className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl font-bold text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Latest Post
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
                animationDelay: `${index * 200}ms`,
              }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3 group-hover:text-gray-600 transition-colors duration-300">
                  <Calendar className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                  <span className="mr-4">{post.date}</span>
                  <User className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                  <span>{post.author}</span>
                </div>
                <h3 className="font-bold text-lg mb-3 group-hover:text-slate-700 transition-colors duration-300 group-hover:scale-105 transform">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
