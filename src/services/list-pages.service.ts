import { sanityClient, pickLocaleString, pickLocaleText } from '@/lib/sanity';
import type { Language } from '@/lib/lang';

type LocaleObj = { en?: string; sr?: string; srCyr?: string } | null;

function resolveText(obj: LocaleObj | null | undefined, lang: Language): string {
  return pickLocaleString(obj, lang) || '';
}

function resolveTextBlock(
  obj: { en?: string; sr?: string; srCyr?: string } | null | undefined,
  lang: Language,
): string {
  return pickLocaleText(obj, lang) || '';
}

// News list page
const NEWS_LIST_QUERY = `*[_id == "newsListPage"][0] {
  titleLabel->{ text },
  description,
  featuredLabel->{ text },
  searchPlaceholderLabel->{ text },
  allCategoryLabel->{ text },
  categoryFilterLabel->{ text },
  emptyTitleLabel->{ text },
  emptyDescriptionLabel->{ text },
  noImageLabel->{ text },
  readMoreButton->{ text },
  learnMoreButton->{ text },
  viewAllButton->{ text },
  backButton->{ text },
  externalLinkLabel->{ text },
  detailTagsLabel->{ text },
  detailPublishedLabel->{ text },
  detailRelatedLabel->{ text },
  categories[]->{ slug, name }
}`;

export interface NewsListPageConfig {
  title: string;
  description: string;
  featured: string;
  searchPlaceholder: string;
  allCategoryLabel: string;
  categoryFilterLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  noImageLabel: string;
  readMore: string;
  learnMore: string;
  viewAll: string;
  back: string;
  externalLinkLabel: string;
  detailTags: string;
  detailPublished: string;
  detailRelated: string;
  categories: { slug: string; name: string }[];
}

export async function getNewsListPageConfig(
  lang: Language,
): Promise<NewsListPageConfig> {
  const raw = await sanityClient.fetch<{
    titleLabel?: { text?: LocaleObj };
    description?: LocaleObj;
    featuredLabel?: { text?: LocaleObj };
    searchPlaceholderLabel?: { text?: LocaleObj };
    allCategoryLabel?: { text?: LocaleObj };
    categoryFilterLabel?: { text?: LocaleObj };
    emptyTitleLabel?: { text?: LocaleObj };
    emptyDescriptionLabel?: { text?: LocaleObj };
    noImageLabel?: { text?: LocaleObj };
    readMoreButton?: { text?: LocaleObj };
    learnMoreButton?: { text?: LocaleObj };
    viewAllButton?: { text?: LocaleObj };
    backButton?: { text?: LocaleObj };
    externalLinkLabel?: { text?: LocaleObj };
    detailTagsLabel?: { text?: LocaleObj };
    detailPublishedLabel?: { text?: LocaleObj };
    detailRelatedLabel?: { text?: LocaleObj };
    categories?: Array<{ slug?: string; name?: LocaleObj }>;
  } | null>(NEWS_LIST_QUERY);

  const categories =
    raw?.categories
      ?.map((c) => ({
        slug: c.slug || '',
        name: resolveText(c.name, lang),
      }))
      .filter((c) => c.slug) ?? [];

  return {
    title: raw?.titleLabel?.text
      ? resolveText(raw.titleLabel.text, lang)
      : '',
    description: raw?.description
      ? resolveTextBlock(raw.description, lang)
      : '',
    featured: raw?.featuredLabel?.text
      ? resolveText(raw.featuredLabel.text, lang)
      : '',
    searchPlaceholder: raw?.searchPlaceholderLabel?.text
      ? resolveText(raw.searchPlaceholderLabel.text, lang)
      : '',
    allCategoryLabel: raw?.allCategoryLabel?.text
      ? resolveText(raw.allCategoryLabel.text, lang)
      : '',
    categoryFilterLabel: raw?.categoryFilterLabel?.text
      ? resolveText(raw.categoryFilterLabel.text, lang)
      : 'Kategorija',
    emptyTitle: raw?.emptyTitleLabel?.text
      ? resolveText(raw.emptyTitleLabel.text, lang)
      : '',
    emptyDescription: raw?.emptyDescriptionLabel?.text
      ? resolveText(raw.emptyDescriptionLabel.text, lang)
      : '',
    noImageLabel: raw?.noImageLabel?.text
      ? resolveText(raw.noImageLabel.text, lang)
      : '',
    readMore: raw?.readMoreButton?.text
      ? resolveText(raw.readMoreButton.text, lang)
      : '',
    learnMore: raw?.learnMoreButton?.text
      ? resolveText(raw.learnMoreButton.text, lang)
      : '',
    viewAll: raw?.viewAllButton?.text
      ? resolveText(raw.viewAllButton.text, lang)
      : '',
    back: raw?.backButton?.text ? resolveText(raw.backButton.text, lang) : '',
    externalLinkLabel: raw?.externalLinkLabel?.text
      ? resolveText(raw.externalLinkLabel.text, lang)
      : 'Tekst linka:',
    detailTags: raw?.detailTagsLabel?.text
      ? resolveText(raw.detailTagsLabel.text, lang)
      : '',
    detailPublished: raw?.detailPublishedLabel?.text
      ? resolveText(raw.detailPublishedLabel.text, lang)
      : '',
    detailRelated: raw?.detailRelatedLabel?.text
      ? resolveText(raw.detailRelatedLabel.text, lang)
      : '',
    categories:
      categories.length > 0
        ? categories
        : [],
  };
}

// Centers list page
const CENTERS_LIST_QUERY = `*[_id == "centersListPage"][0] {
  titleLabel->{ text },
  description,
  learnMoreButton->{ text },
  backButton->{ text },
  detailDirectorLabel->{ text },
  detailLocationLabel->{ text },
  detailEstablishedLabel->{ text },
  detailCategoryLabel->{ text },
  detailRelatedLabel->{ text }
}`;

export interface CentersListPageConfig {
  title: string;
  description: string;
  learnMore: string;
  back: string;
  detailDirector: string;
  detailLocation: string;
  detailEstablished: string;
  detailCategory: string;
  detailRelated: string;
}

export async function getCentersListPageConfig(
  lang: Language,
): Promise<CentersListPageConfig> {
  const raw = await sanityClient.fetch<{
    titleLabel?: { text?: LocaleObj };
    description?: LocaleObj;
    learnMoreButton?: { text?: LocaleObj };
    backButton?: { text?: LocaleObj };
    detailDirectorLabel?: { text?: LocaleObj };
    detailLocationLabel?: { text?: LocaleObj };
    detailEstablishedLabel?: { text?: LocaleObj };
    detailCategoryLabel?: { text?: LocaleObj };
    detailRelatedLabel?: { text?: LocaleObj };
  } | null>(CENTERS_LIST_QUERY);

  return {
    title: raw?.titleLabel?.text ? resolveText(raw.titleLabel.text, lang) : '',
    description: raw?.description ? resolveTextBlock(raw.description, lang) : '',
    learnMore: raw?.learnMoreButton?.text
      ? resolveText(raw.learnMoreButton.text, lang)
      : '',
    back: raw?.backButton?.text ? resolveText(raw.backButton.text, lang) : '',
    detailDirector: raw?.detailDirectorLabel?.text
      ? resolveText(raw.detailDirectorLabel.text, lang)
      : '',
    detailLocation: raw?.detailLocationLabel?.text
      ? resolveText(raw.detailLocationLabel.text, lang)
      : '',
    detailEstablished: raw?.detailEstablishedLabel?.text
      ? resolveText(raw.detailEstablishedLabel.text, lang)
      : '',
    detailCategory: raw?.detailCategoryLabel?.text
      ? resolveText(raw.detailCategoryLabel.text, lang)
      : '',
    detailRelated: raw?.detailRelatedLabel?.text
      ? resolveText(raw.detailRelatedLabel.text, lang)
      : '',
  };
}

// Projects list page
const PROJECTS_LIST_QUERY = `*[_id == "projectsListPage"][0] {
  titleLabel->{ text },
  description,
  searchPlaceholderLabel->{ text },
  allFilterLabel->{ text },
  categoryFilterLabel->{ text },
  statusFilterLabel->{ text },
  emptyTitleLabel->{ text },
  emptyDescriptionLabel->{ text },
  detailsButton->{ text },
  backButton->{ text },
  detailCategoryLabel->{ text },
  detailStatusLabel->{ text },
  detailYearLabel->{ text },
  detailTagsLabel->{ text },
  detailRelatedLabel->{ text },
  learnMoreButton->{ text },
  noImageLabel->{ text },
  categoryCategories[]->{ slug, name },
  statusCategories[]->{ slug, name }
}`;

export interface ProjectsListPageConfig {
  title: string;
  description: string;
  searchPlaceholder: string;
  allFilterLabel: string;
  categoryFilterLabel: string;
  statusFilterLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  detailsButton: string;
  back: string;
  detailCategory: string;
  detailStatus: string;
  detailYear: string;
  detailTags: string;
  detailRelated: string;
  learnMore: string;
  noImageLabel: string;
  categoryCategories: { slug: string; name: string }[];
  statusCategories: { slug: string; name: string }[];
}

export async function getProjectsListPageConfig(
  lang: Language,
): Promise<ProjectsListPageConfig> {
  const raw = await sanityClient.fetch<{
    titleLabel?: { text?: LocaleObj };
    description?: LocaleObj;
    searchPlaceholderLabel?: { text?: LocaleObj };
    allFilterLabel?: { text?: LocaleObj };
    categoryFilterLabel?: { text?: LocaleObj };
    statusFilterLabel?: { text?: LocaleObj };
    emptyTitleLabel?: { text?: LocaleObj };
    emptyDescriptionLabel?: { text?: LocaleObj };
    detailsButton?: { text?: LocaleObj };
    backButton?: { text?: LocaleObj };
    detailCategoryLabel?: { text?: LocaleObj };
    detailStatusLabel?: { text?: LocaleObj };
    detailYearLabel?: { text?: LocaleObj };
    detailTagsLabel?: { text?: LocaleObj };
    detailRelatedLabel?: { text?: LocaleObj };
    learnMoreButton?: { text?: LocaleObj };
    noImageLabel?: { text?: LocaleObj };
    categoryCategories?: Array<{ slug?: string; name?: LocaleObj }>;
    statusCategories?: Array<{ slug?: string; name?: LocaleObj }>;
  } | null>(PROJECTS_LIST_QUERY);

  const categoryCategories =
    raw?.categoryCategories?.map((c) => ({
      slug: c.slug || '',
      name: resolveText(c.name, lang),
    })) ?? [];

  const statusCategories =
    raw?.statusCategories?.map((c) => ({
      slug: c.slug || '',
      name: resolveText(c.name, lang),
    })) ?? [];

  return {
    title: raw?.titleLabel?.text
      ? resolveText(raw.titleLabel.text, lang)
      : '',
    description: raw?.description ? resolveTextBlock(raw.description, lang) : '',
    searchPlaceholder: raw?.searchPlaceholderLabel?.text
      ? resolveText(raw.searchPlaceholderLabel.text, lang)
      : '',
    allFilterLabel: raw?.allFilterLabel?.text
      ? resolveText(raw.allFilterLabel.text, lang)
      : '',
    categoryFilterLabel: raw?.categoryFilterLabel?.text
      ? resolveText(raw.categoryFilterLabel.text, lang)
      : 'Kategorija',
    statusFilterLabel: raw?.statusFilterLabel?.text
      ? resolveText(raw.statusFilterLabel.text, lang)
      : 'Status',
    emptyTitle: raw?.emptyTitleLabel?.text
      ? resolveText(raw.emptyTitleLabel.text, lang)
      : '',
    emptyDescription: raw?.emptyDescriptionLabel?.text
      ? resolveText(raw.emptyDescriptionLabel.text, lang)
      : '',
    detailsButton: raw?.detailsButton?.text
      ? resolveText(raw.detailsButton.text, lang)
      : '',
    back: raw?.backButton?.text ? resolveText(raw.backButton.text, lang) : '',
    detailCategory: raw?.detailCategoryLabel?.text
      ? resolveText(raw.detailCategoryLabel.text, lang)
      : '',
    detailStatus: raw?.detailStatusLabel?.text
      ? resolveText(raw.detailStatusLabel.text, lang)
      : '',
    detailYear: raw?.detailYearLabel?.text
      ? resolveText(raw.detailYearLabel.text, lang)
      : '',
    detailTags: raw?.detailTagsLabel?.text
      ? resolveText(raw.detailTagsLabel.text, lang)
      : '',
    detailRelated: raw?.detailRelatedLabel?.text
      ? resolveText(raw.detailRelatedLabel.text, lang)
      : '',
    learnMore: raw?.learnMoreButton?.text
      ? resolveText(raw.learnMoreButton.text, lang)
      : '',
    noImageLabel: raw?.noImageLabel?.text
      ? resolveText(raw.noImageLabel.text, lang)
      : 'Nema slike',
    categoryCategories,
    statusCategories,
  };
}

// Gallery list page
const GALLERY_LIST_QUERY = `*[_id == "galleryListPage"][0] {
  titleLabel->{ text },
  description,
  viewAlbumButton->{ text },
  backButton->{ text },
  allCategoryLabel->{ text },
  emptyTitleLabel->{ text },
  emptyDescriptionLabel->{ text },
  categories[]->{ slug, name }
}`;

export interface GalleryListPageConfig {
  title: string;
  description: string;
  viewAlbum: string;
  back: string;
  allCategoryLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  categories: { slug: string; name: string }[];
}

export async function getGalleryListPageConfig(
  lang: Language,
): Promise<GalleryListPageConfig> {
  const raw = await sanityClient.fetch<{
    titleLabel?: { text?: LocaleObj };
    description?: LocaleObj;
    viewAlbumButton?: { text?: LocaleObj };
    backButton?: { text?: LocaleObj };
    allCategoryLabel?: { text?: LocaleObj };
    emptyTitleLabel?: { text?: LocaleObj };
    emptyDescriptionLabel?: { text?: LocaleObj };
    categories?: Array<{ slug?: string; name?: LocaleObj }>;
  } | null>(GALLERY_LIST_QUERY);

  const categories =
    raw?.categories?.map((c) => ({
      slug: c.slug || '',
      name: resolveText(c.name, lang),
    })) ?? [];

  return {
    title: raw?.titleLabel?.text
      ? resolveText(raw.titleLabel.text, lang)
      : '',
    description: raw?.description ? resolveTextBlock(raw.description, lang) : '',
    viewAlbum: raw?.viewAlbumButton?.text
      ? resolveText(raw.viewAlbumButton.text, lang)
      : '',
    back: raw?.backButton?.text ? resolveText(raw.backButton.text, lang) : '',
    allCategoryLabel: raw?.allCategoryLabel?.text
      ? resolveText(raw.allCategoryLabel.text, lang)
      : '',
    emptyTitle: raw?.emptyTitleLabel?.text
      ? resolveText(raw.emptyTitleLabel.text, lang)
      : '',
    emptyDescription: raw?.emptyDescriptionLabel?.text
      ? resolveText(raw.emptyDescriptionLabel.text, lang)
      : '',
    categories,
  };
}

// Contact page
const CONTACT_PAGE_QUERY = `*[_id == "contactPage"][0] {
  titleLabel->{ text },
  description,
  addressLabel->{ text },
  phoneLabel->{ text },
  emailLabel->{ text },
  workingHoursLabel->{ text },
  workingHours,
  formTitleLabel->{ text },
  nameLabel->{ text },
  namePlaceholder->{ text },
  emailFieldLabel->{ text },
  emailPlaceholder->{ text },
  subjectLabel->{ text },
  subjectPlaceholder->{ text },
  messageLabel->{ text },
  messagePlaceholder->{ text },
  submitButton->{ text }
}`;

export interface ContactPageConfig {
  title: string;
  description: string;
  addressLabel: string;
  phoneLabel: string;
  emailLabel: string;
  workingHoursLabel: string;
  workingHours: string;
  formTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  formEmailLabel: string;
  emailPlaceholder: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitButton: string;
}

export async function getContactPageConfig(
  lang: Language,
): Promise<ContactPageConfig> {
  const raw = await sanityClient.fetch<{
    titleLabel?: { text?: LocaleObj };
    description?: LocaleObj;
    addressLabel?: { text?: LocaleObj };
    phoneLabel?: { text?: LocaleObj };
    emailLabel?: { text?: LocaleObj };
    workingHoursLabel?: { text?: LocaleObj };
    workingHours?: LocaleObj;
    formTitleLabel?: { text?: LocaleObj };
    nameLabel?: { text?: LocaleObj };
    namePlaceholder?: { text?: LocaleObj };
    emailFieldLabel?: { text?: LocaleObj };
    emailPlaceholder?: { text?: LocaleObj };
    subjectLabel?: { text?: LocaleObj };
    subjectPlaceholder?: { text?: LocaleObj };
    messageLabel?: { text?: LocaleObj };
    messagePlaceholder?: { text?: LocaleObj };
    submitButton?: { text?: LocaleObj };
  } | null>(CONTACT_PAGE_QUERY);

  return {
    title: raw?.titleLabel?.text
      ? resolveText(raw.titleLabel.text, lang)
      : 'Kontakt',
    description: raw?.description
      ? resolveTextBlock(raw.description, lang)
      : 'Imate pitanja ili želite saradnju? Javite nam se.',
    addressLabel: raw?.addressLabel?.text
      ? resolveText(raw.addressLabel.text, lang)
      : 'Adresa',
    phoneLabel: raw?.phoneLabel?.text
      ? resolveText(raw.phoneLabel.text, lang)
      : 'Telefon',
    emailLabel: raw?.emailLabel?.text
      ? resolveText(raw.emailLabel.text, lang)
      : 'E-mail',
    workingHoursLabel: raw?.workingHoursLabel?.text
      ? resolveText(raw.workingHoursLabel.text, lang)
      : 'Radno vrijeme',
    workingHours: raw?.workingHours
      ? resolveTextBlock(raw.workingHours, lang)
      : 'Pon - Pet: 08:00 - 16:00\nSub - Ned: Zatvoreno',
    formTitle: raw?.formTitleLabel?.text
      ? resolveText(raw.formTitleLabel.text, lang)
      : 'Pošaljite poruku',
    nameLabel: raw?.nameLabel?.text
      ? resolveText(raw.nameLabel.text, lang)
      : 'Ime i prezime',
    namePlaceholder: raw?.namePlaceholder?.text
      ? resolveText(raw.namePlaceholder.text, lang)
      : 'Vaše ime',
    formEmailLabel: raw?.emailFieldLabel?.text
      ? resolveText(raw.emailFieldLabel.text, lang)
      : 'E-mail',
    emailPlaceholder: raw?.emailPlaceholder?.text
      ? resolveText(raw.emailPlaceholder.text, lang)
      : 'vasa@email.com',
    subjectLabel: raw?.subjectLabel?.text
      ? resolveText(raw.subjectLabel.text, lang)
      : 'Predmet',
    subjectPlaceholder: raw?.subjectPlaceholder?.text
      ? resolveText(raw.subjectPlaceholder.text, lang)
      : 'Predmet poruke',
    messageLabel: raw?.messageLabel?.text
      ? resolveText(raw.messageLabel.text, lang)
      : 'Poruka',
    messagePlaceholder: raw?.messagePlaceholder?.text
      ? resolveText(raw.messagePlaceholder.text, lang)
      : 'Vaša poruka...',
    submitButton: raw?.submitButton?.text
      ? resolveText(raw.submitButton.text, lang)
      : 'Pošalji poruku',
  };
}
