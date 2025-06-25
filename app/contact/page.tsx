import { Header } from "@/components/header"
import { ContactContent } from "@/components/contact-content"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <ContactContent />
      </main>
      <Footer />
    </div>
  )
}
