import bg4k from '../assets/bg-4k.jpg';
import { useTranslation } from 'react-i18next';
import su from '../assets/suuuu.png';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
  className="absolute inset-0 bg-cover bg-no-repeat" 
  style={{ 
    backgroundImage: `url(${bg4k})`,
    backgroundPosition: 'center 30%' // move image down vertically
  }} 
/>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Main Welcome Text - Centered on Home Page */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 drop-shadow-2xl">
            {t('welcome_to')}
          </h1>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-8 drop-shadow-2xl animate-pulse moving-gradient">
            {t('radio_speakup')}
          </h2>
          <div className="w-32 h-2 mx-auto rounded-full animate-fade-in-up moving-bar" style={{animationDelay: '0.6s'}} />
        </div>
      </div>

      {/* Custom CSS for moving gradient animation */}
      <style jsx>{`
        .moving-gradient {
          background: linear-gradient(
            90deg,
            #fbbf24,
            #f59e0b,
            #d97706,
            #f59e0b,
            #fbbf24
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: moveGradient 3s ease-in-out infinite;
        }
        
        .moving-bar {
          background: linear-gradient(
            90deg,
            #fbbf24,
            #a855f7,
            #3b82f6,
            #a855f7,
            #fbbf24
          );
          background-size: 200% 100%;
          animation: moveGradient 2s ease-in-out infinite;
        }
        
        @keyframes moveGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
} 