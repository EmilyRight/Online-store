import { CartEvents } from '../../utils/enums/cartEvents'
import { EProductInCart } from '../../utils/enums/productInCart'
import ProductCardType from '../../utils/types/productCard.type'
import Render from '../abstracts/render'

export class ProductInCart extends Render {
  private readonly productInCartObj
  private readonly index
  private itemQuantityNumber: Element
  private increaseBtn: Element
  private decreaseBtn: Element
  private itemSum: Element
  private itemsInCartCounter: number
  constructor (productInCartObj: ProductCardType, index: number, itemsInCartCounter: number) {
    super()
    this.itemsInCartCounter = itemsInCartCounter
    this.productInCartObj = productInCartObj
    this.index = index
  }

  renderProductInCart (): Element {
    const product = super.createBlock('div', EProductInCart.CLASS_PRODUCTS_ITEM)
    product.classList.add(EProductInCart.CLASS_ITEM)
    const itemNumber = super.createBlock('div', EProductInCart.CLASS_ITEM_NUMBER)
    itemNumber.innerHTML = `${this.index + 1}`
    const itemContent = super.createBlock('div', EProductInCart.CLASS_ITEM_CONTENT)
    const itemImg = super.createBlock('div', EProductInCart.CLASS_ITEM_IMG)
    if (itemImg instanceof HTMLDivElement) {
      itemImg.style.backgroundImage = `url(${this.productInCartObj.thumbnail})`
    }
    const itemInfo = super.createBlock('div', EProductInCart.CLASS_ITEM_INFO)
    const itemTitle = super.createBlock('div', EProductInCart.CLASS_ITEM_TITLE)
    const itemDescription = super.createBlock('div', EProductInCart.CLASS_ITEM_DESCRIPTION)
    const itemMeta = super.createBlock('div', EProductInCart.CLASS_ITEM_META)

    const itemRating = super.createBlock('div', EProductInCart.CLASS_ITEM_RATING)
    itemRating.innerHTML = `Рейтинг: ${this.productInCartObj.rating}`
    const itemDiscount = super.createBlock('div', EProductInCart.CLASS_ITEM_DISCOUNT)
    itemDiscount.innerHTML = `Скидка: ${this.productInCartObj.discountPercentage}%`
    const itemStock = super.createBlock('div', EProductInCart.CLASS_ITEM_STOCK)
    itemStock.innerHTML = `На складе: ${this.productInCartObj.discountPercentage}%`
    const itemCategory = super.createBlock('div', EProductInCart.CLASS_ITEM_CATEGORY)
    itemCategory.innerHTML = `${this.productInCartObj.category}`

    itemMeta.append(itemRating, itemDiscount, itemStock, itemCategory)
    itemTitle.innerHTML = this.productInCartObj.title
    itemDescription.innerHTML = this.productInCartObj.description
    itemInfo.append(itemTitle, itemDescription, itemMeta)

    const itemSummary = super.createBlock('div', EProductInCart.CLASS_ITEM_SUMMARY)
    const itemQuantity = super.createBlock('div', EProductInCart.CLASS_ITEM_QUANTITY)
    this.decreaseBtn = super.createBlock('button', EProductInCart.CLASS_ITEM_BTN_LEFT)
    this.decreaseBtn.innerHTML = '-'
    this.decreaseBtn.addEventListener('click', () => this.decreaseItemQuantity())

    this.increaseBtn = super.createBlock('button', EProductInCart.CLASS_ITEM_BTN_RIGHT)
    this.increaseBtn.innerHTML = '+'
    this.increaseBtn.addEventListener('click', () => this.increaseItemQuantity())

    this.itemQuantityNumber = super.createBlock('div', EProductInCart.CLASS_ITEM_QUANTITY_NUMBER)
    this.itemQuantityNumber.innerHTML = `${this.itemsInCartCounter}`
    this.itemSum = super.createBlock('div', EProductInCart.CLASS_ITEM_SUM)
    this.itemSum.innerHTML = `${this.itemsInCartCounter * this.productInCartObj.price}`
    itemQuantity.append(this.decreaseBtn, this.itemQuantityNumber, this.increaseBtn)
    itemSummary.append(itemQuantity, this.itemSum)
    itemContent.append(itemImg, itemInfo, itemSummary)
    product.append(itemNumber, itemContent)
    return product
  }

  private increaseItemQuantity (): void {
    this.itemsInCartCounter++
    this.itemQuantityNumber.innerHTML = `${this.itemsInCartCounter}`
    this.itemSum.innerHTML = `${this.itemsInCartCounter * this.productInCartObj.price}`
    document.dispatchEvent(new CustomEvent(CartEvents.CHANGE_QUANTITY, {
      detail: {
        item: this.productInCartObj,
        itemsInCartCounter: this.itemsInCartCounter,
        changedSum: this.productInCartObj.price,
        change: 'increase'
      }
    }))
  }

  private decreaseItemQuantity (): void {
    this.itemsInCartCounter--
    this.itemQuantityNumber.innerHTML = `${this.itemsInCartCounter}`
    this.itemSum.innerHTML = `${this.itemsInCartCounter * this.productInCartObj.price}`
    document.dispatchEvent(new CustomEvent(CartEvents.CHANGE_QUANTITY, {
      detail: {
        item: this.productInCartObj,
        itemsInCartCounter: this.itemsInCartCounter,
        changedSum: this.productInCartObj.price,
        change: 'decrease'
      }
    }))
  }
}
