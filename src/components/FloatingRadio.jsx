import AudioPlayer from './AudioPlayer';
import logo from '../assets/logo.png';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function FloatingRadio({ isModalOpen, onCloseModal }) {
  const { t } = useTranslation();
  const [sloganIndex, setSloganIndex] = useState(0);
  const slogans = [t('slogan1'), t('slogan2'), t('slogan3')];
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (isModalOpen) {
      const interval = setInterval(() => {
        setSloganIndex(i => (i + 1) % slogans.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [slogans, isModalOpen]);

  // Auto-start audio when modal opens
  useEffect(() => {
    if (isModalOpen && audioRef.current) {
      // Small delay to ensure audio element is ready
      setTimeout(() => {
        audioRef.current?.play();
      }, 100);
    }
  }, [isModalOpen]);

  const handleModalClose = () => {
    onCloseModal();
    // Don't stop audio when closing modal - let it continue playing
  };

  return (
    <>
      {/* Audio Player - Always mounted, even when modal is closed */}
      <div className="fixed bottom-8 left-8 z-40">
        <AudioPlayer ref={audioRef} />
      </div>

      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70"
            onClick={handleModalClose}
          />
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/20 animate-fade-in-up">
            {/* Close Button */}
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl font-bold w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-300"
            >
              ×
            </button>
            
            {/* Logo and Content */}
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="absolute -inset-4 bg-primary/30 rounded-full blur-2xl animate-pulse" />
                <img 
                  src={logo} 
                  alt="Radio SpeakUp logo" 
                  className="w-24 h-24 rounded-full shadow-2xl border-4 border-primary relative z-10" 
                  style={{boxShadow: '0 0 40px 8px #a21caf88'}}
                />
              </div>
              
              {/* Animated Slogan */}
              <p key={sloganIndex} className="text-xl md:text-2xl text-white/90 text-center max-w-lg mb-6 animate-fade-in min-h-[2em]">
                {slogans[sloganIndex]}
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <a 
                  href="#shows" 
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:from-pink-500 hover:to-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 text-center"
                  onClick={handleModalClose}
                >
                  {t('discover_shows')}
                </a>
                <button
                  onClick={handleModalClose}
                  className="flex-1 px-6 py-3 bg-white/10 text-white font-bold rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 