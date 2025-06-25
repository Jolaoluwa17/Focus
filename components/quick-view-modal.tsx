"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  colors: string[];
  sizes: string[];
  onSale: boolean;
  isNew?: boolean;
  sku: string;
  stock: number;
  vendor: string;
  type: string;
  description: string;
}

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      black: "bg-black",
      white: "bg-white border-2 border-gray-300",
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

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] p-0 overflow-hidden">
        {/* Mobile Layout */}
        <div className="flex flex-col lg:hidden h-full max-h-[95vh]">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b bg-white shrink-0">
            <DialogTitle>
              <VisuallyHidden>Quick View: {product?.name}</VisuallyHidden>
            </DialogTitle>
            <h2 className="text-base sm:text-lg font-semibold truncate pr-4 flex-1">
              {product.name}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0 h-8 w-8 sm:h-10 sm:w-10"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Mobile Image Section */}
          <div className="relative bg-gray-100 aspect-square shrink-0">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 sm:h-10 sm:w-10"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 sm:h-10 sm:w-10"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </>
            )}

            {/* Mobile Thumbnail Dots */}
            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                      selectedImage === index ? "bg-white" : "bg-white/50"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Mobile Product Details - Scrollable */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0">
            <div className="text-xs sm:text-sm text-gray-500">
              {product.vendor}
            </div>

            <div className="text-lg sm:text-xl font-bold text-gray-900">
              £{product.price.toFixed(2)} GBP
            </div>

            <p className="text-xs sm:text-sm text-gray-600">
              SKU: {product.sku}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">
                Color
              </h3>
              <div className="flex space-x-2 flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-sm ${getColorClass(
                      color
                    )} ${
                      selectedColor === color
                        ? "ring-2 ring-slate-700 ring-offset-1 sm:ring-offset-2"
                        : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">
                Size
              </h3>
              <div className="flex space-x-2 flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    className="w-10 h-7 sm:w-12 sm:h-8 text-xs sm:text-sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div className="text-green-600 text-xs sm:text-sm font-medium">
              ✓ In stock ({product.stock} units), ready to be shipped
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">
                Quantity
              </h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 sm:h-10 sm:w-10"
                >
                  <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <span className="w-8 text-center font-medium text-sm sm:text-base">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 sm:h-10 sm:w-10"
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 pb-4">
              <Button className="w-full bg-black hover:bg-gray-800 text-white h-10 sm:h-12 text-sm sm:text-base">
                Add To Cart →
              </Button>
              <Button
                variant="outline"
                className="w-full h-10 sm:h-12 text-sm sm:text-base"
              >
                Buy It Now
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex h-full max-h-[90vh]">
          {/* Left side - Images */}
          <div className="flex-1 relative bg-gray-100 min-h-0">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Main Image */}
            <div className="relative h-full">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-slate-700"
                        : "border-white"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt=""
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Product Details */}
          <div className="w-96 xl:w-[28rem] p-6 bg-white overflow-y-auto">
            <div className="mb-4">
              <span className="text-sm text-gray-500">{product.vendor}</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-gray-600 mb-4">SKU: {product.sku}</p>

            <div className="text-2xl font-bold text-gray-900 mb-6">
              £{product.price.toFixed(2)} GBP
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-sm ${getColorClass(color)} ${
                      selectedColor === color
                        ? "ring-2 ring-slate-700 ring-offset-2"
                        : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    className="w-12 h-10"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <span className="text-green-600 text-sm font-medium">
                ✓ In stock ({product.stock} units), ready to be shipped
              </span>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-black hover:bg-gray-800 text-white h-12">
                Add To Cart →
              </Button>
              <Button variant="outline" className="w-full h-12">
                Buy It Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
