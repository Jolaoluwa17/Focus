export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  image: string
  categories: string[]
  author: string
  date: string
  comments: number
  slug: string
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Nunc In Ipsum Vel Nisl Laoreet",
    excerpt:
      "Vivamus pellentesque luctus urna, non consectetur est tincidunt vitae. Aliquam in facilisis neque. Morbi mollis mauris sem, ut porta justo posuere ut. Pellentesque malesuada faucibus lacus nec tincidunt. Vestibulum ornare nunc a ex ullamcorper elementum. Nunc in ipsum vel nisl...",
    image: "/blog/blog.jpg?height=400&width=600",
    categories: ["BLOG", "HINT", "KIDS", "WOMEN"],
    author: "Hint Websolution",
    date: "June 7, 2023",
    comments: 0,
    slug: "nunc-in-ipsum-vel-nisl-laoreet",
  },
  {
    id: "2",
    title: "Maecenas Bibendum Elementum Ante",
    excerpt:
      "Ut vitae nisl neque. Proin quis leo iaculis, placerat lectus a, aliquet ante. Pellentesque eget tincidunt dui. Sed ultrices quam erat, in iaculis velit aliquam id. Cras egestas ipsum id tellus pretium scelerisque. Cras ultrices mauris vitae pharetra facilisis. Maecenas...",
    image: "/blog/blog1.jpg?height=400&width=600",
    categories: ["BLOG", "FASHION", "HINT", "KIDS", "WOMEN"],
    author: "Hint Websolution",
    date: "June 7, 2023",
    comments: 0,
    slug: "maecenas-bibendum-elementum-ante",
  },
  {
    id: "3",
    title: "Viverra Ex Magna A Augue",
    excerpt:
      "Etiam hendrerit turpis et magna faucibus bibendum. Integer imperdiet risus vitae est rutrum pretium. Cras convallis nibh ut lorem tempor, vel cursus nulla dignissim. Mauris facilisis magna vel nunc tempor...",
    image: "/blog/blog2.jpg?height=400&width=600",
    categories: ["BLOG", "HINT", "WOMEN"],
    author: "Hint Websolution",
    date: "June 5, 2023",
    comments: 2,
    slug: "viverra-ex-magna-a-augue",
  },
  {
    id: "4",
    title: "Fashion Trends for Summer 2024",
    excerpt:
      "Discover the hottest fashion trends that will dominate this summer. From vibrant colors to sustainable fabrics, explore what's trending in the fashion world and how to incorporate these styles into your wardrobe...",
    image: "/blog/blog4.jpg?height=400&width=600",
    categories: ["FASHION", "BLOG", "WOMEN"],
    author: "Hint Websolution",
    date: "June 3, 2023",
    comments: 5,
    slug: "fashion-trends-summer-2024",
  },
]