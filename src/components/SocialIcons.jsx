import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { FaFacebookF, FaInstagram, FaTwitter, FaDiscord, FaTiktok } from 'react-icons/fa';

export default function SocialIcons() {
  return (
    <div className="flex gap-4">
      <a href="https://www.instagram.com/upradiospeak/"   rel="noopener noreferrer" target="_blank" className="text-light hover:text-primary transition" aria-label="Instagram"><FaInstagram size={22} /></a>
      <a href="https://discord.gg/SKR3wZTV" rel="noopener noreferrer" target="_blank" className="text-light hover:text-primary transition" aria-label="Discord"><FaDiscord size={22} /></a>
      <a href="https://www.tiktok.com/@speak_up035?_t=ZM-8xcA8AX7vMs&_r=1" rel="noopener noreferrer" target="_blank" className="text-light hover:text-primary transition" aria-label="TikTok"><FaTiktok size={22} /></a>
    </div>
  );
} 