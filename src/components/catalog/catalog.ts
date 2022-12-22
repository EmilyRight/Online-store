
import ProductsDataBase from '../../utils/types/productsDataBase.type'
import ProductCard from '../productCard/productCard'
import './catalog'
export default class Catalog {
  productsObj: ProductsDataBase
  private readonly WRAPPER = 'catalog .wrapper'
  private readonly CLASS_PRODUCT_CARD = 'product-card'

  constructor (productsObj: ProductsDataBase) {
    this.productsObj = productsObj
  }

  renderCardsArray (): void {
    const productsArray = this.productsObj.products
    for (let i = 0; i < productsArray.length; i++) {
      const card = new ProductCard(productsArray[i])
      const wrapper = document.querySelector('.' + this.WRAPPER)
      if (wrapper !== null) {
        wrapper.append(card.renderCard())
      }
    }
  }
}
