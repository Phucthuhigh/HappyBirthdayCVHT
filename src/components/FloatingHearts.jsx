import { useMemo } from 'react';

const HEART_EMOJIS = ['❤️', '💖', '💗', '💝', '💕', '💓', '🩷', '🌸'];

export default function FloatingHearts({ count = 20 }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const emoji = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
      const left = Math.random() * 100;
      const size = 16 + Math.random() * 28;
      const duration = 8 + Math.random() * 12;
      const delay = Math.random() * 15;
      const opacity = 0.4 + Math.random() * 0.6;

      return { id: i, emoji, left, size, duration, delay, opacity };
    });
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute animate-float-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            '--duration': `${heart.duration}s`,
            '--delay': `${heart.delay}s`,
            animationDelay: `${heart.delay}s`,
            opacity: 0,
            maxWidth: '40px',
          }}
          aria-hidden="true"
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}
