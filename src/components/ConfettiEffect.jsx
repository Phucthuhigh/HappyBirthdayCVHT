import { useMemo } from 'react';

const CONFETTI_COLORS = [
  '#FF85A2', '#FFD166', '#FFC8DD', '#FF6B8A',
  '#FFE29A', '#FFBEA3', '#A8E6CF', '#FF8FA3',
  '#FFB3C6', '#FFDAB9', '#B5EAD7', '#E2F0CB',
];

const SHAPES = ['circle', 'square', 'rectangle'];

export default function ConfettiEffect({ count = 60 }) {
  const confetti = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const left = Math.random() * 100;
      const duration = 3 + Math.random() * 5;
      const delay = Math.random() * 3;
      const sway = 2 + Math.random() * 4;
      const size = 6 + Math.random() * 10;

      let width, height, borderRadius;
      if (shape === 'circle') {
        width = size;
        height = size;
        borderRadius = '50%';
      } else if (shape === 'square') {
        width = size;
        height = size;
        borderRadius = '2px';
      } else {
        width = size * 0.5;
        height = size * 1.5;
        borderRadius = '2px';
      }

      return { id: i, color, left, duration, delay, sway, width, height, borderRadius };
    });
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            width: `${piece.width}px`,
            height: `${piece.height}px`,
            backgroundColor: piece.color,
            borderRadius: piece.borderRadius,
            '--duration': `${piece.duration}s`,
            '--delay': `${piece.delay}s`,
            '--sway': `${piece.sway}s`,
            animationDelay: `${piece.delay}s`,
            opacity: 0.9,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
