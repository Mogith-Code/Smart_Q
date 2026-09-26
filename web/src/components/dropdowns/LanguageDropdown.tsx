import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../i18n/translations';

interface LanguageDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageDropdown = ({ isOpen, onClose }: LanguageDropdownProps) => {
  const { language, setLanguage } = useLanguage();

  if (!isOpen) return null;

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ta', label: 'தமிழ் (Tamil)', flag: '🇱🇰' },
    { code: 'si', label: 'සිංහල (Sinhala)', flag: '🇱🇰' },
  ];

  return (
    <div className="dropdown-menu" style={{ width: '200px' }} onClick={(e) => e.stopPropagation()}>
      <div className="dropdown-header" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Globe size={14} color="var(--text-muted)" />
        <span>Select Language</span>
      </div>

      <div>
        {languages.map((item) => (
          <button
            key={item.code}
            className="dropdown-item"
            style={{
              fontWeight: language === item.code ? 700 : 400,
              backgroundColor: language === item.code ? 'var(--bg-app)' : 'transparent',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            onClick={() => {
              setLanguage(item.code);
              onClose();
            }}
          >
            <span>{item.flag} {item.label}</span>
            {language === item.code && <span style={{ color: 'var(--accent-teal)', fontSize: '12px' }}>✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
};
