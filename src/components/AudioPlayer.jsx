import { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { PlayIcon, PauseIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import liveRecordAudio from '../assets/live_record.mp3';

const STREAM_URL = liveRecordAudio;

const AudioPlayer = forwardRef((props, ref) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const { t } = useTranslation();

  // Expose audio element to parent component
  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play();
        setPlaying(true);
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setPlaying(false);
      }
    },
    get audioElement() {
      return audioRef.current;
    }
  }));

  const togglePlay = () => {
    if (!playing) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 bg-dark/80 rounded-xl p-6 shadow-lg animate-fade-in-up">
      <div className="flex items-center gap-3">
        <SpeakerWaveIcon className="h-8 w-8 text-primary animate-pulse" />
        <span className="text-xl font-semibold text-light">{t('radio_live')}</span>
      </div>
      <button
        onClick={togglePlay}
        className="mt-2 bg-primary hover:bg-primary/80 text-white rounded-full p-4 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? <PauseIcon className="h-8 w-8" /> : <PlayIcon className="h-8 w-8" />}
      </button>
      <audio ref={audioRef} src={STREAM_URL} preload="none" onEnded={() => setPlaying(false)} />
    </div>
  );
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer; 