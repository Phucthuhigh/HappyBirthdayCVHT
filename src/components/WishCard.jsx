import { useMemo } from 'react';

const EMOJIS = ['🌸', '🎀', '💝', '🌷', '🎂', '🧁', '🎈', '🎉', '💐', '🌺', '🦋', '⭐', '🩷', '🍰'];

const CARD_GRADIENTS = [
  'linear-gradient(135deg, #FFF5F7 0%, #FFE0EB 100%)',
  'linear-gradient(135deg, #FFFBF0 0%, #FFE29A40 100%)',
  'linear-gradient(135deg, #FFF0F3 0%, #FFC8DD40 100%)',
  'linear-gradient(135deg, #F0FFF4 0%, #A8E6CF40 100%)',
  'linear-gradient(135deg, #FFF5F0 0%, #FFBEA340 100%)',
  'linear-gradient(135deg, #FFF8F0 0%, #FFD16640 100%)',
];

export default function WishCard({ wish, index }) {
  const decorData = useMemo(() => {
    const emoji1 = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    let emoji2 = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    while (emoji2 === emoji1) {
      emoji2 = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    }
    const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
    return { emoji1, emoji2, gradient };
  }, [index]);

  return (
    <div
      className="group relative rounded-2xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-500 cursor-default break-inside-avoid mb-4 md:mb-6"
      style={{
        background: decorData.gradient,
        border: '1px solid rgba(255, 200, 221, 0.4)',
        animationDelay: `${index * 0.1}s`,
        transform: 'translateY(0)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 133, 162, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {/* Emoji decorations */}
      <span className="absolute top-3 right-3 text-xl opacity-60 group-hover:opacity-100 transition-opacity group-hover:animate-wiggle" aria-hidden="true">
        {decorData.emoji1}
      </span>
      <span className="absolute bottom-3 left-3 text-lg opacity-40 group-hover:opacity-80 transition-opacity" aria-hidden="true">
        {decorData.emoji2}
      </span>

      {/* Quote icon */}
      <div
        className="text-3xl mb-3 opacity-20 font-display"
        style={{ color: '#FF85A2' }}
        aria-hidden="true"
      >
        "
      </div>

      {/* Message */}
      <p
        className="text-sm md:text-base leading-relaxed mb-4 relative z-10"
        style={{ color: '#4A3728' }}
      >
        {wish.message}
      </p>

      {/* Sender */}
      <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: 'rgba(255, 133, 162, 0.2)' }}>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{
            background: 'linear-gradient(135deg, #FF85A2, #FFD166)',
          }}
        >
          {wish.name.charAt(0).toUpperCase()}
        </div>
        <span className="font-bold text-sm" style={{ color: '#FF6B8A' }}>
          {wish.name}
        </span>
      </div>
    </div>
  );
}
