'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { SiteSettings } from '@/services/site-settings.service';

const SiteSettingsContext = createContext<SiteSettings | null>(null);

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettings | null;
  children: ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

const DEFAULT_NAVBAR = [
  { label: 'O Institutu', href: '/' },
  { label: 'Centri', href: '/' },
  { label: 'Projekti', href: '/' },
  { label: 'Novosti', href: '/' },
  { label: 'Galerija', href: '/' },
  { label: 'Kontakt', href: '/' },
];

const DEFAULT_FOOTER = {
  institut: {
    title: 'Institut',
    links: [
      { label: 'O nama', href: '/' },
      { label: 'Tim', href: '/' },
      { label: 'Partneri', href: '/' },
      { label: 'Karijera', href: '/' },
    ],
  },
  centri: {
    title: 'Centri',
    links: [
      { label: 'Centar za biodiverzitet', href: '/' },
      { label: 'Banka gena', href: '/' },
      { label: 'Botanička bašta', href: '/' },
      { label: 'Rasadnik', href: '/' },
    ],
  },
  resursi: {
    title: 'Resursi',
    links: [
      { label: 'Projekti', href: '/' },
      { label: 'Publikacije', href: '/' },
      { label: 'Galerija', href: '/' },
      { label: 'Novosti', href: '/' },
    ],
  },
};

export function useSiteSettings(): SiteSettings {
  const settings = useContext(SiteSettingsContext);
  if (!settings) {
    return {
      name: 'Institut za Genetičke Resurse',
      shortName: '',
      description: '',
      url: '',
      logo: '/logo.svg',
      navbar: DEFAULT_NAVBAR,
      footer: DEFAULT_FOOTER,
      social: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
      },
      contact: {
        email: '',
        phone: '',
        address: '',
      },
      errorMessages: {
        notFoundTitle: 'Stranica nije pronađena',
        notFoundDescription:
          'Stranica koju tražite ne postoji ili je premještena.',
        notFoundHomeButton: 'Vrati se na početnu',
        errorTitle: 'Nešto je pošlo po zlu',
        errorDescription:
          'Došlo je do neočekivane greške. Molimo pokušajte ponovo ili se vratite na početnu stranicu.',
        errorRetryButton: 'Pokušaj ponovo',
        errorHomeButton: 'Početna stranica',
      },
    };
  }
  return settings;
}
