"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Search,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FaqItem[] = [
  {
    id: "1",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on all items. Items must be in original condition with tags attached. To initiate a return, please contact our customer service team or visit your account dashboard.",
    category: "Returns & Exchanges",
  },
  {
    id: "2",
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3-7 business days. Express shipping (1-3 business days) is available for an additional fee. Free shipping is available on orders over $75.",
    category: "Shipping",
  },
  {
    id: "3",
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by destination. Please check our shipping calculator at checkout for specific rates.",
    category: "Shipping",
  },
  {
    id: "4",
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'My Orders' section.",
    category: "Orders",
  },
  {
    id: "5",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and Buy Now Pay Later options through Klarna and Afterpay.",
    category: "Payment",
  },
  {
    id: "6",
    question: "How do I know what size to order?",
    answer:
      "Each product page includes a detailed size chart. We recommend measuring yourself and comparing to our size guide. If you're between sizes, we generally recommend sizing up for a more comfortable fit.",
    category: "Sizing",
  },
  {
    id: "7",
    question: "Can I exchange an item for a different size?",
    answer:
      "Yes! We offer free exchanges within 30 days of purchase. Simply initiate a return and place a new order for your preferred size, or contact customer service for assistance.",
    category: "Returns & Exchanges",
  },
  {
    id: "8",
    question: "Do you offer student discounts?",
    answer:
      "Yes, we offer a 10% student discount. Verify your student status through our partner UNiDAYS to receive your discount code.",
    category: "Discounts",
  },
  {
    id: "9",
    question: "How can I contact customer service?",
    answer:
      "You can reach us via email at support@focus.com, phone at (+1) 525-2522225 (8AM-8PM), or through our live chat feature. We typically respond to emails within 24 hours.",
    category: "Support",
  },
  {
    id: "10",
    question: "Are your products ethically made?",
    answer:
      "Yes, we're committed to ethical manufacturing. We work with certified suppliers who meet our standards for fair labor practices and environmental responsibility.",
    category: "About Products",
  },
  {
    id: "11",
    question: "How do I care for my items?",
    answer:
      "Care instructions are included on the product label and product page. Generally, we recommend washing in cold water and air drying to maintain quality and color.",
    category: "About Products",
  },
  {
    id: "12",
    question: "Can I cancel my order?",
    answer:
      "Orders can be cancelled within 1 hour of placement. After that, orders enter our fulfillment process and cannot be cancelled. Please contact us immediately if you need to make changes.",
    category: "Orders",
  },
  {
    id: "13",
    question: "Do you have a loyalty program?",
    answer:
      "Yes! Our Focus Rewards program offers points for every purchase, exclusive discounts, early access to sales, and special birthday offers. Sign up is free and automatic with your first purchase.",
    category: "Rewards",
  },
  {
    id: "14",
    question: "What if an item arrives damaged?",
    answer:
      "We're sorry if your item arrived damaged! Please contact us within 48 hours with photos of the damage. We'll arrange for a replacement or full refund at no cost to you.",
    category: "Returns & Exchanges",
  },
  {
    id: "15",
    question: "How often do you restock items?",
    answer:
      "Restocking varies by item popularity and seasonality. You can sign up for restock notifications on product pages. Popular items typically restock every 2-4 weeks.",
    category: "Inventory",
  },
];

const categories = [
  "All",
  "Orders",
  "Shipping",
  "Returns & Exchanges",
  "Payment",
  "Sizing",
  "Support",
  "About Products",
  "Discounts",
  "Rewards",
  "Inventory",
];

export function FaqContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<FaqItem[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle search suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const suggestions = faqData
        .filter((faq) => {
          const matchesSearch =
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.category.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesSearch;
        })
        .slice(0, 5); // Limit to 5 suggestions

      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
      setSelectedSuggestionIndex(-1);
    } else {
      setShowSuggestions(false);
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  // Handle click outside to close suggestions and window events
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    const handleScroll = () => {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    };

    const handleResize = () => {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || searchSuggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < searchSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(searchSuggestions[selectedSuggestionIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion: FaqItem) => {
    setSearchQuery(suggestion.question);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);

    // Open the selected FAQ item
    if (!openItems.includes(suggestion.id)) {
      setOpenItems((prev) => [...prev, suggestion.id]);
    }

    // Scroll to the FAQ item after a short delay
    setTimeout(() => {
      const element = document.getElementById(`faq-${suggestion.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-gray-900 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-slate-700">
            Home
          </Link>
          <span>›</span>
          <span className="text-gray-900">FAQ</span>
        </nav>

        {/* Header Section */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to common questions about orders, shipping, returns,
            and more. Can't find what you're looking for? Contact our support
            team.
          </p>

          {/* Search Bar with Suggestions */}
          <div className="max-w-2xl mx-auto relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (searchQuery.trim() && searchSuggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                className="pl-12 pr-4 py-4 text-lg border-2 focus:border-slate-500 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Search Suggestions Dropdown - Portal-style positioning */}
        {showSuggestions && searchSuggestions.length > 0 && (
          <div
            className="fixed bg-white border border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto"
            style={{
              zIndex: 99999,
              left: searchRef.current
                ? `${searchRef.current.getBoundingClientRect().left}px`
                : "50%",
              top: searchRef.current
                ? `${searchRef.current.getBoundingClientRect().bottom + 8}px`
                : "50%",
              width: searchRef.current
                ? `${searchRef.current.getBoundingClientRect().width}px`
                : "640px",
              maxWidth: "640px",
            }}
          >
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 border-b border-gray-100">
                {searchSuggestions.length} suggestion
                {searchSuggestions.length !== 1 ? "s" : ""} found
              </div>
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 hover:bg-gray-50 ${
                    selectedSuggestionIndex === index ? "bg-slate-100" : ""
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                        {highlightText(suggestion.question, searchQuery)}
                      </div>
                      <div className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {highlightText(
                          suggestion.answer.substring(0, 100) + "...",
                          searchQuery
                        )}
                      </div>
                      <span className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {suggestion.category}
                      </span>
                    </div>
                    <Search className="h-4 w-4 text-gray-400 ml-2 mt-1 shrink-0" />
                  </div>
                </button>
              ))}
            </div>

            {searchQuery.trim() && (
              <div className="border-t border-gray-100 p-3 bg-gray-50">
                <div className="text-xs text-gray-600 text-center">
                  Press{" "}
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">
                    ↑
                  </kbd>{" "}
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">
                    ↓
                  </kbd>{" "}
                  to navigate,{" "}
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">
                    Enter
                  </kbd>{" "}
                  to select,{" "}
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">
                    Esc
                  </kbd>{" "}
                  to close
                </div>
              </div>
            )}
          </div>
        )}

        {/* No Results Message - Portal-style positioning */}
        {showSuggestions &&
          searchQuery.trim() &&
          searchSuggestions.length === 0 && (
            <div
              className="fixed bg-white border border-gray-200 rounded-xl shadow-2xl"
              style={{
                zIndex: 99999,
                left: searchRef.current
                  ? `${searchRef.current.getBoundingClientRect().left}px`
                  : "50%",
                top: searchRef.current
                  ? `${searchRef.current.getBoundingClientRect().bottom + 8}px`
                  : "50%",
                width: searchRef.current
                  ? `${searchRef.current.getBoundingClientRect().width}px`
                  : "640px",
                maxWidth: "640px",
              }}
            >
              <div className="p-6 text-center">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 text-sm">
                  Try different keywords or browse our categories below.
                </p>
              </div>
            </div>
          )}

        {/* Quick Contact Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transform transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <MessageCircle className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get instant help from our support team
              </p>
              <Button className="bg-slate-800 hover:bg-slate-700">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <Phone className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-4">
                Speak directly with our team
              </p>
              <Button
                variant="outline"
                className="border-slate-300 hover:bg-slate-50"
              >
                (+1) 525-2522225
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <Mail className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Send us a detailed message
              </p>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-slate-300 hover:bg-slate-50"
                >
                  Contact Form
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div
          className={`mb-8 transform transition-all duration-1000 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Filter by Category:</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="hover:scale-105 transition-transform duration-200"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div
          className={`space-y-4 mb-12 transform transition-all duration-1000 delay-600 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No results found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or category filter.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <Card
                key={faq.id}
                id={`faq-${faq.id}`}
                className="hover:shadow-md transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-slate-700">
                        {searchQuery
                          ? highlightText(faq.question, searchQuery)
                          : faq.question}
                      </h3>
                    </div>
                    <div className="ml-4">
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 transform transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 transform transition-transform duration-200" />
                      )}
                    </div>
                  </button>

                  {openItems.includes(faq.id) && (
                    <div className="px-6 pb-6 animate-fade-in-up">
                      <div className="border-t pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {searchQuery
                            ? highlightText(faq.answer, searchQuery)
                            : faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Still Need Help Section */}
        <div
          className={`bg-slate-50 rounded-2xl p-8 text-center transform transition-all duration-1000 delay-800 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still need help?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our customer support team is here to help you with any questions or
            concerns. We're available 8AM-8PM, ready to provide personalized
            assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-slate-800 hover:bg-slate-700 hover:scale-105 transition-all duration-300"
              >
                Contact Support
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-300 hover:bg-slate-100 hover:scale-105 transition-all duration-300"
            >
              Live Chat
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
