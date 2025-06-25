export interface Product {
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
  tags: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Women Two-piece Sportswear",
    category: "Sports",
    price: 150.0,
    originalPrice: 375.0,
    image: "/clothes/womenSports.jpg?height=400&width=300",
    images: [
      "/clothes/womenSports.jpg?height=400&width=300",
      "/clothes/womenSports1.jpg?height=400&width=300",
      "/clothes/womenSports2.jpg?height=400&width=300",
      "/clothes/womenSports3.jpg?height=400&width=300",
    ],
    colors: ["black", "white", "gray"],
    sizes: ["XL", "L", "M", "S"],
    onSale: true,
    sku: "DCS123456",
    stock: 15,
    vendor: "self",
    type: "dress",
    description:
      "Premium quality shapewear with drawstring closure for perfect fit.",
    tags: ["Black", "White", "Gray", "XL", "L", "M", "S"],
  },
  {
    id: "2",
    name: "Men Two-piece Sportswear",
    category: "Sports",
    price: 188.0,
    originalPrice: 225.0,
    image: "/clothes/menSports.jpg?height=400&width=300",
    images: [
      "/clothes/menSports.jpg?height=400&width=300",
      "/clothes/menSports1.jpg?height=400&width=300",
      "/clothes/menSports2.jpg?height=400&width=300",
      "/clothes/menSports3.jpg?height=400&width=300",
    ],
    colors: ["black", "white", "green", "red"],
    sizes: ["XL", "L", "M", "S"],
    onSale: false,
    sku: "FIT789012",
    stock: 8,
    vendor: "self",
    type: "cotton",
    description:
      "Versatile fitness wear suitable for all genders and activities.",
    tags: ["Black", "White", "Green", "Red", "XL", "L", "M", "S"],
  },
  {
    id: "3",
    name: "Men's Hoodie",
    category: "Cotton",
    price: 488.0,
    image: "/clothes/hoodie.jpg?height=400&width=300",
    images: [
      "/clothes/hoodie.jpg?height=400&width=300",
      "/clothes/hoodie1.jpg?height=400&width=300",
      "/clothes/hoodie2.jpg?height=400&width=300",
      "/clothes/hoodie3.jpg?height=400&width=300",
    ],
    colors: ["black", "white", "green", "red"],
    sizes: ["XL", "L", "M", "S"],
    onSale: false,
    sku: "789654123",
    stock: 20,
    vendor: "self",
    type: "cotton",
    description: "Comfortable and stylish jeggings perfect for everyday wear.",
    tags: ["Black", "Green", "L", "M", "Pink", "Red", "S", "Xl"],
  },
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
    tags: ["Black", "Green", "L", "M", "Pink", "Red", "S", "Xl"],
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
    tags: ["Black", "Green", "L", "M", "Pink", "Red", "S", "Xl"],
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
    onSale: false,
    sku: "FIT345678",
    stock: 15,
    vendor: "self",
    type: "cotton",
    description:
      "High-quality fitness shapewear suitable for all body types and activities.",
    tags: ["Black", "Green", "L", "M", "Pink", "Red", "S", "Xl"],
  },
];
