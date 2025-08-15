import { Link, NavLink } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import logo from '../assets/logo.png';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';

export default function Navbar({ onRadioClick }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();
  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/about', label: t('about') },
    { to: '/shows', label: t('best_moments') },
    { to: '/events', label: 'Events' },
    { to: '/contact', label: t('contact') },
    { to: '/team', label: t('team') },
  ];
  return (
    <nav className="bg-dark/30 backdrop-blur-md border-b border-primary/30 sticky top-0 z-50 shadow-none">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
        <button
  onClick={onRadioClick}
  className="h-24 w-24 rounded-full bg-black border-4 border-primary shadow-lg flex items-center justify-center"
  style={{ boxShadow: '0 0 30px 8px #a21caf88' }}
>
  <img
    src={logo}
    alt="Radio SpeakUp"
    style={{ width: '90px', height: '72px', objectFit: 'contain' }}
    className="rounded-full"
  />
</button>
          <span className="text-xl font-bold text-primary tracking-wide">SPEAK UP</span>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-light hover:text-primary'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {user && (
            <NavLink
              to="/pdc"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-light hover:text-primary'}`
              }
            >
              Back Office
            </NavLink>
          )}
          <LanguageSwitcher />
        </div>
        <button className="md:hidden text-light" onClick={() => setOpen(!open)}>
          <Bars3Icon className="h-8 w-8" />
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-dark border-t border-primary/20 animate-fade-in-down">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-3 text-lg font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-light hover:text-primary'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {user && (
            <NavLink
              to="/pdc"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-3 text-lg font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-light hover:text-primary'}`
              }
            >
              Back Office
            </NavLink>
          )}
          <div className="px-6 py-3"><LanguageSwitcher /></div>
        </div>
      )}
    </nav>
  );
} 