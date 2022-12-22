/* eslint-disable no-useless-call */
import Render from '../abstracts/render'
import './header'
export default class Header extends Render {
  private readonly CLASS_HEADER = 'header'
  private readonly CLASS_HEADER_NAV: string = 'header__nav'
  private readonly CLASS_CLOSED = 'closed'
  private readonly CLASS_BURGER_ICON = 'burger__icon'
  private readonly CLASS_HEADER_CLOSE_NAV = 'header__close-nav'
  private readonly CLASS_SEARCH_BTN = 'search-button'
  private readonly CLASS_SEARCH_INPUT = 'search__input'
  private readonly CLASS_SEARCH_INPUT_VISIBLE = 'search__input_visible'
  private readonly burgerIcon = document.querySelector('.' + this.CLASS_HEADER_NAV)
  private readonly searchIcon = document.querySelector('.' + this.CLASS_SEARCH_INPUT)

  renderHeaderContent (): void {
    super.renderContent(this.CLASS_HEADER, this.CLASS_HEADER)
  }

  renderNavigation (): void {
    super.renderContent(this.CLASS_HEADER_NAV, this.CLASS_HEADER_NAV)
  }

  handleNavOpen (): void {
    if (this.burgerIcon !== null) {
      super.handleElementVisibility(this.burgerIcon, this.CLASS_HEADER_NAV, this.CLASS_CLOSED)
    }
  }

  handleSearchInput (): void {
    if (this.searchIcon != null) {
      super.handleElementVisibility(this.searchIcon, this.CLASS_SEARCH_INPUT, this.CLASS_SEARCH_INPUT_VISIBLE)
    }
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

  renderHeader (): void {
    this.renderHeaderContent()
    this.renderNavigation()
    this.handleNav()
  }
}
