import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import SectionTitle from '../common/SectionTitle';
import ReviewCard from '../common/ReviewCard';
import Reveal from '../common/Reveal';
import { reviews } from '../../data/reviews';

export default function Reviews() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionTitle eyebrow="Guest reviews" title="Loved by guests from around the world" subtitle="Don’t just take our word for it – here’s what our guests say." />
        <Reveal>
          <Swiper
            modules={[Autoplay, Pagination, A11y]}
            spaceBetween={24}
            slidesPerView={1}
            loop
            autoplay={{ delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="!px-1 !pb-14 !pt-1"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="!h-auto">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </div>
    </section>
  );
}
