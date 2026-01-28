// Generic data source interface
// This abstraction allows us to swap between static data and Sanity CMS
// without changing any business logic or components
export interface DataSource<T> {
  getAll(): Promise<T[]>
  getById(id: string): Promise<T | null>
  getBySlug(slug: string): Promise<T | null>
}
