# Sanity CMS – Organizacija i Aktivnosti (orgActivitiesPage)

## Navigacija – dodavanje "Publikacije"

Da bi se opcija **Publikacije** pojavila u dropdown-u pri odabiru sekcije za navigaciju na stranici Organizacija i Aktivnosti, u CMS šemi treba dodati `publikacije` u listu validnih `sectionSlug` vrijednosti.

### Gdje ažurirati

U **orgActivitiesPage** šemi, u polju **navigationItems** (array of objects), svaki element ima:
- `label` – naslov stavke u navigaciji
- `sectionSlug` – slug sekcije (dropdown/list)

### Validne vrijednosti za sectionSlug

Dodaj **publikacije** u opcije za `sectionSlug`:

| Vrijednost | Label |
|------------|-------|
| `overview` | Pregled |
| `banka-gena` | Banka gena |
| `botanicka-basta` | Botanička bašta |
| `poljske-kolekcije` | Poljske kolekcije |
| `laboratorije` | Laboratorije |
| `zasticeno-podrucje` | Zaštićeno područje |
| **`publikacije`** | **Publikacije** |

### Primjer Sanity šeme (navigationItems)

```javascript
// U orgActivitiesPage šemi, navigationItems polje:
{
  name: 'navigationItems',
  title: 'Navigacijske stavke',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      {
        name: 'label',
        title: 'Naslov',
        type: 'localeString',
      },
      {
        name: 'sectionSlug',
        title: 'Sekcija',
        type: 'string',
        options: {
          list: [
            { title: 'Pregled', value: 'overview' },
            { title: 'Banka gena', value: 'banka-gena' },
            { title: 'Botanička bašta', value: 'botanicka-basta' },
            { title: 'Poljske kolekcije', value: 'poljske-kolekcije' },
            { title: 'Laboratorije', value: 'laboratorije' },
            { title: 'Zaštićeno područje', value: 'zasticeno-podrucje' },
            { title: 'Publikacije', value: 'publikacije' },  // ← DODATI
          ],
        },
      },
    ],
  }],
}
```

### overviewCards

Ako koristiš **overviewCards** (kartice na pregled stranici), u polju `sectionSlug` unutar overviewCards također dodaj opciju `publikacije`.

### publikacijeSection

U orgActivitiesPage šemi mora postojati i polje **publikacijeSection** (isto kao bankaGenSection, laboratorijeSection, itd.) sa:
- `titleLabel` (localeString)
- `shortDescription` (localeText)
- `content` (portable text)
