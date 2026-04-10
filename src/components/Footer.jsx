export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-12 md:py-16 text-center overflow-hidden">
      {/* Wave decoration */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
          style={{ height: '60px' }}
        >
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,0 L0,0 Z"
            fill="#FFF5F7"
          />
        </svg>
      </div>

      <div
        className="relative z-10 px-4"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, #FFC8DD20 100%)',
        }}
      >
        {/* Heart emoji */}
        <div className="mb-6">
          <span className="text-5xl inline-block animate-pulse">💖</span>
        </div>

        {/* Message */}
        <p
          className="font-display text-2xl md:text-3xl mb-3"
          style={{ color: '#FF85A2' }}
        >
          With love
        </p>
        <p
          className="text-lg md:text-xl font-bold mb-2"
          style={{ color: '#4A3728' }}
        >
          from Lớp ATTT2025.3 ❤️
        </p>
        <p className="text-sm mt-6" style={{ color: '#8B7355' }}>
          Chúc cô luôn mạnh khỏe, hạnh phúc và tràn đầy niềm vui 🌸
        </p>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-8">
          {['#FF85A2', '#FFD166', '#FFC8DD', '#FFD166', '#FF85A2'].map((color, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: color,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        <p className="text-xs mt-4 opacity-40" style={{ color: '#8B7355' }}>
          © {year} — Made with 💝 by ATTT2025.3
        </p>
      </div>
    </footer>
  );
}
