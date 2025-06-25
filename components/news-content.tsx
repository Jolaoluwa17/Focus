import Link from "next/link"
import Image from "next/image"
import { Calendar, User, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface NewsArticle {
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

const newsArticles: NewsArticle[] = [
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

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    BLOG: "bg-purple-100 text-purple-700",
    HINT: "bg-blue-100 text-blue-700",
    KIDS: "bg-green-100 text-green-700",
    WOMEN: "bg-pink-100 text-pink-700",
    FASHION: "bg-orange-100 text-orange-700",
  }
  return colors[category] || "bg-gray-100 text-gray-700"
}

export function NewsContent() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-slate-700">
          Home
        </Link>
        <span>›</span>
        <span className="text-gray-900">News</span>
      </nav>

      {/* Page Title */}
      <h1 className="text-5xl font-bold text-center text-gray-900 mb-16">News</h1>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {newsArticles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Article Image */}
            <Link href={`/news/${article.slug}`}>
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Article Content */}
            <div className="p-6">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {article.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className={`text-xs font-medium px-2 py-1 ${getCategoryColor(category)}`}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <Link href={`/news/${article.slug}`}>
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-slate-700 cursor-pointer transition-colors">
                  {article.title}
                </h2>
              </Link>

              {/* Excerpt */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>

              {/* Meta Information */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{article.comments}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center">
        <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium">
          Load More Articles
        </button>
      </div>
    </div>
  )
}
