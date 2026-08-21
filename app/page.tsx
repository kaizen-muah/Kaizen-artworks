import PageLoader from '@/components/layout/PageLoader';
import Navbar from '@/components/layout/Navbar';
import VerticalPictureRoll from '@/components/layout/VerticalPictureRoll';
import Hero from '@/components/sections/Hero';
import Gallery from '@/components/sections/Gallery';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <PageLoader />
      <Navbar />
      <VerticalPictureRoll />
      
      <main className="relative z-10 bg-[#0A0A0A] overflow-hidden">
        <Hero />
        <Gallery />
        <Process />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
