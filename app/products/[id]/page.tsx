import { Header } from "@/components/header"
import { ProductDetail } from "@/components/product-detail"
import { Footer } from "@/components/footer"

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <ProductDetail productId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
