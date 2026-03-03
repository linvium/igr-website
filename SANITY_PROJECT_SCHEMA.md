# Sanity CMS – šema za projekte (linkovi i PDF dokumenti)

U CMS-u (genetics-institute-cms) treba dodati sledeća polja u **project** šemu, isto kao na novostima.

## 1. Polja za link

- **externalLink** (string, optional) – URL eksternog linka
- **externalLinkLabel** (localeString, optional) – label za link (npr. "Saznaj više:")

## 2. Polja za PDF dokumente

- **documents** (array, optional) – lista PDF dokumenata
  - Svaki element: **projectDocument** (object)
    - **titleLabel** (localeString) – naslov/tekst za PDF (npr. "Izveštaj projekta")
    - **file** (file) – PDF fajl
    - **showOnPublications** (boolean, optional) – ako je označeno, PDF se prikazuje na stranici Publikacije
- **documentsLabel** (localeString, optional) – naslov sekcije dokumenata (npr. "Dokumenti za preuzimanje")

## 3. Primer šeme (Sanity v3)

```javascript
// projectDocument.js – novi tip za dokumente
export default {
  name: 'projectDocument',
  title: 'Dokument projekta',
  type: 'object',
  fields: [
    {
      name: 'titleLabel',
      title: 'Naslov dokumenta',
      type: 'localeString',
    },
    {
      name: 'file',
      title: 'PDF fajl',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    },
    {
      name: 'showOnPublications',
      title: 'Dodaj na Publikacije',
      type: 'boolean',
      description: 'Ako je označeno, ovaj PDF će se prikazati na stranici Publikacije',
      initialValue: false,
    },
  ],
  preview: {
    select: { title: 'titleLabel.sr' },
    prepare: ({ title }) => ({ title: title || 'Dokument' }),
  },
};
```

U **project** šemi dodati:

```javascript
{
  name: 'externalLink',
  title: 'Eksterni link',
  type: 'url',
  description: 'Opcioni link (otvara se u novom tabu)',
},
{
  name: 'externalLinkLabel',
  title: 'Label za link',
  type: 'localeString',
  description: 'Npr. "Saznaj više:"',
},
{
  name: 'documents',
  title: 'PDF dokumenti',
  type: 'array',
  of: [{ type: 'projectDocument' }],
  description: 'Opcioni PDF dokumenti za preuzimanje',
},
{
  name: 'documentsLabel',
  title: 'Naslov sekcije dokumenata',
  type: 'localeString',
  description: 'Npr. "Dokumenti za preuzimanje"',
},
```

## 4. Projekti list page (projectsListPage)

U singleton-u **projectsListPage** dodati default labele (kao na news list page):

- **externalLinkLabel** (reference na localeString) – default label za link
- **documentsLabel** (reference na localeString) – default label za dokumente

## 5. Struktura u GROQ-u

Portal očekuje:

- `externalLink` – string
- `externalLinkLabel` – `{ en?, sr?, srCyr? }` ili `{ text: { en?, sr?, srCyr? } }` (zavisno od localeString tipa)
- `documents[]` – `{ titleLabel: { en?, sr?, srCyr? }, fileUrl: file.asset->url, showOnPublications?: boolean }`
- `documentsLabel` – `{ en?, sr?, srCyr? }`

Portal već koristi `pickLocaleString` za sva ova polja.
