import { useMemo } from 'react';

const SPARKLE_POSITIONS = [
  { top: '10%', left: '15%' },
  { top: '5%', left: '70%' },
  { top: '20%', left: '85%' },
  { top: '15%', left: '40%' },
  { top: '8%', left: '55%' },
  { top: '25%', left: '25%' },
  { top: '12%', left: '90%' },
  { top: '18%', left: '10%' },
];

export default function HeroSection() {
  const sparkles = useMemo(() => {
    return SPARKLE_POSITIONS.map((pos, i) => ({
      ...pos,
      delay: Math.random() * 3,
      duration: 1.5 + Math.random() * 2,
      size: 12 + Math.random() * 16,
    }));
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF0F3 0%, #FFF5F7 40%, #FFFBF0 100%)',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full opacity-20"
           style={{ background: 'radial-gradient(circle, #FFD166, transparent)' }} />
      <div className="absolute bottom-[-60px] left-[-60px] w-52 h-52 rounded-full opacity-20"
           style={{ background: 'radial-gradient(circle, #FF85A2, transparent)' }} />
      <div className="absolute top-1/3 left-[10%] w-32 h-32 rounded-full opacity-10"
           style={{ background: 'radial-gradient(circle, #FFC8DD, transparent)' }} />

      {/* Sparkle stars */}
      {sparkles.map((s, i) => (
        <span
          key={i}
          className="absolute animate-sparkle text-secondary pointer-events-none"
          style={{
            top: s.top,
            left: s.left,
            fontSize: `${s.size}px`,
            '--duration': `${s.duration}s`,
            '--delay': `${s.delay}s`,
            animationDelay: `${s.delay}s`,
          }}
          aria-hidden="true"
        >
          ✦
        </span>
      ))}

      {/* Cake emoji animated */}
      <div className="animate-bounce-in mb-4">
        <span className="text-7xl md:text-8xl inline-block animate-float-gentle" role="img" aria-label="birthday cake">
          🎂
        </span>
      </div>

      {/* Title */}
      <div className="animate-bounce-in" style={{ animationDelay: '0.2s' }}>
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, #FF85A2, #FFD166, #FF6B8A, #FFD166, #FF85A2)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 4px 8px rgba(255, 133, 162, 0.3))',
          }}
        >
          Happy Birthday!
        </h1>
      </div>

      {/* Name */}
      <div className="animate-bounce-in mt-4 md:mt-6" style={{ animationDelay: '0.5s' }}>
        <h2
          className="font-display text-3xl sm:text-4xl md:text-5xl"
          style={{
            color: '#FF6B8A',
            filter: 'drop-shadow(0 2px 4px rgba(255, 107, 138, 0.25))',
          }}
        >
          Cô Đỗ Thị Phương Uyên
        </h2>
      </div>

      {/* Badge */}
      <div className="animate-bounce-in mt-6" style={{ animationDelay: '0.8s' }}>
        <span
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base md:text-lg font-bold shadow-lg animate-pulse-glow"
          style={{
            background: 'linear-gradient(135deg, #FFC8DD, #FFE29A)',
            color: '#4A3728',
          }}
        >
          <span>🌟</span>
          Cố vấn học tập ATTT2025.3
          <span>🌟</span>
        </span>
      </div>

      {/* Subtitle */}
      <p
        className="mt-8 text-lg md:text-xl max-w-xl mx-auto animate-fade-in-up font-semibold"
        style={{
          color: '#8B7355',
          animationDelay: '1.2s',
        }}
      >
        Lớp ATTT2025.3 gửi tới cô ngàn lời yêu thương 💝
      </p>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 animate-bounce opacity-60"
        style={{ animationDuration: '2s' }}
      >
        <div className="flex flex-col items-center gap-1 text-primary">
          <span className="text-sm font-semibold">Cuộn xuống</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5" />
            <path d="M7 7l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
