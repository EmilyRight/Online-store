import { CartClasses } from '../../utils/enums/cartClasses'
import { CartEvents } from '../../utils/enums/cartEvents'
import ProductCardType from '../../utils/types/productCard.type'
import CartView from '../views/cart.view'
import { ProductInCart } from '../views/productInCart.view'

export default class Cart {
  private readonly cardsInCart = new Map<ProductCardType, Element>()
  private readonly number = this.cardsInCart.size
  // private readonly renderedCart
  constructor () {
    document.addEventListener(CartEvents.ADD_TO_CART, (event) => {
      const customEvent = event as CustomEvent
      this.cardsInCart.set(customEvent.detail.item, this.renderAddedItem(customEvent.detail.item))
    })
    document.addEventListener(CartEvents.OPEN_CART, (event) => {
      const main = document.querySelector('main')
      if (main != null) {
        const renderedCart = new CartView().renderCart()
        main.innerHTML = ''
        main?.append(renderedCart)
        const cardsBlock = document.querySelector(CartClasses.CLASS_CART_PRODUCTS_BLOCK)
        console.log('wtf', cardsBlock, this.cardsInCart)

        Array.from(this.cardsInCart.keys()).forEach((item) => {
          const itemToAppend = this.renderAddedItem(item)
          cardsBlock?.append(itemToAppend)
        })

        console.log('wtf', renderedCart, main, Array.from(this.cardsInCart.keys()))
      }
    })
  }

  renderAddedItem (item: ProductCardType): Element {
    const productItem = new ProductInCart(item).renderProductInCart()
    return productItem
  }

  // renderCart (): Element {
  //   const cart = this.renderedCart
  //   const cardsBlock = document.querySelector(CartClasses.CLASS_CART_PRODUCTS_BLOCK)
  //   console.log('wtf', cart, cardsBlock, this.cardsInCart)

  //   if (cart != null) {
  //     Array.from(this.cardsInCart.keys()).forEach((item) => {
  //       const itemToAppend = this.renderAddedItem(item)
  //       cardsBlock?.append(itemToAppend)
  //     })
  //   }
  //   return cart
  // }
}
