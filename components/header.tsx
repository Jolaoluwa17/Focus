"use client"

import Link from "next/link"
import { Search, User, ShoppingCart, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { LoginModal } from "@/components/login-modal"
import { SignupModal } from "@/components/signup-modal"
import { useState, useEffect } from "react"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const navigationLinks = [
    { name: "HOME", href: "/" },
    { name: "CATALOG", href: "/catalog" },
    { name: "CONTACT", href: "/contact" },
    { name: "NEWS", href: "/news" },
    { name: "FAQ", href: "/faq" },
  ]

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white text-center py-2 text-sm animate-slide-down">
        <div className="animate-pulse">✨ Free shipping on orders over $75 | 30-day returns ✨</div>
      </div>
      <header
        className={`border-b bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "shadow-lg backdrop-blur-sm bg-white/95" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 animate-fade-in-left"
            >
              Focus
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 animate-fade-in-up delay-200">
              {navigationLinks.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-slate-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-700 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4 animate-fade-in-right">
              {/* Search - Hidden on small mobile, visible on larger screens */}
              <div className="hidden sm:flex relative items-center">
                <div
                  className={`flex items-center transition-all duration-500 ease-in-out ${
                    isSearchOpen ? "w-48 lg:w-64" : "w-10"
                  }`}
                >
                  {isSearchOpen && (
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pr-10 animate-slide-in-right border-2 focus:border-slate-500 transition-all duration-300"
                      autoFocus
                    />
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`hover:text-slate-700 transition-all duration-300 hover:scale-110 hover:rotate-12 ${
                      isSearchOpen ? "absolute right-0 z-10" : ""
                    }`}
                    onClick={() => {
                      if (isSearchOpen && searchQuery) {
                        console.log("Searching for:", searchQuery)
                      }
                      setIsSearchOpen(!isSearchOpen)
                      if (!isSearchOpen) {
                        setSearchQuery("")
                      }
                    }}
                  >
                    {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              {/* Mobile Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden hover:text-slate-700 hover:scale-110 transition-all duration-300"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* User Button */}
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-slate-700 hover:scale-110 hover:rotate-12 transition-all duration-300"
                onClick={() => setIsLoginOpen(true)}
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Cart Button */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:text-slate-700 hover:scale-110 transition-all duration-300 group"
                >
                  <ShoppingCart className="h-5 w-5 group-hover:animate-bounce" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-slate-700 animate-pulse">
                    2
                  </Badge>
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:text-slate-700 hover:scale-110 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="sm:hidden pb-4 animate-slide-down">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-2 focus:border-slate-500 transition-all duration-300"
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-slide-down">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navigationLinks.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-slate-700 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-gray-50 font-medium animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginOpen(false)
          setIsSignupOpen(true)
        }}
      />
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupOpen(false)
          setIsLoginOpen(true)
        }}
      />

      <style jsx>{`
        @keyframes slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in-left {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in-right {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        .animate-fade-in-left { animation: fade-in-left 0.8s ease-out; }
        .animate-fade-in-right { animation: fade-in-right 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.3s ease-out; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </>
  )
}
