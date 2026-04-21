import { useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import heic2any from 'heic2any';

const PHOTO_COUNT = 3;
const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'heic'];

function probeImage(basePath) {
  return new Promise((resolve) => {
    let tried = 0;
    let resolved = false;

    const checkDone = () => {
      tried++;
      if (tried === EXTENSIONS.length && !resolved) resolve(null);
    };

    for (const ext of EXTENSIONS) {
      const src = `${basePath}.${ext}`;

      if (ext === 'heic') {
        fetch(src)
          .then(async (res) => {
            // Check if Vite served index.html SPA fallback instead of a real image
            const contentType = res.headers.get('content-type');
            if (res.ok && contentType && !contentType.includes('text/html')) {
              try {
                const blob = await res.blob();
                if (!resolved) {
                  resolved = true;
                  const convertedBlob = await heic2any({ blob, toType: 'image/jpeg' });
                  const finalBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
                  resolve(URL.createObjectURL(finalBlob));
                }
              } catch (e) {
                // If it fails, unlock and treat as failed attempt
                resolved = false;
                checkDone();
              }
            } else {
              checkDone();
            }
          })
          .catch(checkDone);
      } else {
        const img = new Image();
        img.onload = () => {
          if (!resolved) {
            resolved = true;
            resolve(src);
          }
        };
        img.onerror = checkDone;
        img.src = src;
      }
    }
  });
}

const photos = Array.from({ length: PHOTO_COUNT }, (_, i) => ({
  id: i + 1,
  basePath: `/photos/photo-${i + 1}`,
  alt: `Ảnh cô Uyên ${i + 1}`,
}));

function PhotoLightbox({ photo, onClose }) {
  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center
                   text-2xl text-white/80 hover:text-white bg-white/10 hover:bg-white/20
                   transition-all cursor-pointer z-10"
        aria-label="Đóng"
      >
        ✕
      </button>

      {/* Image */}
      <div
        className="relative max-w-4xl max-h-[85vh] animate-bounce-in"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        />

        {/* Photo number badge */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm font-bold text-white/90"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
        >
          📷 Ảnh {photo.id} / {PHOTO_COUNT}
        </div>
      </div>
    </div>
  );
}

export default function PhotoGallery() {
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  // Map of photo.id -> resolved src (string) or null (not found)
  const [resolvedSrcs, setResolvedSrcs] = useState({});

  useEffect(() => {
    photos.forEach(async (photo) => {
      const src = await probeImage(photo.basePath);
      setResolvedSrcs((prev) => ({ ...prev, [photo.id]: src }));
    });
  }, []);

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
          {(photos.length <= 3 ? [...photos, ...photos, ...photos] : photos).map((photo, index) => {
            const resolvedSrc = resolvedSrcs[photo.id];
            const isProbing = resolvedSrc === undefined;
            const isFailed = resolvedSrc === null;
            const hasImage = typeof resolvedSrc === 'string';

            return (
              <SwiperSlide key={`${photo.id}-${index}`} className="w-[300px]! md:w-[380px]!">
                <div
                  className="relative rounded-2xl overflow-hidden shadow-xl mx-auto cursor-pointer group"
                  style={{
                    aspectRatio: '3 / 4',
                    background: 'linear-gradient(135deg, #FFC8DD 0%, #FFE29A 50%, #FFB3C6 100%)',
                  }}
                  onClick={() => hasImage && setLightboxPhoto({ ...photo, src: resolvedSrc })}
                >
                  {/* Image */}
                  {hasImage && (
                    <img
                      src={resolvedSrc}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}

                  {/* Placeholder when no image or still probing */}
                  {(isFailed || isProbing) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <span className="text-6xl mb-4">📷</span>
                      <p className="font-bold text-lg" style={{ color: '#4A3728' }}>
                        Ảnh {photo.id}
                      </p>
                      {isFailed && (
                        <p className="text-sm mt-1" style={{ color: '#8B7355' }}>
                          Thêm ảnh vào thư mục<br />
                          <code className="text-xs bg-white/50 px-2 py-0.5 rounded mt-1 inline-block">
                            public/photos/photo-{photo.id}.(jpg|png|...)
                          </code>
                        </p>
                      )}
                      {isProbing && (
                        <p className="text-sm mt-2 opacity-50 flex items-center justify-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
                          Đang tải...
                        </p>
                      )}
                    </div>
                  )}

                  {hasImage && (
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(0,0,0,0.15)' }}
                    >
                      <span className="text-4xl drop-shadow-lg">🔍</span>
                    </div>
                  )}

                  {/* Gradient overlay bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16"
                    style={{
                      background: 'linear-gradient(transparent, rgba(255, 133, 162, 0.15))',
                    }}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Photo Lightbox */}
      {lightboxPhoto && (
        <PhotoLightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
        />
      )}
    </section>
  );
}
