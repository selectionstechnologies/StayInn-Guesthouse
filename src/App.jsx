import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Layout from './components/layout/Layout';
import PageLoader from './components/common/PageLoader';

const Home = lazy(() => import('./pages/Home'));
const Rooms = lazy(() => import('./pages/Rooms'));
const RoomDetail = lazy(() => import('./pages/RoomDetail'));
const Booking = lazy(() => import('./pages/Booking'));
const Amenities = lazy(() => import('./pages/Amenities'));
const Gallery = lazy(() => import('./pages/Gallery'));
const About = lazy(() => import('./pages/About'));
const Offers = lazy(() => import('./pages/Offers'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Policies = lazy(() => import('./pages/Policies'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="rooms/:slug" element={<RoomDetail />} />
            <Route path="booking" element={<Booking />} />
            <Route path="amenities" element={<Amenities />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="about" element={<About />} />
            <Route path="offers" element={<Offers />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="policies" element={<Policies />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </MotionConfig>
  );
}
