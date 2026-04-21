import { useRef, useState, useEffect } from 'react';

export default function VideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Intersection Observer for Autoplay when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play automatically but muted first to respect browser policies if needed. 
          // Usually we try unmuted, and if fails, we could mute, but let's try direct play.
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(err => {
              console.log("Trình duyệt chặn autoplay có tiếng, chờ người dùng bấm play:", err);
            });
          }
        } else {
          // Pause when scrolling out of view
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Sync state with video events
  const handlePlayStatus = () => setIsPlaying(!videoRef.current?.paused);
  
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    setCurrentTime(current);
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const newProgress = parseFloat(e.target.value);
    const seekTime = (newProgress / 100) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
    setProgress(newProgress);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-16 md:py-24 px-4 relative flex items-center justify-center overflow-hidden"
       style={{ backgroundColor: '#FFF5F7' }}>
      
      <style>{`
        .video-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #FFD166;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 133, 162, 0.5);
        }
        .video-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #FFD166;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(255, 133, 162, 0.5);
        }
      `}</style>
      
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      
      <div className="max-w-4xl w-full mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-10">
          <span className="text-4xl mb-2 inline-block animate-bounce">🎬</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-3" style={{ color: '#FF85A2' }}>
            Thước Phim Kỷ Niệm
          </h2>
          <p className="text-base md:text-lg" style={{ color: '#8B7355' }}>
            Video bé xíu dành tặng cô 🌷
          </p>
        </div>

        {/* Video Container - Custom styled */}
        <div 
          className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-white cursor-pointer group mx-auto"
          style={{ maxWidth: '800px', boxShadow: '0 20px 40px rgba(255, 133, 162, 0.2)' }}
          onClick={togglePlay}
        >
          {/* Main Video */}
          <video
            ref={videoRef}
            src="/videos/video_chuc_mung.mov"
            playsInline
            onPlay={handlePlayStatus}
            onPause={handlePlayStatus}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-auto object-cover max-h-[70vh] bg-black/5"
            poster="/photos/photo-1.jpg" // Optional poster
          />

          {/* Big Play Button Overlay (when paused) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity">
              <button 
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-xl transform transition-transform hover:scale-110"
                style={{ 
                  background: 'linear-gradient(135deg, #FF85A2, #FFD166)',
                  color: 'white'
                }}
              >
                ▶️
              </button>
            </div>
          )}

          {/* Custom Controls Bar */}
          <div 
            className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300
                       ${isPlaying ? 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0' : 'opacity-100 translate-y-0'}`}
            style={{ 
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' 
            }}
            onClick={(e) => e.stopPropagation()} // Stop click through to video
          >
            <div className="flex flex-col gap-2">
              
              {/* Progress Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="video-slider w-full h-2 rounded-full outline-none appearance-none cursor-pointer bg-white/30"
                style={{
                  background: `linear-gradient(to right, #FF85A2 ${progress}%, rgba(255,255,255,0.3) ${progress}%)`
                }}
              />
              
              {/* Timeline & Buttons */}
              <div className="flex items-center justify-between text-white mt-1">
                <button 
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                
                <div className="text-sm font-medium drop-shadow-md">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
