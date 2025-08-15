import { useTranslation } from 'react-i18next';
import TeamSection from '../components/TeamSection';

export default function Team() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#18122B] via-[#7c3aed] to-[#2563eb] flex flex-col justify-center items-center">
      <TeamSection t={t} />
    </div>
  );
} 