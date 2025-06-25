export interface FeaturedProduct {
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

export const featuredProducts: FeaturedProduct[] = [
  {
    id: "8",
    name: "Printed Unisex Shirt",
    category: "Cotton",
    price: 188.0,
    originalPrice: 225.0,
    image: "/clothes/shirt.jpg?height=500&width=350",
    images: [
      "/clothes/shirt.jpg?height=500&width=350",
      "/clothes/shirt1.jpg?height=500&width=350",
      "/clothes/shirt2.jpg?height=500&width=350",
      "/clothes/shirt3.jpg?height=500&width=350",
    ],
    colors: ["black", "pink", "green", "red"],
    sizes: ["XL", "L", "M", "S"],
    onSale: true,
    sku: "PWJ123456",
    stock: 12,
    vendor: "self",
    type: "cotton",
    description:
      "Stylish printed jump suits perfect for casual and semi-formal occasions.",
  },
  {
    id: "9",
    name: "Men's Office Shirt",
    category: "Fabric",
    price: 188.0,
    originalPrice: 225.0,
    image: "/clothes/officeShirt.jpg?height=500&width=350",
    images: [
      "/clothes/officeShirt.jpg?height=500&width=350",
      "/clothes/officeShirt2.jpg?height=500&width=350",
      "/clothes/officeShirt3.jpg?height=500&width=350",
      "/clothes/officeShirt4.jpg?height=500&width=350",
    ],
    colors: ["black", "pink", "green", "red", "yellow", "blue"],
    sizes: ["XL", "L", "M", "S"],
    onSale: true,
    sku: "WCD789012",
    stock: 8,
    vendor: "self",
    type: "fabric",
    description: "Trendy co-ord sets available in multiple vibrant colors.",
  },
  {
    id: "10",
    name: "Women Orange Jumpsuit",
    category: "Cotton",
    price: 188.0,
    originalPrice: 225.0,
    image: "/clothes/orange.jpg?height=500&width=350",
    images: [
      "/clothes/orange.jpg?height=500&width=350",
      "/clothes/orange1.jpg?height=500&width=350",
      "/clothes/orange2.jpg?height=500&width=350",
      "/clothes/orange3.jpg?height=500&width=350",
    ],
    colors: ["black", "pink", "green", "red"],
    sizes: ["XL", "L", "M", "S"],
    onSale: true,
    sku: "FIT345678",
    stock: 15,
    vendor: "self",
    type: "cotton",
    description:
      "High-quality fitness shapewear suitable for all body types and activities.",
  },
];
