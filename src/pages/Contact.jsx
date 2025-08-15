import { FaInstagram, FaWhatsapp, FaDiscord, FaTiktok } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import paulaAvatar from '../assets/avatars/rafa.jpg';
import adrianoAvatar from '../assets/avatars/Adriano.jpg';

export default function Contact() {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 animate-fade-in-up text-center">
      <h2 className="text-3xl font-bold text-primary mb-6">{t('contact_title')}</h2>
      <p className="text-lg text-light max-w-2xl mb-8">
        {t('contact_intro')}
      </p>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <a
          href="https://www.instagram.com/upradiospeak/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          <FaInstagram className="text-2xl" /> INSTAGRAM
        </a>
        <a
          href="https://wa.me/21654142883?text=Olá! Gostaria de saber mais sobre o Radio Speak Up! 🎵"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          <FaWhatsapp className="text-2xl" /> WhatsApp
        </a>
        <a
          href="https://discord.gg/SKR3wZTV"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          <FaDiscord className="text-2xl" /> Discord
        </a>
        <a
          href="https://www.tiktok.com/@speak_up035?_t=ZM-8xcA8AX7vMs&_r=1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          <FaTiktok className="text-2xl" /> TikTok
        </a>
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {/* Party Card */}
        <div className="bg-dark/80 rounded-2xl shadow-xl p-6 flex flex-col items-center w-72">
        <img
  src={paulaAvatar}
  alt="Paulaalkc avatar"
  className="w-24 h-24 rounded-full mb-4 object-contain border-4 border-primary bg-black"
/>
          <a
            href="https://fr.clubcooee.com/users/view/RafaelaPacker"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-primary mb-2 underline hover:text-pink-500"
          >
RafaelaPacker          </a>
          <p className="text-light">{t('contact_party_card')}</p>
        </div>
        {/* Team Card */}
        <div className="bg-dark/80 rounded-2xl shadow-xl p-6 flex flex-col items-center w-72">
          <img
            src={adrianoAvatar}
            alt="ADRIANO200013 avatar"
            className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-primary"
          />
          <a
            href="https://fr.clubcooee.com/users/view/ADRIANO200013"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-primary mb-2 underline hover:text-pink-500"
          >
            ADRIANO200013
            
          </a>
          <p className="text-light">{t('contact_team_card')}</p>
        </div>
      
      </div>
    </section>
  );
} 