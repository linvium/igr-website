"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Container } from "@/components/layout"
import { PageHeader, Breadcrumbs, FilterPills, EmptyState } from "@/components/shared"
import { routes, news, getFeaturedNews, type Language, type NewsCategory } from "@/lib"
import { formatDateShort } from "@/lib/format"
import type { FilterOption } from "@/components/shared/FilterPills"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface NewsListPageProps {
  lang: Language
}

const categoryOptions: FilterOption[] = [
  { value: "all", label: "Sve" },
  { value: "vesti", label: "Vesti" },
  { value: "dogadjaji", label: "Događaji" },
  { value: "istrazivanja", label: "Istraživanja" },
  { value: "edukacija", label: "Edukacija" },
  { value: "saradnja", label: "Saradnja" },
]

export function NewsListPage({ lang }: NewsListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const featured = getFeaturedNews()[0]
  const regularNews = news.filter((n) => !n.featured)

  const filteredNews = regularNews.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs lang={lang} items={[{ label: "Novosti" }]} />
      </div>

      <PageHeader
        title="Novosti"
        description="Pratite naše aktivnosti, događaje i postignuća u oblasti očuvanja genetičkih resursa."
      />

      {/* Featured News */}
      {featured && (
        <div className="py-8">
          <h2 className="font-serif text-2xl font-semibold mb-6">Istaknuto</h2>
          <Card className="group card-elevated overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-full">
                <Image src={featured.image} alt={featured.title} fill className="object-cover" />
              </div>
              <CardHeader className="p-8">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3 capitalize">
                  {featured.category}
                </span>
                <CardTitle className="text-2xl font-serif mb-3">{featured.title}</CardTitle>
                <CardDescription className="mb-4">{featured.excerpt}</CardDescription>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDateShort(featured.date)}</span>
                </div>
                <Button asChild>
                  <Link href={routes.news.detail(lang, featured.slug)}>Pročitaj više</Link>
                </Button>
              </CardHeader>
            </div>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="space-y-6 py-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pretraži novosti..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Kategorija</h3>
          <FilterPills
            options={categoryOptions}
            selected={selectedCategory === "all" ? [] : [selectedCategory]}
            onSelect={(value) => setSelectedCategory(value)}
          />
        </div>
      </div>

      {/* News List */}
      {filteredNews.length === 0 ? (
        <EmptyState
          title="Nema pronađenih novosti"
          description="Pokušajte da promenite filtere ili pretragu."
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {filteredNews.map((item) => (
            <Card key={item.id} className="group card-elevated overflow-hidden">
              <div className="relative h-48">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-2 capitalize">
                  {item.category}
                </span>
                <CardTitle className="font-serif group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription>{item.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDateShort(item.date)}</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={routes.news.detail(lang, item.slug)}>Pročitaj</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Container>
  )
}
