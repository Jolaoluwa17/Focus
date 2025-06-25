import { Header } from "@/components/header"
import { FaqContent } from "@/components/faq-content"
import { Footer } from "@/components/footer"

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <FaqContent />
      </main>
      <Footer />
    </div>
  )
}
