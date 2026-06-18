import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProductMatrix from '@/components/ProductMatrix'
import Pricing from '@/components/Pricing'
import SocialProof from '@/components/SocialProof'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="section-divider" />
        <ProductMatrix />
        <Pricing />
        <SocialProof />
      </main>
      <Footer />
    </>
  )
}
