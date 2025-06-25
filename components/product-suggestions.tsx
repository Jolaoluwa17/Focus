"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, ShoppingCart } from "lucide-react";
import { QuickViewModal } from "@/components/quick-view-modal";
import { Product, products } from "@/utils/product";

interface ProductSuggestionsProps {
  currentProductId: string;
}

export function ProductSuggestions({
  currentProductId,
}: ProductSuggestionsProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );

  const suggested = products
    .filter((product) => product.id !== currentProductId)
    .slice(0, 3); // you can also use a random sort or shuffle here

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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          You May Also Like
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {suggested.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.onSale && (
                    <Badge className="absolute top-3 left-3 bg-black hover:bg-gray-800 text-white">
                      Sale
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex flex-col gap-2">
                      <Button
                        className="bg-white text-black hover:bg-gray-100"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // Add to cart logic
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add To Cart
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setQuickViewProduct(product);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Quick View
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="p-4">
                <div className="text-sm text-gray-500 mb-1">
                  {product.category}
                </div>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-slate-700 cursor-pointer transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-lg">
                    £{product.price.toFixed(2)} GBP
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      £{product.originalPrice.toFixed(2)} GBP
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`w-4 h-4 rounded-full ${getColorClass(
                        color
                      )} border border-gray-200`}
                      title={color}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {product.sizes.map((size, index) => (
                    <Button
                      key={size}
                      variant="outline"
                      size="sm"
                      className={`h-7 w-8 p-0 text-xs border-gray-300 text-gray-700 hover:bg-gray-50 ${
                        index === 0
                          ? "bg-black text-white hover:bg-gray-800 border-black"
                          : ""
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
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
