import Hero from '../components/home/Hero';
import Welcome from '../components/home/Welcome';
import FeaturedRooms from '../components/home/FeaturedRooms';
import AmenitiesSection from '../components/home/AmenitiesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import GalleryPreview from '../components/home/GalleryPreview';
import Reviews from '../components/home/Reviews';
import Attractions from '../components/home/Attractions';
import OfferBanner from '../components/home/OfferBanner';
import CTASection from '../components/common/CTASection';
import usePageMeta from '../hooks/usePageMeta';

export default function Home() {
  usePageMeta(
    null,
    'StayInn Guesthouse in Gulberg, Lahore – cozy rooms, free breakfast, free Wi-Fi & parking, 24/7 reception. Your home away from home. Book direct for the best rates.'
  );
  return (
    <>
      <Hero />
      <Welcome />
      <FeaturedRooms />
      <AmenitiesSection />
      <WhyChooseUs />
      <GalleryPreview />
      <Reviews />
      <OfferBanner />
      <Attractions />
      <CTASection />
    </>
  );
}
