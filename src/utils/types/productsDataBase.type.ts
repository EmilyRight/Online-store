import ProductCardType from './productCard.type'

export default interface ProductsDataBase {
  products: ProductCardType[]
  total: number
  skip: number
  limit: number
}
