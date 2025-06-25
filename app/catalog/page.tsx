import { Header } from "@/components/header"
import { CatalogContent } from "@/components/catalog-content"
import { Footer } from "@/components/footer"

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <CatalogContent />
      </main>
      <Footer />
    </div>
  )
}
