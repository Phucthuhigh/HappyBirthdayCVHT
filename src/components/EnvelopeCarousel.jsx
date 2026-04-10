import { useState, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const ENVELOPE_COLORS = [
  { bg: 'linear-gradient(135deg, #FFB3C6 0%, #FF85A2 100%)', flap: '#FF6B8A', seal: '#FFD166' },
  { bg: 'linear-gradient(135deg, #FFD6A5 0%, #FFB347 100%)', flap: '#FFA033', seal: '#FF85A2' },
  { bg: 'linear-gradient(135deg, #FFDAB9 0%, #FFC8DD 100%)', flap: '#FFB3C6', seal: '#FFD166' },
  { bg: 'linear-gradient(135deg, #B5EAD7 0%, #A8E6CF 100%)', flap: '#7DCEA0', seal: '#FF85A2' },
  { bg: 'linear-gradient(135deg, #FFE29A 0%, #FFD166 100%)', flap: '#FFC233', seal: '#FF6B8A' },
  { bg: 'linear-gradient(135deg, #FFC8DD 0%, #FFB3C6 100%)', flap: '#FF9FB8', seal: '#FFD166' },
  { bg: 'linear-gradient(135deg, #C9B1FF 0%, #B5A0E6 100%)', flap: '#A08AD4', seal: '#FFD166' },
  { bg: 'linear-gradient(135deg, #ABDEE6 0%, #8ED1DB 100%)', flap: '#6EC5D0', seal: '#FF85A2' },
];

const ENVELOPE_EMOJIS = ['💌', '💝', '🌸', '🎀', '💗', '🌷', '✨', '🦋'];

export default function EnvelopeCarousel({ wishes, onSelect }) {
  const swiperRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const spinWheel = useCallback(() => {
    if (isSpinning || !swiperRef.current) return;

    setIsSpinning(true);
    setSelectedIndex(null);

    const swiper = swiperRef.current;
    const totalSlides = wishes.length;

    // Random number of steps to spin
    const minSteps = totalSlides * 2;
    const extraSteps = Math.floor(Math.random() * totalSlides);
    const totalSteps = minSteps + extraSteps;

    let currentStep = 0;
    const baseSpeed = 30;

    function step() {
      if (currentStep >= totalSteps) {
        setIsSpinning(false);
        // Use Swiper's realIndex to get the actual centered slide
        const realIdx = swiper.realIndex;
        setSelectedIndex(realIdx);
        // Delay then trigger selection
        setTimeout(() => {
          onSelect(wishes[realIdx], realIdx);
        }, 600);
        return;
      }

      swiper.slideNext(0);
      currentStep++;

      // Easing: start fast, slow down near the end
      const progress = currentStep / totalSteps;
      const eased = Math.pow(progress, 2.5);
      const delay = baseSpeed + eased * 400;

      setTimeout(step, delay);
    }

    step();
  }, [isSpinning, wishes, onSelect]);

  return (
    <div className="relative">
      {/* Swiper carousel */}
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        effect="coverflow"
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        grabCursor={!isSpinning}
        centeredSlides={true}
        loop={true}
        slidesPerView="auto"
        spaceBetween={30}
        allowTouchMove={!isSpinning}
        coverflowEffect={{
          rotate: 15,
          stretch: 0,
          depth: 200,
          modifier: 1.5,
          slideShadows: false,
        }}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        className="envelope-swiper py-8"
      >
        {wishes.map((wish, index) => {
          const color = ENVELOPE_COLORS[index % ENVELOPE_COLORS.length];
          const emoji = ENVELOPE_EMOJIS[index % ENVELOPE_EMOJIS.length];

          return (
            <SwiperSlide key={wish.id} className="w-[220px]! md:w-[260px]!">
              <div
                className="relative mx-auto cursor-pointer select-none transition-all duration-300 hover:scale-105"
                style={{ width: '220px', height: '160px' }}
                onClick={() => {
                  if (!isSpinning) {
                    onSelect(wish, index);
                  }
                }}
              >
                {/* Envelope body */}
                <div
                  className={`absolute inset-0 rounded-xl shadow-lg overflow-hidden ${selectedIndex === index ? 'animate-pulse-glow' : ''}`}
                  style={{ background: color.bg }}
                >
                  {/* Envelope flap (triangle) */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: '60px',
                      background: color.flap,
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      opacity: 0.8,
                    }}
                  />

                  {/* Heart seal */}
                  <div
                    className="absolute top-[35px] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-md z-10"
                    style={{ backgroundColor: color.seal }}
                  >
                    <span className="text-xl">💌</span>
                  </div>

                  {/* Author name */}
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p
                      className="text-sm font-bold truncate"
                      style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                    >
                      {wish.name}
                    </p>
                  </div>

                  {/* Corner emoji */}
                  <span className="absolute bottom-2 right-3 text-lg opacity-50">
                    {emoji}
                  </span>

                  {/* Number badge */}
                  <div
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}
                  >
                    #{index + 1}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Spin Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className={`
            relative px-8 py-4 rounded-full font-bold text-lg text-white
            shadow-xl transition-all duration-300
            ${isSpinning
              ? 'opacity-60 cursor-not-allowed scale-95'
              : 'hover:scale-110 hover:shadow-2xl active:scale-95 cursor-pointer'
            }
          `}
          style={{
            background: isSpinning
              ? 'linear-gradient(135deg, #ccc, #aaa)'
              : 'linear-gradient(135deg, #FF85A2, #FFD166, #FF6B8A)',
            backgroundSize: '200% 200%',
            animation: isSpinning ? 'none' : 'shimmer 3s linear infinite',
          }}
        >
          <span className="flex items-center gap-2">
            {isSpinning ? (
              <>
                <span className="animate-spin inline-block">🎰</span>
                Đang quay...
              </>
            ) : (
              <>
                🎰 Quay Thư Ngẫu Nhiên!
              </>
            )}
          </span>
        </button>
      </div>

      {/* Instruction */}
      <p className="text-center mt-3 text-sm opacity-50" style={{ color: '#8B7355' }}>
        {isSpinning ? 'Chờ chút nha... ✨' : 'Nhấn nút để mở 1 lá thư bất ngờ!'}
      </p>
    </div>
  );
}
