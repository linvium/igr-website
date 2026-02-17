'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  supportedLanguages,
  languageNames,
  type Language,
  getLanguage,
} from '@/lib/lang';

export function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = getLanguage(pathname.split('/')[1] as Language);

  const handleLanguageChange = (newLang: string) => {
    const segments = pathname.split('/').filter(Boolean);
    segments[0] = newLang;
    router.push(`/${segments.join('/')}`);
  };

  return (
    <Select value={currentLang} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px] h-9 gap-1.5 text-left [&>span]:min-w-0 [&>span]:flex-1 [&>span]:text-left">
        <Globe className="h-4 w-4 shrink-0" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {supportedLanguages.map((lang) => (
          <SelectItem key={lang} value={lang}>
            {languageNames[lang]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
