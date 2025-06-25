import { Header } from "@/components/header"
import { NewsContent } from "@/components/news-content"
import { Footer } from "@/components/footer"

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <NewsContent />
      </main>
      <Footer />
    </div>
  )
}
