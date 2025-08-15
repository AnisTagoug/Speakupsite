import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import enFlag from '../assets/flags/en.png';
import frFlag from '../assets/flags/fr.png';
import ptFlag from '../assets/flags/pt.png';
import ptBRFlag from '../assets/flags/br.png';
import deFlag from '../assets/flags/dt.png';

const languages = [
  { code: 'en', label: 'English', flag: enFlag },
  { code: 'fr', label: 'Français', flag: frFlag },
  { code: 'pt', label: 'Português', flag: ptFlag },
  { code: 'pt-BR', label: 'Português BR', flag: ptBRFlag },
  { code: 'de', label: 'Deutsch', flag: deFlag },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = i18n.language === 'pt-BR' ? 'pt-BR' : (languages.find(l => l.code === i18n.language) ? i18n.language : 'en');
  const ref = useRef();

  // Fermer le dropdown si clic en dehors
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('lang', code);
    setOpen(false);
  };

  const active = languages.find(l => l.code === current) || languages[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border-2 border-primary bg-dark text-light hover:bg-primary/80 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow"
      >
        <img src={active.flag} alt={active.label + ' flag'} className="w-5 h-5 rounded-full shadow" />
        {active.label}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-dark border border-primary/30 rounded-xl shadow-lg z-50 animate-fade-in-up">
          {languages.filter(l => l.code !== current).map(lang => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              className="flex items-center gap-2 w-full px-4 py-2 text-left text-light hover:bg-primary/80 hover:text-white transition-all rounded-xl"
            >
              <img src={lang.flag} alt={lang.label + ' flag'} className="w-5 h-5 rounded-full shadow" />
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 