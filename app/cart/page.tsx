import { Header } from "@/components/header"
import { CartContent } from "@/components/cart-content"
import { Footer } from "@/components/footer"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <CartContent />
      </main>
      <Footer />
    </div>
  )
}
