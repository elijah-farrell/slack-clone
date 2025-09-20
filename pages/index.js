import Head from 'next/head'
import { CyberNavbar } from '~/components/CyberNavbar'
import { Hero3D } from '~/components/Hero3D'
import { FeaturesSection } from '~/components/FeaturesSection'
import { TechnologySection } from '~/components/TechnologySection'
import { FAQSection } from '~/components/FAQSection'
import { CTASection } from '~/components/CTASection'
import { Footer } from '~/components/Footer'

const Home = () => {
  return (
    <>
      <Head>
        <title>SparkChat</title>
      </Head>
      <main className="min-h-screen bg-black">
        <CyberNavbar />
      <Hero3D />
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="technology">
        <TechnologySection />
      </section>
      <section id="faq">
        <FAQSection />
      </section>
      <CTASection />
        <Footer />
      </main>
    </>
  )
}

export default Home
