"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Facebook, Twitter, Instagram } from "lucide-react";
import { CommentsSection } from "@/components/comments-section";
import { ProductSuggestions } from "@/components/product-suggestions";
import { Product, products } from "@/utils/product";

const getProduct = (id: string): Product | null => {
  return products.find((product) => product.id === id) || null;
};

interface ProductDetailProps {
  productId: string;
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const product = getProduct(productId);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link href="/catalog">
            <Button className="bg-slate-800 hover:bg-slate-700 text-white">
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-slate-700">
          Home
        </Link>
        <span>›</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600">SKU:{product.sku}</p>
          </div>

          <div className="text-3xl font-bold text-gray-900">
            £{product.price.toFixed(2)} GBP
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
            <div className="flex space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-sm ${getColorClass(color)} ${
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
          <div>
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
          <div>
            <span className="text-green-600 text-sm font-medium">
              ✓ In stock ({product.stock} units), ready to be shipped
            </span>
          </div>

          {/* Quantity */}
          <div>
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
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 text-lg">
              Add To Cart
            </Button>
            <Button variant="outline" className="w-full h-12 text-lg">
              Buy It Now
            </Button>
          </div>

          {/* Product Details */}
          <div className="space-y-4 pt-6 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Vendor:</span>
                <span className="ml-2">{product.vendor}</span>
              </div>
              <div>
                <span className="font-semibold">Type:</span>
                <span className="ml-2">{product.type}</span>
              </div>
            </div>
            <div className="text-sm">
              <span className="font-semibold">Tags:</span>
              <span className="ml-2">{product.tags.join(", ")}</span>
            </div>
          </div>

          {/* Social Share */}
          <div className="flex space-x-2 pt-4">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Facebook className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button
              size="sm"
              className="bg-blue-400 hover:bg-blue-500 text-white"
            >
              <Twitter className="h-4 w-4 mr-1" />
              Tweet
            </Button>
            <Button
              size="sm"
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              <Instagram className="h-4 w-4 mr-1" />
              Pin it
            </Button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <CommentsSection productId={product.id} />

      {/* Product Suggestions */}
      <ProductSuggestions currentProductId={product.id} />
    </div>
  );
}
