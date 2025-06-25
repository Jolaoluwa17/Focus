"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, ShoppingCart } from "lucide-react";
import { QuickViewModal } from "@/components/quick-view-modal";
import { FeaturedProduct, featuredProducts } from "@/utils/featuredProducts";

export function FeaturedCollection() {
  const [quickViewProduct, setQuickViewProduct] =
    useState<FeaturedProduct | null>(null);
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

    const element = document.getElementById("featured-collection");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      black: "bg-black",
      white: "bg-white border border-gray-300",
      gray: "bg-gray-500",
      grey: "bg-gray-500",
      red: "bg-red-500",
      green: "bg-green-500",
      blue: "bg-blue-500",
      pink: "bg-pink-500",
      yellow: "bg-yellow-500",
      orange: "bg-orange-500",
      brown: "bg-amber-700",
    };
    return colorMap[color] || "bg-gray-400";
  };

  return (
    <section
      id="featured-collection"
      className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-6 sm:mb-8 lg:mb-10 xl:mb-12 px-4 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Featured Collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group relative bg-white rounded-lg overflow-hidden shadow-sm w-full max-w-sm mx-auto sm:max-w-none transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
                animationDelay: `${index * 200}ms`,
              }}
            >
              {/* Product Image */}
              <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Sale Badge */}
                  {product.onSale && (
                    <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black text-white text-xs sm:text-sm px-2 py-1">
                      Sale
                    </Badge>
                  )}

                  {/* Hover Actions - Hidden on mobile, shown on tablet+ */}
                  <div className="hidden sm:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 items-center justify-center">
                    <div className="flex flex-col gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Button
                        size="sm"
                        className="bg-white text-black hover:bg-gray-100 text-xs sm:text-sm px-3 sm:px-4"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Add To Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/90 hover:bg-white text-xs sm:text-sm px-3 sm:px-4"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setQuickViewProduct(product);
                        }}
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Quick View
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-3 sm:p-4 lg:p-5 bg-white">
                <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                  {product.category}
                </div>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 mb-2 sm:mb-3 line-clamp-2 hover:text-slate-700 cursor-pointer transition-colors duration-300 leading-tight min-h-[2.5rem] sm:min-h-[3rem]">
                    {product.name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
                  <span className="font-bold text-base sm:text-lg lg:text-xl text-gray-900">
                    £{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      £{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs sm:text-sm text-gray-600">GBP</span>
                </div>

                {/* Colors */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 flex-wrap">
                  {product.colors.slice(0, 5).map((color, colorIndex) => (
                    <button
                      key={colorIndex}
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${getColorClass(
                        color
                      )} transition-transform duration-200 ${
                        colorIndex === 0
                          ? "ring-1 sm:ring-2 ring-black ring-offset-1"
                          : ""
                      }`}
                      title={color}
                    />
                  ))}
                  {product.colors.length > 5 && (
                    <span className="text-xs text-gray-500 ml-1">
                      +{product.colors.length - 5}
                    </span>
                  )}
                </div>

                {/* Sizes */}
                <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4 flex-wrap">
                  {product.sizes.slice(0, 4).map((size, sizeIndex) => (
                    <Button
                      key={size}
                      variant="outline"
                      size="sm"
                      className={`h-6 w-7 sm:h-8 sm:w-10 p-0 text-xs border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 ${
                        sizeIndex === 0
                          ? "bg-black text-white border-black hover:bg-gray-800"
                          : ""
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
                  {product.sizes.length > 4 && (
                    <span className="text-xs text-gray-500 ml-1">
                      +{product.sizes.length - 4}
                    </span>
                  )}
                </div>

                {/* Mobile Action Buttons */}
                <div className="flex sm:hidden gap-2 pt-3 border-t border-gray-100">
                  <Button
                    size="sm"
                    className="flex-1 bg-black text-white hover:bg-gray-800 text-xs h-8 transition-all duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add to Cart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs h-8 transition-all duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Quick View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
