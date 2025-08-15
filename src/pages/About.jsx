import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 animate-fade-in-up text-center">
      <h2 className="text-3xl font-bold text-primary mb-6">{t('about_title')}</h2>
      <p className="text-lg text-light max-w-2xl whitespace-pre-line">
        {t('about_text')}
      </p>
      <a 
        href="cooee:EnterScene(33335445)" 
        className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 mt-6 inline-block"
      >
        {t('speak_up_room')}
      </a>
    </section>
  );
} 