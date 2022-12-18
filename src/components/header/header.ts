import './header'
export default class Header {
  renderHeaderContent (): void {
    const fragment = document.createDocumentFragment()
    const header: HTMLDivElement | null = document.querySelector('#header')
    if (header instanceof HTMLTemplateElement) {
      const headerClone = header.content.cloneNode(true)
      fragment.append(headerClone)
    }

    const headerComponent: HTMLDivElement | null = document.querySelector('.header')
    headerComponent?.append(fragment)
  }

  renderNavigation (): void {
    const fragment = document.createDocumentFragment()
    const nav: HTMLDivElement | null = document.querySelector('#header__nav')
    if (nav instanceof HTMLTemplateElement) {
      const navClone = nav.content.cloneNode(true)
      fragment.append(navClone)
    }

    const headerNavigationComponent: HTMLElement | null = document.querySelector('.header__nav')
    headerNavigationComponent?.append(fragment)
  }

  handleNavOpen (): void {
    const navList: HTMLDivElement | null = document.querySelector('.header__nav')
    if (navList != null) {
      if (navList.classList.contains('closed')) {
        navList.classList.remove('closed')
      } else {
        navList.classList.add('closed')
      }
    }
  }

  showNav (): void {
    const burgerIcon = document.querySelector('.burger__icon')
    burgerIcon?.addEventListener('click', this.handleNavOpen)
  }

  closeNav (): void {
    const closeNavIcon = document.querySelector('.header__close-nav')
    closeNavIcon?.addEventListener('click', this.handleNavOpen)
  }

  handleNav (): void {
    this.showNav()
    this.closeNav()
  }

  renderHeader (): void {
    this.renderHeaderContent()
    this.renderNavigation()
    this.handleNav()
  }
}
