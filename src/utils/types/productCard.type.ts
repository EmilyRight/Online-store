import ProductCategory from '../enums/productCategory.enum'

export default interface ProductCard {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: ProductCategory
  thumbnail: string
  images: string[]
}
