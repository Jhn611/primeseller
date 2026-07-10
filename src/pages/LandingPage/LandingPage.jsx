import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import AiTable from '../../components/sections/AiTable';
import Features from '../../components/sections/Features';
import Hero from '../../components/sections/Hero';
import Pricing from '../../components/sections/Pricing';
import Testimonials from '../../components/sections/Testimonials';
import VideoReview from '../../components/sections/VideoReview';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pricing />
        <VideoReview />
        <Testimonials />
        <Features />
        <AiTable />
      </main>
      <Footer />
    </>
  );
}
