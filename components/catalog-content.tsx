"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Grid3X3,
  List,
  LayoutGrid,
  Filter,
  Eye,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuickViewModal } from "@/components/quick-view-modal";
import { Product, products } from "@/utils/product";

const colorTags = [
  { name: "Black", value: "black" },
  { name: "Brown", value: "brown" },
  { name: "Green", value: "green" },
  { name: "Grey", value: "grey" },
  { name: "Orange", value: "orange" },
  { name: "Pink", value: "pink" },
  { name: "Red", value: "red" },
  { name: "White", value: "white" },
  { name: "Yellow", value: "yellow" },
];

const sizeTags = ["L", "M", "S", "XL"];

export function CatalogContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "large">("grid");
  const [sortBy, setSortBy] = useState("alphabetically");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);

  const toggleColorFilter = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];

    setSelectedColors(newColors);
    applyFilters(newColors, selectedSizes);
  };

  const toggleSizeFilter = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];

    setSelectedSizes(newSizes);
    applyFilters(selectedColors, newSizes);
  };

  const applyFilters = (colors: string[], sizes: string[]) => {
    if (colors.length === 0 && sizes.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => {
        const colorMatch =
          colors.length === 0 ||
          colors.some((color) => product.colors.includes(color));
        const sizeMatch =
          sizes.length === 0 ||
          sizes.some((size) => product.sizes.includes(size.toUpperCase()));
        return colorMatch && sizeMatch;
      });
      setFilteredProducts(filtered);
    }
  };

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

  const clearAllFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setFilteredProducts(products);
  };

  const hasActiveFilters =
    selectedColors.length > 0 || selectedSizes.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-slate-700">
          Home
        </Link>
        <span>›</span>
        <span className="text-gray-900">Products</span>
      </nav>

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-12">Products</h1>

      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        {/* View Options & Product Count */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-8 w-8"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "large" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("large")}
              className="h-8 w-8"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-gray-600">
            {filteredProducts.length} products
          </span>
        </div>

        {/* Sort & Filter */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alphabetically">
                  Alphabetically, A-Z
                </SelectItem>
                <SelectItem value="price-low">Price, low to high</SelectItem>
                <SelectItem value="price-high">Price, high to low</SelectItem>
                <SelectItem value="newest">Date, new to old</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant={showFilters ? "default" : "outline"}
            className="flex items-center space-x-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            {showFilters ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            {hasActiveFilters && (
              <Badge className="ml-2 bg-slate-700 text-white text-xs">
                {selectedColors.length + selectedSizes.length}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Filter Tags - Collapsible */}
      {showFilters && (
        <div className="mb-8 space-y-6 p-6 bg-gray-50 rounded-lg border animate-slide-down">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Filters</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-slate-600 hover:text-slate-800"
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Colors */}
          <div>
            <h4 className="font-semibold text-base mb-3">Colors:</h4>
            <div className="flex flex-wrap gap-2">
              {colorTags.map((color) => (
                <Button
                  key={color.value}
                  variant={
                    selectedColors.includes(color.value) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => toggleColorFilter(color.value)}
                  className="h-8"
                >
                  {color.name}
                  {selectedColors.includes(color.value) && (
                    <span className="ml-2">✓</span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h4 className="font-semibold text-base mb-3">Sizes:</h4>
            <div className="flex flex-wrap gap-2">
              {sizeTags.map((size) => (
                <Button
                  key={size}
                  variant={
                    selectedSizes.includes(size.toLowerCase())
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => toggleSizeFilter(size.toLowerCase())}
                  className="h-8"
                >
                  {size}
                  {selectedSizes.includes(size.toLowerCase()) && (
                    <span className="ml-2">✓</span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-gray-700">
                  Active filters:
                </span>
                {selectedColors.map((color) => (
                  <Badge
                    key={color}
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-300"
                    onClick={() => toggleColorFilter(color)}
                  >
                    {colorTags.find((c) => c.value === color)?.name} ✕
                  </Badge>
                ))}
                {selectedSizes.map((size) => (
                  <Badge
                    key={size}
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-300"
                    onClick={() => toggleSizeFilter(size)}
                  >
                    {size.toUpperCase()} ✕
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Product Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : viewMode === "large"
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1"
        }`}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Product Image */}
            <Link href={`/products/${product.id}`} className="block">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.onSale && (
                    <Badge className="bg-slate-700 hover:bg-slate-600">
                      Sale
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge className="bg-emerald-600 hover:bg-emerald-700">
                      New
                    </Badge>
                  )}
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex flex-col gap-2">
                    <Button
                      className="bg-white text-black hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Add to cart logic here
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

            {/* Product Info */}
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-1">
                {product.category}
              </div>
              <Link href={`/products/${product.id}`} className="block">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-slate-700 cursor-pointer transition-colors">
                  {product.name}
                </h3>
              </Link>

              {/* Price */}
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

              {/* Colors */}
              <div className="flex items-center gap-2 mb-3">
                {product.colors.slice(0, 4).map((color, index) => (
                  <button
                    key={index}
                    className={`w-4 h-4 rounded-full ${getColorClass(
                      color
                    )} border border-gray-200`}
                    title={color}
                  />
                ))}
              </div>

              {/* Sizes */}
              <div className="flex items-center gap-1">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant="outline"
                    size="sm"
                    className="h-7 w-8 p-0 text-xs"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg" className="px-8">
          Load More Products
        </Button>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
