import { useState, useEffect } from 'react';
import { fetchWishes } from '../services/googleSheets';
import { wishes as fallbackWishes } from '../data/wishes';
import EnvelopeCarousel from './EnvelopeCarousel';
import EnvelopeReveal from './EnvelopeReveal';

export default function WishesSection() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingSample, setUsingSample] = useState(false);
  const [selectedWish, setSelectedWish] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    async function loadWishes() {
      try {
        const data = await fetchWishes();
        if (data && data.length > 0) {
          setWishes(data);
        } else {
          setWishes(fallbackWishes);
          setUsingSample(true);
        }
      } catch (err) {
        console.error('Failed to fetch wishes:', err);
        setWishes(fallbackWishes);
        setUsingSample(true);
      } finally {
        setLoading(false);
      }
    }

    loadWishes();

    // Auto-refresh every 30 seconds
    const interval = setInterval(async () => {
      try {
        const data = await fetchWishes();
        if (data && data.length > 0) {
          setWishes(data);
          setUsingSample(false);
        }
      } catch {
        // Silent fail
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleSelect = (wish, index) => {
    setSelectedWish(wish);
    setSelectedIndex(index);
  };

  const handleCloseReveal = () => {
    setSelectedWish(null);
    setSelectedIndex(null);
  };

  return (
    <section
      id="wishes"
      className="py-16 md:py-24 px-4 relative"
      style={{
        background: 'linear-gradient(180deg, #FFF0F3 0%, #FFF5F7 50%, #FFFBF0 100%)',
      }}
    >
      {/* Section heading */}
      <div className="text-center mb-10 md:mb-14">
        <span className="text-4xl mb-2 inline-block animate-float-gentle">💌</span>
        <h2
          className="font-display text-3xl sm:text-4xl md:text-5xl mb-3"
          style={{ color: '#FF85A2' }}
        >
          Hộp Thư Yêu Thương
        </h2>
        <p className="text-base md:text-lg max-w-lg mx-auto" style={{ color: '#8B7355' }}>
          Quay vòng quay để mở những lá thư bất ngờ từ lớp ATTT2025.3 🎰
        </p>

        {usingSample && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-secondary/20" style={{ color: '#8B7355' }}>
            <span>✨</span>
            Đang hiển thị thư mẫu — Kết nối Google Sheets để xem thư thật
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full animate-bounce"
                style={{
                  backgroundColor: i === 0 ? '#FF85A2' : i === 1 ? '#FFD166' : '#FFC8DD',
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Envelope Carousel */}
      {!loading && wishes.length > 0 && (
        <div className="max-w-5xl mx-auto">
          <EnvelopeCarousel wishes={wishes} onSelect={handleSelect} />
        </div>
      )}

      {/* Letter count */}
      {!loading && wishes.length > 0 && (
        <div className="text-center mt-8">
          <span
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold shadow-md"
            style={{
              background: 'linear-gradient(135deg, #FF85A2, #FFD166)',
              color: 'white',
            }}
          >
            📬 {wishes.length} lá thư yêu thương
          </span>
        </div>
      )}

      {/* Envelope Reveal Overlay */}
      {selectedWish && (
        <EnvelopeReveal
          wish={selectedWish}
          envelopeIndex={selectedIndex}
          onClose={handleCloseReveal}
        />
      )}
    </section>
  );
}
