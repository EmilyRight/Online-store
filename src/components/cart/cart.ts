/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { CartClasses } from '../../utils/enums/cartClasses'
import { CartEvents } from '../../utils/enums/cartEvents'
import { EProductInCart } from '../../utils/enums/productInCart'
import ProductCardType from '../../utils/types/productCard.type'
import CartView from '../views/cart.view'
import { ProductInCart } from '../views/productInCart.view'
import './cart'

export default class Cart {
  // private readonly cardsInCart = new Map<ProductCardType, number>()
  private readonly cardsInCart = new Map<ProductCardType, Element>()
  private readonly number = this.cardsInCart.size
  private prevSumHTML: Element | null
  private currentSumHTML: Element | null
  private totalQuantityHTML: Element | null
  private cardsBlock: Element | null
  private readonly promoInput: Element | null
  private indexCounter = 0 // порядковый номер элемента в корзине
  private totalSum: number
  private discount: number
  private discountedSum: number
  private totalQuantity: number // общее количество итемов?
  constructor () {
    this.totalSum = 0
    this.totalQuantity = 0
    this.discount = 1
    document.addEventListener(CartEvents.ADD_TO_CART, (event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail.isInCart === true) {
        // this.cardsInCart.set(customEvent.detail.item, 1)
        this.cardsInCart.set(customEvent.detail.item, this.renderAddedItem(customEvent.detail.item, this.indexCounter, 1))
        this.totalQuantity++
        this.indexCounter++
        this.totalSum += customEvent.detail.item.price * this.discount
        this.discountedSum += customEvent.detail.item.price
      } else if (customEvent.detail.isInCart === false) {
        this.cardsInCart.delete(customEvent.detail.item)
        this.totalQuantity--
        this.indexCounter--
        this.totalSum -= customEvent.detail.item.price * this.discount
        this.discountedSum -= customEvent.detail.item.price
      }
    })
    document.addEventListener(CartEvents.OPEN_CART, () => {
      this.renderCart()
      this.handleChangeQuantity()
      this.changeDiscountedSum()
    })
  }

  renderAddedItem (item: ProductCardType, index: number, quantity: number): Element {
    const productItem = new ProductInCart(item, index, quantity)
    return productItem.renderProductInCart()
  }

  renderCart (): void {
    const itemsInCart = Array.from(this.cardsInCart.keys())
    const main = document.querySelector('main')
    if (itemsInCart.length > 0) {
      const cart = new CartView().renderCart()
      if (main != null) {
        main.innerHTML = ''
        main?.append(cart)
        this.currentSumHTML = document.querySelector('.' + CartClasses.CLASS_SUMMARY_SUM)
        this.totalQuantityHTML = document.querySelector('.' + CartClasses.CLASS_SUMMARY_QUANTITY)
        this.setInitialSummary()
        this.cardsBlock = document.querySelector('.' + CartClasses.CLASS_CART_PRODUCTS_BLOCK)
        itemsInCart.forEach((item, i) => {
          const itemToAppend = this.cardsInCart.get(item)
          if (itemToAppend !== null && itemToAppend instanceof HTMLDivElement) {
            this.cardsBlock?.append(itemToAppend)
          }
        })
      }
      const indexes = document.querySelectorAll('.' + EProductInCart.CLASS_ITEM_NUMBER)
      indexes.forEach((index, i) => {
        if (index !== null && index instanceof HTMLDivElement) {
          index.innerHTML = `${i + 1}`
        }
      })
    } else {
      this.totalSum = 0
      if (main != null) {
        const cart = new CartView().renderEmptyCart()
        main.innerHTML = ''
        main.append(cart)
      }
    }
  }

  setInitialSummary (): void {
    if (this.currentSumHTML != null && this.totalQuantityHTML !== null) {
      this.currentSumHTML.innerHTML = `Сумма: ${this.totalSum}$`
      this.totalQuantityHTML.innerHTML = `Товаров в корзине: ${this.totalQuantity}`
    }
  }

  handleChangeQuantity (): void {
    this.setInitialSummary()
    document.addEventListener(CartEvents.CHANGE_QUANTITY, (event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail.change === 'increase') {
        this.discountedSum = this.discountedSum + customEvent.detail.changedSum
        this.totalSum = Number(((this.totalSum + customEvent.detail.changedSum * this.discount)).toFixed(1))
        this.totalQuantity = customEvent.detail.itemsInCartCounter
        this.setInitialSummary()
        this.changeDiscountedSum()
        if (this.prevSumHTML !== null) {
          this.prevSumHTML.innerHTML = `Сумма: ${this.discountedSum}$`
        }
      } else {
        this.discountedSum = this.discountedSum - customEvent.detail.changedSum
        this.totalSum = Number(((this.totalSum - customEvent.detail.changedSum * this.discount)).toFixed(2))
        this.totalQuantity = customEvent.detail.itemsInCartCounter
        if (customEvent.detail.itemsInCartCounter < 1) {
          this.removeItemFromCart(customEvent.detail.item)
        }
        this.setInitialSummary()
        this.changeDiscountedSum()
        if (this.prevSumHTML !== null) {
          this.prevSumHTML.innerHTML = `Сумма: ${this.discountedSum}$`
        }
      }
      document.dispatchEvent(new CustomEvent(CartEvents.DELIVER_SUM, {
        detail: {
          totalSum: this.totalSum
        }
      }))
    })
  }

  removeItemFromCart (key: ProductCardType): void {
    const node = this.cardsInCart.get(key)
    node?.remove()
    this.cardsInCart.delete(key)
    this.totalQuantity = 0
    this.discount = 1
    this.renderCart()
  }

  changeDiscountedSum (): void {
    this.prevSumHTML = document.querySelector('.' + CartClasses.CLASS_SUMMARY_DISCOUNTED_SUM)

    document.addEventListener(CartEvents.APPLY_PROMO, (event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail.isPromoApplied === true &&
        this.prevSumHTML !== null &&
        this.prevSumHTML instanceof HTMLDivElement) {
        this.discount = 1 - customEvent.detail.discount / 100
        this.discountedSum = this.totalSum
        this.totalSum = this.totalSum * this.discount
        this.prevSumHTML.innerHTML = `Сумма: ${this.discountedSum}$`
        if (this.currentSumHTML != null) {
          this.currentSumHTML.innerHTML = `Сумма: ${this.totalSum}`
          document.dispatchEvent(new CustomEvent(CartEvents.DELIVER_SUM, {
            detail: {
              totalSum: this.totalSum
            }
          }))
        }
      }
    })
  }
}
