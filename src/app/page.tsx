import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProductMatrix from '@/components/ProductMatrix'
import Pricing from '@/components/Pricing'
import SocialProof from '@/components/SocialProof'
import Footer from '@/components/Footer'
import AnnouncementBanner from '@/components/AnnouncementBanner'
import { getSiteAnnouncements } from '@/lib/announcement'

export default async function HomePage() {
  const announcements = await getSiteAnnouncements()

  return (
    <>
      <Header />
      <AnnouncementBanner announcements={announcements} />
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
