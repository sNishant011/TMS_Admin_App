export type Package = {
  id: number
  title: string
  slug: string
  thumbnail_Image: string
  image: File | string
  no_of_days: number
  summary: string
  full_detail: string
  is_active: boolean
  is_featured: boolean
  price: number
}
export type UploadPackage = {
  title: string
  image: File | string
  no_of_days: number
  slug: string
  summary: string
  full_detail: string
  is_active: boolean
  is_featured: boolean
  price: number
}
