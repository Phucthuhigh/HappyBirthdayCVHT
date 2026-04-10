import { useState, useEffect, useCallback, useMemo } from 'react';

const PHASES = {
  IDLE: 'idle',
  ENTERING: 'entering',
  SHAKING: 'shaking',
  EXPLODING: 'exploding',
  REVEALED: 'revealed',
};

const FIREWORK_COLORS = [
  '#FF85A2', '#FFD166', '#FFC8DD', '#FF6B8A',
  '#FFE29A', '#A8E6CF', '#FFBEA3', '#FFB3C6',
  '#B5EAD7', '#FF8FA3', '#FFDAB9', '#E2F0CB',
];

const MAX_CHARS_PER_PAGE = 200;

function splitMessage(text) {
  if (!text || text.length <= MAX_CHARS_PER_PAGE) return [text];

  const pages = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= MAX_CHARS_PER_PAGE) {
      pages.push(remaining);
      break;
    }

    // Find a good break point (space, period, comma) near the limit
    let breakAt = MAX_CHARS_PER_PAGE;
    const searchFrom = Math.max(breakAt - 40, 0);
    const chunk = remaining.substring(searchFrom, breakAt + 1);

    const lastSpace = chunk.lastIndexOf(' ');
    const lastPeriod = chunk.lastIndexOf('.');
    const lastComma = chunk.lastIndexOf(',');
    const lastBreak = Math.max(lastPeriod, lastComma, lastSpace);

    if (lastBreak > 0) {
      breakAt = searchFrom + lastBreak + 1;
    }

    pages.push(remaining.substring(0, breakAt).trim());
    remaining = remaining.substring(breakAt).trim();
  }

  return pages;
}

function RevealedLetter({ wish, onClose }) {
  const pages = useMemo(() => splitMessage(wish.message), [wish.message]);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = pages.length;
  const isMultiPage = totalPages > 1;

  return (
    <div
      className="relative max-w-md w-full mx-4 animate-bounce-in"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="relative rounded-3xl p-8 shadow-2xl"
        style={{
          background: 'linear-gradient(160deg, #FFFFFF 0%, #FFF5F7 50%, #FFFBF0 100%)',
          border: '2px solid rgba(255, 200, 221, 0.5)',
          minHeight: isMultiPage ? '320px' : 'auto',
        }}
      >
        {/* Decorative top */}
        <div className="flex justify-center mb-4">
          <div className="flex gap-1">
            {['🌸', '💝', '🌸'].map((e, i) => (
              <span key={i} className="text-2xl animate-float-gentle" style={{ animationDelay: `${i * 0.3}s` }}>
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* Quote mark */}
        <div className="text-5xl font-display text-center opacity-15 mb-2" style={{ color: '#FF85A2' }}>
          "
        </div>

        {/* Message - current page */}
        <p
          className="text-base md:text-lg leading-relaxed text-center mb-6 transition-opacity duration-300"
          style={{ color: '#4A3728', minHeight: isMultiPage ? '100px' : 'auto' }}
          key={currentPage}
        >
          {pages[currentPage]}
        </p>

        {/* Pagination controls */}
        {isMultiPage && (
          <div className="flex items-center justify-center gap-4 mb-4">
            {/* Prev button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: currentPage === 0 ? '#eee' : 'linear-gradient(135deg, #FF85A2, #FFD166)',
                color: 'white',
              }}
            >
              ‹
            </button>

            {/* Page dots */}
            <div className="flex gap-1.5">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className="transition-all duration-300 rounded-full cursor-pointer"
                  style={{
                    width: i === currentPage ? '20px' : '8px',
                    height: '8px',
                    background: i === currentPage
                      ? 'linear-gradient(135deg, #FF85A2, #FFD166)'
                      : '#FFC8DD',
                    opacity: i === currentPage ? 1 : 0.5,
                  }}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: currentPage === totalPages - 1 ? '#eee' : 'linear-gradient(135deg, #FF85A2, #FFD166)',
                color: 'white',
              }}
            >
              ›
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #FFC8DD, transparent)' }} />
          <span className="text-sm">💕</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #FFC8DD, transparent)' }} />
        </div>

        {/* Sender */}
        <div className="text-center">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold"
            style={{
              background: 'linear-gradient(135deg, #FF85A2, #FFD166)',
              color: 'white',
            }}
          >
            <span>{(!wish.name || wish.name === 'Ẩn danh') ? '🕵️' : '💌'}</span>
            {wish.name || 'Ẩn danh'}
          </div>
        </div>

        {/* Page indicator text */}
        {isMultiPage && (
          <p className="text-center text-xs mt-3 opacity-40" style={{ color: '#8B7355' }}>
            Trang {currentPage + 1} / {totalPages}
          </p>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg
                     text-lg bg-white hover:bg-red-50 transition-colors cursor-pointer"
          style={{ border: '2px solid #FFC8DD' }}
          aria-label="Đóng"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function EnvelopeReveal({ wish, envelopeIndex, onClose }) {
  const [phase, setPhase] = useState(PHASES.IDLE);
  const [shakeCount, setShakeCount] = useState(0);

  // Generate firework particles
  const fireworks = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      const angle = (i / 40) * 360;
      const distance = 100 + Math.random() * 200;
      const size = 4 + Math.random() * 8;
      const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
      const delay = Math.random() * 0.3;
      const duration = 0.6 + Math.random() * 0.8;

      return { angle, distance, size, color, delay, duration };
    });
  }, []);

  // Star burst particles
  const stars = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => {
      const angle = (i / 15) * 360;
      const distance = 150 + Math.random() * 150;
      const delay = Math.random() * 0.2;
      return { angle, distance, delay };
    });
  }, []);

  // Auto-enter on mount
  useEffect(() => {
    const t = setTimeout(() => setPhase(PHASES.ENTERING), 50);
    return () => clearTimeout(t);
  }, []);

  // Handle click to start shake
  const handleEnvelopeClick = useCallback(() => {
    if (phase === PHASES.ENTERING) {
      setPhase(PHASES.SHAKING);
      setShakeCount(0);

      // Shake for 2 seconds then explode
      let count = 0;
      const shakeInterval = setInterval(() => {
        count++;
        setShakeCount(count);
        if (count >= 12) {
          clearInterval(shakeInterval);
          setPhase(PHASES.EXPLODING);

          // Reveal after explosion animation
          setTimeout(() => {
            setPhase(PHASES.REVEALED);
          }, 800);
        }
      }, 150);
    }
  }, [phase]);

  const handleClose = useCallback(() => {
    setPhase(PHASES.IDLE);
    setTimeout(onClose, 300);
  }, [onClose]);

  if (!wish) return null;

  const envelopeColors = [
    { bg: 'linear-gradient(135deg, #FFB3C6, #FF85A2)', flap: '#FF6B8A' },
    { bg: 'linear-gradient(135deg, #FFD6A5, #FFB347)', flap: '#FFA033' },
    { bg: 'linear-gradient(135deg, #FFDAB9, #FFC8DD)', flap: '#FFB3C6' },
    { bg: 'linear-gradient(135deg, #B5EAD7, #A8E6CF)', flap: '#7DCEA0' },
    { bg: 'linear-gradient(135deg, #FFE29A, #FFD166)', flap: '#FFC233' },
    { bg: 'linear-gradient(135deg, #FFC8DD, #FFB3C6)', flap: '#FF9FB8' },
    { bg: 'linear-gradient(135deg, #C9B1FF, #B5A0E6)', flap: '#A08AD4' },
    { bg: 'linear-gradient(135deg, #ABDEE6, #8ED1DB)', flap: '#6EC5D0' },
  ];
  const color = envelopeColors[(envelopeIndex || 0) % envelopeColors.length];

  // Shake intensity increases over time
  const shakeIntensity = Math.min(shakeCount * 2.5, 25);
  const shakeRotation = phase === PHASES.SHAKING
    ? `rotate(${shakeCount % 2 === 0 ? shakeIntensity : -shakeIntensity}deg)`
    : 'rotate(0deg)';

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-all duration-500
        ${phase === PHASES.IDLE ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
      style={{
        backgroundColor: phase === PHASES.IDLE ? 'transparent' : 'rgba(0, 0, 0, 0.6)',
        backdropFilter: phase !== PHASES.IDLE ? 'blur(8px)' : 'none',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && phase === PHASES.REVEALED) {
          handleClose();
        }
      }}
    >
      {/* Firework particles */}
      {(phase === PHASES.EXPLODING || phase === PHASES.REVEALED) && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {fireworks.map((fw, i) => {
            const rad = (fw.angle * Math.PI) / 180;
            const x = Math.cos(rad) * fw.distance;
            const y = Math.sin(rad) * fw.distance;

            return (
              <div
                key={`fw-${i}`}
                className="absolute left-1/2 top-1/2 rounded-full"
                style={{
                  width: `${fw.size}px`,
                  height: `${fw.size}px`,
                  backgroundColor: fw.color,
                  boxShadow: `0 0 ${fw.size * 2}px ${fw.color}`,
                  transform: phase === PHASES.EXPLODING || phase === PHASES.REVEALED
                    ? `translate(${x}px, ${y}px) scale(0)`
                    : 'translate(0, 0) scale(1)',
                  transition: `all ${fw.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                  transitionDelay: `${fw.delay}s`,
                  animation: `firework-particle ${fw.duration}s ${fw.delay}s ease-out forwards`,
                }}
              />
            );
          })}

          {/* Star emojis burst */}
          {stars.map((star, i) => {
            const rad = (star.angle * Math.PI) / 180;
            const x = Math.cos(rad) * star.distance;
            const y = Math.sin(rad) * star.distance;

            return (
              <div
                key={`star-${i}`}
                className="absolute left-1/2 top-1/2 text-2xl"
                style={{
                  animation: `firework-particle 1s ${star.delay}s ease-out forwards`,
                  '--fw-x': `${x}px`,
                  '--fw-y': `${y}px`,
                }}
              >
                {['✨', '⭐', '🌟', '💫', '🎉'][i % 5]}
              </div>
            );
          })}
        </div>
      )}

      {/* Envelope Container */}
      {phase !== PHASES.REVEALED ? (
        <div
          className={`
            relative cursor-pointer select-none
            transition-all duration-500
            ${phase === PHASES.ENTERING ? 'scale-100 opacity-100' : ''}
            ${phase === PHASES.IDLE ? 'scale-0 opacity-0' : ''}
            ${phase === PHASES.EXPLODING ? 'scale-125 opacity-0' : ''}
          `}
          style={{
            transform: `${shakeRotation} ${phase === PHASES.SHAKING ? `scale(${1 + shakeCount * 0.02})` : ''}`,
            transition: phase === PHASES.SHAKING ? 'transform 0.1s ease-in-out' : 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          onClick={handleEnvelopeClick}
        >
          {/* Glow ring when entering */}
          {phase === PHASES.ENTERING && (
            <div
              className="absolute -inset-6 rounded-3xl animate-pulse-glow"
              style={{ border: '3px solid rgba(255, 209, 102, 0.5)' }}
            />
          )}

          {/* Main envelope */}
          <div
            className="relative rounded-2xl shadow-2xl overflow-hidden"
            style={{
              width: '280px',
              height: '200px',
              background: color.bg,
            }}
          >
            {/* Flap */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: '80px',
                background: color.flap,
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                opacity: 0.85,
              }}
            />

            {/* Heart seal */}
            <div
              className="absolute top-[48px] left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10"
              style={{ background: 'linear-gradient(135deg, #FFD166, #FFE29A)' }}
            >
              <span className="text-2xl">
                {phase === PHASES.SHAKING ? '🫨' : '💌'}
              </span>
            </div>

            {/* Fake text lines */}
            <div className="absolute bottom-6 left-8 right-8 space-y-2.5">
              <div className="h-2.5 rounded-full bg-white/40 w-3/4" />
              <div className="h-2.5 rounded-full bg-white/30 w-1/2" />
            </div>

            {/* Tap hint */}
            {phase === PHASES.ENTERING && (
              <div className="absolute bottom-0 left-0 right-0 py-2 text-center text-xs font-bold text-white/80 bg-black/10">
                👆 Nhấn để mở!
              </div>
            )}
          </div>

          {/* Sparkles around envelope during shake */}
          {phase === PHASES.SHAKING && (
            <>
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="absolute text-xl animate-sparkle"
                  style={{
                    top: `${-10 + Math.random() * 120}%`,
                    left: `${-20 + Math.random() * 140}%`,
                    '--duration': `${0.4 + Math.random() * 0.6}s`,
                    '--delay': `${Math.random() * 0.3}s`,
                    animationDelay: `${Math.random() * 0.3}s`,
                  }}
                >
                  ✨
                </span>
              ))}
            </>
          )}
        </div>
      ) : (
        /* Revealed Letter Content */
        <RevealedLetter wish={wish} onClose={handleClose} />
      )}
    </div>
  );
}
