import { useState, useEffect } from 'react';
import FloatingHearts from './components/FloatingHearts';
import ConfettiEffect from './components/ConfettiEffect';
import HeroSection from './components/HeroSection';
import PhotoGallery from './components/PhotoGallery';
import WishesSection from './components/WishesSection';
import Footer from './components/Footer';

export default function App() {
  const [showConfetti, setShowConfetti] = useState(true);

  // Stop confetti after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#FFF5F7' }}>
      {/* Global animated effects */}
      <FloatingHearts count={18} />
      {showConfetti && <ConfettiEffect count={50} />}

      {/* Main sections */}
      <main>
        <HeroSection />
        <PhotoGallery />
        <WishesSection />
      </main>

      <Footer />
    </div>
  );
}
