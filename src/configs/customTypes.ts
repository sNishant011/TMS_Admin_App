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
  start_day: string | null
  end_day: string | null
  price: number
}
export type PackageSummaryType = {
  id: number
  title:string
  slug: string
  no_of_days: number
  start_day: string | null
  end_day: string | null
  is_active: boolean
  price: number
}
export type EditPackageType = {
  title: string
  image: File | string
  no_of_days: number
  slug: string
  summary: string
  full_detail: string
  is_active: boolean
  is_featured: boolean
  price: number
  start_day: string | null
  end_day: string | null
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
  start_day: String | null
  end_day: String | null
}

export type BlogType = {
  id: number
  title: string
  subtitle: string
  slug: string
  description: string
  date: Date | null
  image: File | string
  thumbnail_Image: string
  is_published: boolean | false
}
export type BlogUploadType = {
  title: string
  subtitle: string
  slug: string
  image: File | string
  description: string
  is_published: boolean | false
}
export type UserType = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone_number: number
  active: boolean
}

export type BookingType = {
  booked_user: UserType,
  for_user: string,
  message: string,
  booked_package: PackageSummaryType,
}