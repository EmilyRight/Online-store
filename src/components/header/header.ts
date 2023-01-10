/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable no-useless-call */
import { CartEvents } from '../../utils/enums/cartEvents'
import Render from '../abstracts/render'
import Cart from '../cart/cart'
import './header'
export default class Header extends Render {
  private readonly CLASS_HEADER = 'header'
  private readonly cart
  private readonly CLASS_HEADER_NAV: string = 'header__nav'
  private readonly CLASS_CLOSED = 'closed'
  private readonly CLASS_BURGER_ICON = 'burger__icon'
  private readonly CLASS_HEADER_CLOSE_NAV = 'header__close-nav'
  private readonly CLASS_SEARCH_BTN = 'search-button'
  private readonly CLASS_SEARCH_INPUT = 'search__input'
  private readonly CLASS_SEARCH_INPUT_VISIBLE = 'search__input_visible'
  private readonly CLASS_CART_COUNTER = 'cart__products'
  private cartSum = 0
  private cartSumHTML: Element | null
  private CART_COUNTER = 0
  constructor () {
    super()

    document.addEventListener(CartEvents.ADD_TO_CART, (event) => this.showItemsInCart.call(this, <CustomEvent>event))
    this.cart = new Cart()
    document.addEventListener(CartEvents.CHANGE_QUANTITY, (event) => this.listenQuantityChange.call(this, <CustomEvent>event))
    document.addEventListener(CartEvents.DELIVER_SUM, (event) => this.listenSumChange.call(this, <CustomEvent>event))
  }

  renderHeaderContent (): void {
    super.renderContent(this.CLASS_HEADER, this.CLASS_HEADER)
    this.showSum()
  }

  renderNavigation (): void {
    super.renderContent(this.CLASS_HEADER_NAV, this.CLASS_HEADER_NAV)
  }

  handleNavOpen (): void {
    super.handleElementVisibility(this.CLASS_HEADER_NAV, this.CLASS_CLOSED)
  }

  handleSearchInput (): void {
    super.handleElementVisibility(this.CLASS_SEARCH_INPUT, this.CLASS_SEARCH_INPUT_VISIBLE)
  }

  showNav (): void {
    const burgerIcon = document.querySelector('.' + this.CLASS_BURGER_ICON)
    burgerIcon?.addEventListener('click', () => this.handleNavOpen.call(this))
  }

  closeNav (): void {
    const closeNavIcon = document.querySelector('.' + this.CLASS_HEADER_CLOSE_NAV)
    closeNavIcon?.addEventListener('click', () => this.handleNavOpen.call(this))
  }

  showSearch (): void {
    const searchBtn = document.querySelector('.' + this.CLASS_SEARCH_BTN)
    searchBtn?.addEventListener('click', () => this.handleSearchInput.call(this))
  }

  handleNav (): void {
    this.showNav()
    this.closeNav()
    this.showSearch()
  }

  showItemsInCart (event: CustomEvent): void {
    const itemsCounterList = document.querySelectorAll('.cart__products')

    if (event.detail.isInCart === true) {
      this.CART_COUNTER++
      this.cartSum = this.cartSum + event.detail.item.price
      console.log('====================================')
      console.log(this.cartSum, this.cartSumHTML)
      console.log('====================================')
    } else {
      this.CART_COUNTER--
      this.cartSum = this.cartSum - event.detail.item.price
    }

    itemsCounterList.forEach((item) => {
      if ((item != null) && item instanceof HTMLSpanElement) {
        item.textContent = this.CART_COUNTER.toString()
      }
    })
    this.showSum()
  }

  showCart (): void {
    const itemsCounterList = document.querySelectorAll('.header__cart')
    itemsCounterList.forEach((item) => {
      item.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent(CartEvents.OPEN_CART))
      })
    })
  }

  listenQuantityChange (event: CustomEvent): void {
    const itemsCounterList = document.querySelectorAll('.cart__products')

    const customEvent = event
    console.log(customEvent.detail.changedSum)
    if (customEvent.detail.change === 'increase' && typeof customEvent.detail.changedSum === 'number') {
      this.CART_COUNTER++
      this.cartSum = this.cartSum + event.detail.changedSum
    } else {
      this.CART_COUNTER--
      this.cartSum = this.cartSum - event.detail.changedSum
    }
    itemsCounterList.forEach((item) => {
      if ((item != null) && item instanceof HTMLSpanElement) {
        item.textContent = this.CART_COUNTER.toString()
      }
    })
    this.showSum()
  }

  listenSumChange (event: CustomEvent): void {
    const customEvent = event
    this.cartSum = customEvent.detail.totalSum
    this.showSum()
  }

  showSum (): void {
    this.cartSumHTML = document.querySelector('.header__sum')
    if ((this.cartSumHTML != null) && this.cartSumHTML instanceof HTMLDivElement) {
      this.cartSumHTML.innerHTML = `Сумма: ${this.cartSum} $`
    }
  }

  renderHeader (): void {
    this.renderHeaderContent()
    this.renderNavigation()
    this.handleNav()
    this.showCart()
  }
}
