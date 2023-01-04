import { CartClasses } from '../../utils/enums/cartClasses'
import Render from '../abstracts/render'

export default class CartView extends Render {
  private readonly classes: CartClasses
  // private readonly itemsInCart
  // constructor (array: ProductCardType[]) {
  //   super()
  //   this.itemsInCart = array
  // }

  renderCart (): Element {
    const cart = super.createBlock('div', CartClasses.CLASS_CART)

    const wrapper = super.createBlock('div', CartClasses.CLASS_WRAPPER)
    const cartHeader = super.createBlock('div', CartClasses.CLASS_CART_HEADER)
    const cartTitle = super.createBlock('div', CartClasses.CLASS_CART_TITLE)
    cartTitle.innerHTML = 'Корзина'
    // const cartcartTitleQuantity = super.createBlock('div', CartClasses.CLASS_CART_QUANTITY)
    const cartPagination = super.createBlock('div', CartClasses.CLASS_CART_PAGINATION)
    cartPagination.classList.add(CartClasses.CLASS_PAGINATION)
    const paginationOptions = super.createBlock('div', CartClasses.CLASS_PAGINATION_OPTIONS)
    const paginationPages = super.createBlock('div', CartClasses.CLASS_PAGINATION_PAGES)
    const paginationLabel = super.createBlock('label', CartClasses.CLASS_PAGINATION_LABEL)
    paginationLabel.innerHTML = 'Показывать по:'
    paginationLabel.setAttribute('for', 'products-in-cart')
    const paginationInput = super.createBlock('input', CartClasses.CLASS_PAGINATION_INPUT)
    if (paginationInput instanceof HTMLInputElement) {
      paginationInput.id = 'products-in-cart'
      paginationInput.type = 'number'
      paginationInput.name = 'products-in-cart'
      paginationInput.setAttribute('min', '0')
      paginationInput.setAttribute('max', '100')
    }
    paginationPages.classList.add(CartClasses.CLASS_PAGES)

    const pagesChoice = super.createBlock('div', CartClasses.CLASS_PAGES_CHOICE)
    const pagesBtnLeft = super.createBlock('button', CartClasses.CLASS_PAGES_BTN)
    pagesBtnLeft.innerHTML = '<'
    pagesBtnLeft.classList.add(CartClasses.CLASS_PAGES_BTN_LEFT, CartClasses.CLASS_BTN_LEFT)

    const pagesNumber = super.createBlock('div', 'pages__number')
    const pagesBtnRight = super.createBlock('button', CartClasses.CLASS_PAGES_BTN_RIGHT)
    pagesBtnRight.classList.add(CartClasses.CLASS_PAGES_BTN_RIGHT, CartClasses.CLASS_BTN_RIGHT)
    pagesBtnRight.innerHTML = '>'

    pagesChoice.append(pagesBtnLeft, pagesNumber, pagesBtnRight)
    paginationOptions.append(paginationLabel, paginationInput)
    paginationPages.append(pagesChoice)
    cartPagination.append(paginationOptions, paginationPages)
    cartHeader.append(cartTitle, cartPagination)

    const cartContent = super.createBlock('div', CartClasses.CLASS_CART_CONTENT)
    const cartProductsList = super.createBlock('div', CartClasses.CLASS_CART_PRODUCTS_BLOCK)
    // for (let i = 0; i < this.itemsInCart.length; i++) {
    //   const item = new ProductInCart(this.itemsInCart[i])
    //   cartProductsList.append(item.renderProductInCart())
    // }
    cartProductsList.classList.add(CartClasses.CLASS_PRODUCTS) //!

    const cartSummary = super.createBlock('div', CartClasses.CLASS_CART_SUMMARY)
    cartSummary.classList.add('summary')
    const summaryHeader = super.createBlock('div', CartClasses.CLASS_SUMMARY_HEADER)
    summaryHeader.innerHTML = 'Итого:'
    const summaryQuantity = super.createBlock('div', CartClasses.CLASS_SUMMARY_QUANTITY)
    const summaryDiscounted = super.createBlock('div', CartClasses.CLASS_SUMMARY_DISCOUNTED_SUM)
    const summarySum = super.createBlock('div', CartClasses.CLASS_SUMMARY_SUM)
    const summaryPromoBlock = super.createBlock('div', CartClasses.CLASS_SUMMARY_PROMO_BLOCK)
    const summaryInput = super.createBlock('input', CartClasses.CLASS_SUMMARY_INPUT)
    if (summaryInput instanceof HTMLInputElement) {
      summaryInput.type = 'text'
      summaryInput.setAttribute('placeholder', 'Введите промокод')
    }
    const promoText = super.createBlock('div', CartClasses.CLASS_PROMO_TEXT)
    promoText.innerHTML = 'Например, "NEWYEAR2023'
    const promoAdd = super.createBlock('div', CartClasses.CLASS_PROMO_ADD)
    const promoTextAdd = super.createBlock('div', CartClasses.CLASS_PROMO_TEXT_ADD)
    promoTextAdd.innerHTML = 'Скидка по промокоду: 10%'
    const promoBtn = super.createBlock('button', CartClasses.CLASS_PROMO_BTN)
    promoBtn.innerHTML = 'Применить'
    const summaryBtn = super.createBlock('button', CartClasses.CLASS_SUMMARY_BTN_BUY)
    if (summaryBtn instanceof HTMLButtonElement) {
      summaryBtn.type = 'button'
      summaryBtn.innerHTML = 'Оформить заказ'
    }
    summaryBtn.classList.add(CartClasses.CLASS_PROMO_BTN)
    promoAdd.append(promoTextAdd, promoBtn)
    summaryPromoBlock.append(summaryInput, promoText, promoAdd)
    cartSummary.append(summaryHeader, summaryQuantity, summaryDiscounted, summarySum, summaryPromoBlock, summaryBtn)
    cartContent.append(cartProductsList, cartSummary)
    wrapper.append(cartHeader, cartContent)

    cart.append(wrapper)
    return cart
  }
}
