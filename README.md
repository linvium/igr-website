# Institut za Genetičke Resurse - Web Portal

A modern, production-ready web portal for the Institute of Genetic Resources, built with Next.js 15, TypeScript, and a senior-level architecture designed for scalability and future CMS integration.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🌟 Features

### Core Functionality
- **Multi-language Support** - Serbian (Latin) and English
- **News & Updates** - Dynamic news system with featured articles
- **Research Centers** - Showcase of genetic research facilities
- **Projects** - Comprehensive project portfolio with filtering
- **Gallery** - Photo albums with lightbox viewer
- **Contact** - Contact information and inquiry form

### Technical Highlights
- ✅ **Senior-Level Architecture** - Repository pattern, data source abstraction
- ✅ **Type-Safe** - Full TypeScript coverage with centralized types
- ✅ **SEO Optimized** - Structured data, sitemap, meta tags
- ✅ **Performance** - In-memory caching, loading skeletons, optimized images
- ✅ **Error Handling** - Global error boundaries, custom 404 page
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
- ✅ **CMS-Ready** - Architecture designed for easy Sanity CMS migration

## 🏗️ Architecture

### Project Structure

```
src/
├── app/                      # Next.js 15 App Router
│   ├── [lang]/              # Internationalized routes
│   ├── layout.tsx           # Root layout with SEO
│   ├── sitemap.ts           # XML sitemap generation
│   └── robots.ts            # Robots.txt configuration
├── components/              # Reusable UI components
│   ├── layout/             # Header, Footer, Container
│   ├── shared/             # Breadcrumbs, PageHeader, etc.
│   ├── skeletons/          # Loading states (7 components)
│   └── ui/                 # shadcn/ui components
├── features/               # Feature-based modules
│   ├── news/              # News feature
│   ├── centers/           # Centers feature
│   ├── projects/          # Projects feature
│   ├── gallery/           # Gallery feature
│   ├── contact/           # Contact feature
│   ├── about/             # About feature
│   └── home/              # Home page sections
├── repositories/          # Business logic layer
│   ├── news.repository.ts
│   ├── centers.repository.ts
│   ├── projects.repository.ts
│   ├── gallery.repository.ts
│   └── factory.ts         # Repository factory (singleton)
├── data-sources/          # Data access layer
│   ├── types.ts           # DataSource interface
│   └── static/            # Static data sources (MVP)
├── translations/          # Domain-based translations
│   └── sr-lat/            # Serbian Latin translations
├── types/                 # Centralized type definitions
│   └── models/            # Domain models
├── lib/                   # Utilities and helpers
│   ├── cache.ts           # Caching layer
│   ├── seo-metadata.ts    # SEO helpers
│   ├── routes.ts          # Type-safe routing
│   └── format.ts          # Formatting utilities
└── styles/                # Global styles
    └── globals.css        # Tailwind + custom styles
```

### Design Patterns

#### 1. Repository Pattern
Separates business logic from data access:
```typescript
// Components use repositories, not data directly
const repository = getNewsRepository()
const news = await repository.findAll()
```

#### 2. Data Source Abstraction
Easy to swap data sources (Static → Sanity CMS):
```typescript
// Factory pattern for dependency injection
export function getNewsRepository(): NewsRepository {
  // Change only this line to switch to Sanity
  return new NewsRepository(new StaticNewsDataSource())
}
```

#### 3. Domain-Based Translations
Organized by feature, not by language:
```typescript
const { t } = useTranslations('news')
t('title')           // "Novosti"
t('detail.author')   // "Autor"
```

#### 4. Caching Layer
In-memory cache with TTL:
```typescript
// Automatic caching with helper
const data = await withCache('key', async () => {
  return await fetchData()
}, 5 * 60 * 1000) // 5 minutes
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-org/genetics-institute-portal.git
cd genetics-institute-portal
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 📦 Tech Stack

### Core
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[React 19](https://react.dev/)** - UI library

### Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[Lucide Icons](https://lucide.dev/)** - Icon library

### Development
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## 🎨 Design System

### Colors
- **Primary**: Green (genetic/nature theme)
- **Background**: White/Light gray
- **Foreground**: Dark gray/Black
- **Muted**: Light gray for secondary content

### Typography
- **Headings**: Serif font (elegant, professional)
- **Body**: Inter (clean, readable)

### Components
All components follow:
- Mobile-first responsive design
- Accessibility best practices
- Consistent spacing (Tailwind scale)
- Hover/focus states
- Loading states

## 🔍 SEO & Performance

### SEO Features
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD)
  - Organization schema
  - Article schema
  - Breadcrumb schema
- ✅ XML Sitemap (`/sitemap.xml`)
- ✅ Robots.txt (`/robots.txt`)
- ✅ Canonical URLs
- ✅ Language alternates

### Performance Optimizations
- ✅ In-memory caching (5-minute TTL)
- ✅ Image optimization (Next.js Image)
- ✅ Code splitting (automatic)
- ✅ Font optimization (next/font)
- ✅ Loading skeletons (7 components)
- ✅ Lazy loading
- ✅ Bundle optimization

### Expected Scores
- **SEO**: 90-95/100
- **Performance**: 90-95/100
- **Accessibility**: 95-100/100
- **Best Practices**: 95-100/100

## 🗺️ Roadmap

### Phase 1: MVP ✅ (Complete)
- [x] Core architecture
- [x] All features implemented
- [x] SEO optimization
- [x] Performance optimization
- [x] Error handling
- [x] Loading states

### Phase 2: CMS Integration (Next)
- [ ] Sanity CMS setup
- [ ] Schema definitions
- [ ] Sanity data sources
- [ ] Content migration
- [ ] Admin panel setup

### Phase 3: Enhancements
- [ ] User authentication
- [ ] Newsletter subscription
- [ ] Advanced search
- [ ] Analytics dashboard
- [ ] A/B testing

### Phase 4: Advanced Features
- [ ] Multi-language CMS content
- [ ] Advanced filtering
- [ ] Interactive maps
- [ ] Data visualizations
- [ ] API endpoints

## 🧪 Testing

### Current Status
- Manual testing: ✅ Complete
- Build verification: ✅ Passing
- TypeScript: ✅ No errors
- Linting: ✅ No errors

### Future Testing
- [ ] Unit tests (Jest + React Testing Library)
- [ ] Integration tests
- [ ] E2E tests (Playwright)
- [ ] Visual regression tests

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Write self-documenting code
- Add comments for complex logic
- Follow the existing architecture patterns

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Institut za Genetičke Resurse**
- Website: [institut-genetika.rs](https://institut-genetika.rs)
- Email: info@institut-genetika.rs

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vercel](https://vercel.com/) for hosting platform

## 📞 Support

For support, email info@institut-genetika.rs or open an issue in the repository.

---

**Built with ❤️ for genetic research and biodiversity conservation**
