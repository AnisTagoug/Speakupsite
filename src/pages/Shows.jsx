import { useTranslation } from 'react-i18next';
import { useState } from 'react';

// Import all assets
import juninaImg from '../assets/junina/junina.png';
import juninaImg2 from '../assets/junina/176013dc8690b0a45bc2129d51fb5908.jpg';
import juninaVideo from '../assets/junina/WhatsApp Vidéo 2025-07-03 à 14.32.57_8b2a9be2.mp4';
import locutoresImg from '../assets/locutores/speakup.jpg';
import apolloVideo from '../assets/locutores/Apollo.mp4';
import adrianoVideo from '../assets/locutores/Dj Adriano.mp4';
import gringoVideo from '../assets/locutores/Gringo.mp4';
import neekoVideo from '../assets/locutores/Neeko.mp4';
import nengoVideo from '../assets/locutores/nengo.mp4';
import mafiososImg from '../assets/Mafiosos/mafioso.jpg';
import mafiososVideo from '../assets/Mafiosos/mafiosos.mp4';
import mafiososVideo2 from '../assets/Mafiosos/Vem com Speak UP na frequência MAFIOSOS ❤️♥️ LANÇANDO AS MELHORES ♥️.mp4';
import mafiososVideo3 from '../assets/Mafiosos/Venha curtir que a noite só tá começando na sala dos Mafiosos- Speak UP ❤️😻 Sábado no melhor estilo..mp4';
import casamentoImg from '../assets/casamento/raquelcasamento.png';
import casamentoImg2 from '../assets/casamento/331ecdb92946b9d0408beb9f35b959f6.jpg';
import casamentoImg3 from '../assets/casamento/3bc453057d7cbb9fc5a6532aca66f4c7.jpg';
import casamentoImg4 from '../assets/casamento/7c5c5ad425ecc528fc4defcb0e460908.jpg';
import casamentoImg5 from '../assets/casamento/bf3cffcef2c1cc3269ea3696a593056c.jpg';
import casamentoVideo from '../assets/casamento/casamento.mp4';
import casamentoVideo2 from '../assets/casamento/WhatsApp Vidéo 2025-07-03 à 14.42.47_b9e37aa7.mp4';
import conexaoImg from '../assets/conexao/conexao.jpg';
import conexaoVideo1 from '../assets/conexao/1.mp4';
import conexaoVideo2 from '../assets/conexao/2.mp4';
import conexaoVideo3 from '../assets/conexao/3.mp4';
import conexaoVideo4 from '../assets/conexao/4.mp4';

export default function Shows() {
  const { t } = useTranslation();
  const [openAlbumId, setOpenAlbumId] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null); // null means grid view

  // Updated data structure: each event has a media array
  const bestMoments = [
    {
      id: 1,
      title: t('event_junina_title'),
      description: t('event_junina_description'),
      date: '2025',
      media: [
        { type: 'image', src: juninaImg, alt: 'Festa Junina' },
        { type: 'image', src: juninaImg2, alt: 'Festa Junina' },
        { type: 'video', src: juninaVideo, alt: 'DJ ADRAIANO na festa Junina' },
      ],
    },
    {
      id: 2,
      title: t('locutores_title'),
      description: t('locutores_description'),
      date: '2025',
      media: [
        { type: 'image', src: locutoresImg, alt: 'Speak Up - Locutores' },
        { type: 'video', src: apolloVideo, alt: 'Dj Apollo' },
        { type: 'video', src: adrianoVideo, alt: 'Dj Adriano' },
        { type: 'video', src: gringoVideo, alt: 'Dj Gringo' },
        { type: 'video', src: neekoVideo, alt: 'Dj Neeko' },
        { type: 'video', src: nengoVideo, alt: 'Dj Nengo' },
      ],
    },
    {
      id: 3,
      title: t('event_mafiosos_title'),
      description: t('event_mafiosos_description'),
      date: '2025',
      media: [
        { type: 'image', src: mafiososImg, alt: t('event_mafiosos_title') },
        { type: 'video', src: mafiososVideo, alt: t('event_mafiosos_title') },
        { type: 'video', src: mafiososVideo2, alt: t('event_mafiosos_title') },
        { type: 'video', src: mafiososVideo3, alt: t('event_mafiosos_title') },
      ],
    },
   
    {
      id: 5,
      title: t('event_casamento_title'),
      description: t('event_casamento_description'),
      date: '2025',
      media: [
        { type: 'image', src: casamentoImg, alt: 'Casamento Cristopher & Raquel' },
        { type: 'image', src: casamentoImg2, alt: 'Casamento Cristopher & Raquel' },
        { type: 'image', src: casamentoImg3, alt: 'Casamento Cristopher & Raquel' },
        { type: 'image', src: casamentoImg4, alt: 'Casamento Cristopher & Raquel' },
        { type: 'image', src: casamentoImg5, alt: 'Casamento Cristopher & Raquel' },
        { type: 'video', src: casamentoVideo, alt: 'Vídeo do Casamento Cristopher & Raquel' },
        { type: 'video', src: casamentoVideo2, alt: 'Vídeo do Casamento Cristopher & Raquel' },
      ],
    },
 
    {
      id: 6,
      title: 'Conexão Rádio Ritmix & Speak Up',
      description: 'Uma festa que celebra a união de dois rádios amigos. Ritmix e Speak Up juntos, mostrando que não somos concorrentes: somos parceiros que se apoiam, compartilham energia e espalham diversão para todos',
      date: '2025',
      media: [
        { type: 'image', src: conexaoImg, alt: 'Conexão Rádio Ritmix & Speak Up' },
        { type: 'video', src: conexaoVideo1, alt: 'Dj Adriano' },
        { type: 'video', src: conexaoVideo2, alt: 'Dj Andromeda' },
        { type: 'video', src: conexaoVideo3, alt: 'Dj Paty-Frozen' },
        { type: 'video', src: conexaoVideo4, alt: 'Dj Gringo' },
      ],
    },
 
  ];

  // Find the selected event for the modal
  const selectedMoment = bestMoments.find((m) => m.id === openAlbumId);

  // Modal component with grid and lightbox
  const AlbumModal = ({ moment, onClose }) => {
    if (!moment) return null;
    const media = moment.media;
    const closeLightbox = () => setLightboxIndex(null);
    const showPrev = () => setLightboxIndex((idx) => (idx > 0 ? idx - 1 : media.length - 1));
    const showNext = () => setLightboxIndex((idx) => (idx < media.length - 1 ? idx + 1 : 0));

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="bg-[#18122B] rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] relative shadow-2xl flex flex-col">
          <button
            className="absolute top-4 right-4 text-white text-2xl hover:text-primary z-10"
            onClick={onClose}
            aria-label={t('close')}
          >
            ×
          </button>
          <h2 className="text-2xl font-bold text-white mb-2 text-center">{moment.title}</h2>
          <p className="text-white/70 text-center mb-4">{moment.description}</p>

          {/* Lightbox view */}
          {lightboxIndex !== null ? (
            <div className="flex flex-col items-center flex-1">
              <div className="relative w-full flex items-center justify-center mb-4">
                {/* Prev button */}
                {media.length > 1 && (
                  <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-white/70 hover:text-primary px-2 z-10"
                    onClick={showPrev}
                    aria-label={t('previous')}
                  >
                    ‹
                  </button>
                )}
                {media[lightboxIndex].type === 'image' ? (
                  <img
                    src={media[lightboxIndex].src}
                    alt={media[lightboxIndex].alt}
                    className="max-h-[60vh] rounded-xl object-contain shadow-lg mx-auto"
                  />
                ) : (
                  <div className="relative">
                    <video
                      src={media[lightboxIndex].src}
                      controls
                      autoPlay
                      className="max-h-[60vh] rounded-xl object-contain shadow-lg mx-auto"
                    />
                    {/* Video title overlay */}
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg text-white font-semibold">
                      {media[lightboxIndex].alt}
                    </div>
                  </div>
                )}
                {/* Next button */}
                {media.length > 1 && (
                  <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl text-white/70 hover:text-primary px-2 z-10"
                    onClick={showNext}
                    aria-label={t('next')}
                  >
                    ›
                  </button>
                )}
              </div>
              <div className="flex justify-center gap-2 mb-4 flex-wrap">
                {media.map((m, idx) => (
                  <button
                    key={idx}
                    className={`w-4 h-4 rounded-full border-2 ${lightboxIndex === idx ? 'bg-primary border-primary' : 'bg-white/30 border-white/50'} transition-all`}
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={`Ver mídia ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                className="bg-gradient-to-r from-primary to-purple-600 text-white font-semibold py-2 px-6 rounded-xl hover:from-purple-600 hover:to-primary transition-all duration-300 shadow-lg"
                onClick={closeLightbox}
              >
                {t('back_to_album')}
              </button>
            </div>
          ) : (
            // Grid view with scroll
            <>
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {media.map((m, idx) => (
                    <div
                      key={idx}
                      className={`relative cursor-pointer group ${idx === 0 ? 'col-span-2 row-span-2' : ''}`}
                      onClick={() => setLightboxIndex(idx)}
                    >
                      {m.type === 'image' ? (
                        <img
                          src={m.src}
                          alt={m.alt}
                          className={`w-full object-cover rounded-lg shadow-md group-hover:opacity-80 transition ${idx === 0 ? 'h-64' : 'h-32'}`}
                        />
                      ) : (
                        <div className={`w-full bg-black/40 flex items-center justify-center rounded-lg shadow-md group-hover:opacity-80 transition relative ${idx === 0 ? 'h-64' : 'h-32'}`}>
                          <video
                            src={m.src}
                            className="h-full w-full object-cover rounded-lg opacity-60"
                            muted
                            preload="metadata"
                          />
                          <span className="absolute text-3xl text-white/80">🎥</span>
                        </div>
                      )}
                      {idx === 0 && (
                        <div className="absolute top-2 left-2 bg-primary/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-white">
                          {t('main_photo')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center pt-4 border-t border-white/10">
                <button
                  className="bg-gradient-to-r from-primary to-purple-600 text-white font-semibold py-2 px-6 rounded-xl hover:from-purple-600 hover:to-primary transition-all duration-300 shadow-lg"
                  onClick={onClose}
                >
                  {t('close')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18122B] via-[#7c3aed] to-[#2563eb] py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl">
            {t('best_moments_title')}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {t('best_moments_subtitle')}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestMoments.map((moment) => (
            <div
              key={moment.id}
              className="group relative bg-dark/40 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              {/* Media Display */}
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/10 to-purple-600/10">
                {moment.media[0]?.type === 'video' ? (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                    <div className="text-6xl text-white/60 group-hover:text-white transition-colors">
                      🎥
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                      src={moment.media[0]?.src}
                      alt={moment.title}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                {/* Date Badge */}
                <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-white">
                  {moment.date}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {moment.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {moment.description}
                </p>
                {/* Placeholder Text */}
                <div className="text-center py-4 text-white/50 text-sm italic">
                  {moment.media.length} {t('media_count')}
                </div>
                {/* Action Button */}
                <button
                  className="w-full bg-gradient-to-r from-primary to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => {
                    setOpenAlbumId(moment.id);
                    setLightboxIndex(null);
                  }}
                >
                  📁 {t('view_album')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-dark/40 backdrop-blur-sm rounded-2xl p-8 border-2 border-primary/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('best_moments_cta_title')}
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              {t('best_moments_cta_text')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/60">
              <span className="flex items-center gap-2">
                <span className="text-2xl">📸</span>
                <span>{t('photos')}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-2xl">🎥</span>
                <span>{t('videos')}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-2xl">🎵</span>
                <span>{t('special_moments')}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Album Modal */}
      {openAlbumId && (
        <AlbumModal
          moment={selectedMoment}
          onClose={() => setOpenAlbumId(null)}
        />
      )}
    </div>
  );
} 