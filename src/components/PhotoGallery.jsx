import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const PHOTO_COUNT = 10;

const photos = Array.from({ length: PHOTO_COUNT }, (_, i) => ({
  id: i + 1,
  src: `/photos/photo-${i + 1}.jpg`,
  alt: `Ảnh cô Uyên ${i + 1}`,
}));

export default function PhotoGallery() {
  return (
    <section
      id="gallery"
      className="py-16 md:py-24 px-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF5F7 0%, #FFFBF0 50%, #FFF0F3 100%)',
      }}
    >
      {/* Section heading */}
      <div className="text-center mb-8 md:mb-12">
        <span className="text-4xl mb-2 inline-block animate-wiggle">📸</span>
        <h2
          className="font-display text-3xl sm:text-4xl md:text-5xl mb-3"
          style={{ color: '#FF85A2' }}
        >
          Khoảnh Khắc Đáng Nhớ
        </h2>
        <p className="text-base md:text-lg max-w-md mx-auto" style={{ color: '#8B7355' }}>
          Những kỷ niệm đẹp cùng cô Uyên 💕
        </p>
      </div>

      {/* Swiper Gallery */}
      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView="auto"
          spaceBetween={30}
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 200,
            modifier: 1.5,
            slideShadows: false,
          }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          className="photo-swiper"
        >
          {photos.map((photo) => (
            <SwiperSlide key={photo.id} className="w-[300px]! md:w-[380px]!">
              <div
                className="relative rounded-2xl overflow-hidden shadow-xl mx-auto"
                style={{
                  aspectRatio: '3 / 4',
                  background: 'linear-gradient(135deg, #FFC8DD 0%, #FFE29A 50%, #FFB3C6 100%)',
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.querySelector('.placeholder')?.classList.remove('hidden');
                  }}
                />
                {/* Placeholder when image not found */}
                <div className="placeholder absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-6xl mb-4">📷</span>
                  <p className="font-bold text-lg" style={{ color: '#4A3728' }}>
                    Ảnh {photo.id}
                  </p>
                  <p className="text-sm mt-1" style={{ color: '#8B7355' }}>
                    Thêm ảnh vào<br />
                    <code className="text-xs bg-white/50 px-2 py-0.5 rounded mt-1 inline-block">
                      public/photos/photo-{photo.id}.jpg
                    </code>
                  </p>
                </div>

                {/* Gradient overlay bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-16"
                  style={{
                    background: 'linear-gradient(transparent, rgba(255, 133, 162, 0.15))',
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
