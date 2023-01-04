import { EProductInCart } from '../../utils/enums/productInCart'
import ProductCardType from '../../utils/types/productCard.type'
import Render from '../abstracts/render'

export class ProductInCart extends Render {
  private readonly productInCartObj
  // private readonly index
  constructor (productInCartObj: ProductCardType/*, index: number */) {
    super()
    this.productInCartObj = productInCartObj
    // this.index = index
  }

  renderProductInCart (): Element {
    const product = super.createBlock('div', EProductInCart.CLASS_PRODUCTS_ITEM)
    product.classList.add(EProductInCart.CLASS_ITEM)
    const itemNumber = super.createBlock('div', EProductInCart.CLASS_ITEM_NUMBER)
    // itemNumber.innerHTML = `${this.index}`
    const itemContent = super.createBlock('div', EProductInCart.CLASS_ITEM_NUMBER)
    const itemImg = super.createBlock('div', EProductInCart.CLASS_ITEM_IMG)
    if (itemImg instanceof HTMLDivElement) {
      itemImg.style.backgroundImage = this.productInCartObj.thumbnail
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
    const itemQuantity = super.createBlock('button', EProductInCart.CLASS_ITEM_BTN_RIGHT)
    const itemBtnLeft = super.createBlock('button', EProductInCart.CLASS_ITEM_BTN_LEFT)
    itemBtnLeft.innerHTML = '+'
    const itemBtnRight = super.createBlock('button', EProductInCart.CLASS_ITEM_BTN_RIGHT)
    itemBtnRight.innerHTML = '-'
    const itemQuantityNumber = super.createBlock('button', EProductInCart.CLASS_ITEM_QUANTITY_NUMBER)
    itemQuantity.append(itemBtnLeft, itemQuantityNumber, itemBtnRight)
    itemSummary.append(itemQuantity)
    itemContent.append(itemImg, itemInfo, itemSummary)
    product.append(itemNumber, itemContent)
    return product
  }
}
