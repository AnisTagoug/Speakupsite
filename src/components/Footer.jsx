import SocialIcons from './SocialIcons';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-dark/30 backdrop-blur-md border-t border-primary/30 py-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="text-light text-sm">© {new Date().getFullYear()} Radio SpeakUp. {t('all_rights_reserved')}. <a href="#" className="underline hover:text-primary">{t('legal_notice')}</a></div>
        <SocialIcons />
      </div>
    </footer>
  );
} 