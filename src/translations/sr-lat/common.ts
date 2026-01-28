// Common translations used across the application
// This structure will map to Sanity "translation" documents in the future
export const common = {
  actions: {
    readMore: 'Pročitaj više',
    learnMore: 'Saznaj više',
    viewAll: 'Pogledaj sve',
    back: 'Nazad',
    next: 'Sledeće',
    previous: 'Prethodno',
    search: 'Pretraži',
    filter: 'Filtriraj',
    close: 'Zatvori',
    open: 'Otvori',
    submit: 'Pošalji',
    cancel: 'Otkaži',
    save: 'Sačuvaj',
    delete: 'Obriši',
    edit: 'Izmeni',
  },
  navigation: {
    home: 'Početna',
    about: 'O Institutu',
    centers: 'Centri',
    projects: 'Projekti',
    news: 'Novosti',
    gallery: 'Galerija',
    contact: 'Kontakt',
  },
  footer: {
    copyright: '© {year} Institut za Genetičke Resurse. Sva prava zadržana.',
    followUs: 'Pratite nas',
    quickLinks: 'Brzi linkovi',
    contactInfo: 'Kontakt informacije',
  },
  errors: {
    notFound: 'Stranica nije pronađena',
    serverError: 'Greška na serveru',
    tryAgain: 'Pokušajte ponovo',
    goHome: 'Idite na početnu',
  },
} as const
