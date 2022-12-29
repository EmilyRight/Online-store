
import ProductsDataBase from '../../utils/types/productsDataBase.type'
import Render from '../abstracts/render'
import ProductCard from '../productCard/productCard'
import './catalog'
export default class Catalog extends Render {
  productsObj: ProductsDataBase
  private readonly CLASS_WRAPPER = 'wrapper'
  private readonly CLASS_CARDS = 'catalog__cards'
  private readonly CLASS_CATALOG_CONTENT = 'catalog__content'
  private readonly CLASS_CATALOG_TITLE = 'catalog__title'
  private readonly CLASS_CATALOG_OPTIONS = 'catalog__options'
  private readonly CLASS_CATALOG_FOUND_PRODUCTS = 'catalog__found-products'
  private readonly CLASS_FOUND = 'found'
  private readonly CLASS_BUTTONS_BLOCK = 'catalog__buttons-block'
  private readonly CLASS_CATALOG_BTN = 'catalog__btn'
  private readonly CLASS_ROW_ITEM = 'row-item'
  private readonly CLASS_BLOCK_ITEM = 'block-item'
  private readonly CLASS_PRODUCT_CARD = 'product-card'
  private readonly _wrapper = document.querySelector('.' + this.CLASS_WRAPPER)
  private buttons: Element[]
  private cardsCounter = 0
  constructor (productsObj: ProductsDataBase) {
    super()
    this.productsObj = productsObj
  }

  getItemsCount (): number {
    const productsArray = this.productsObj.products
    this.cardsCounter = productsArray.length
    return this.cardsCounter
  }

  renderCatalogHeader (): void {
    const content = super.createBlock('div', this.CLASS_CATALOG_CONTENT)
    const contentTitle = super.createBlock('h3', this.CLASS_CATALOG_TITLE)
    const contentOptions = super.createBlock('div', this.CLASS_CATALOG_OPTIONS)
    const foundProducts = super.createBlock('span', this.CLASS_CATALOG_FOUND_PRODUCTS)
    const found = super.createBlock('span', this.CLASS_FOUND)
    found.innerHTML = `Найдено товаров: ${this.cardsCounter}`
    foundProducts.append(found)

    const buttonsBlock = super.createBlock('div', this.CLASS_BUTTONS_BLOCK)
    const catalogBtnRow = super.createBlock('div', 'catalog__btn_row')
    catalogBtnRow.classList.add(this.CLASS_CATALOG_BTN)
    // генерируется событие изменения раскладки карточки
    if (catalogBtnRow instanceof HTMLDivElement) {
      catalogBtnRow.addEventListener('click', () => {
        this.handleShowMode(catalogBtnRow)
        document.dispatchEvent(new CustomEvent('isRow', {
          detail: {
            isRow: true
          }
        }))
      })
    }

    for (let i = 0; i < 4; i++) {
      catalogBtnRow.append(super.createBlock('div', this.CLASS_ROW_ITEM))
    }
    const catalogBtnBlock = super.createBlock('div', 'catalog__btn_block')
    catalogBtnBlock.classList.add(this.CLASS_CATALOG_BTN)
    // генерируется событие изменения раскладки карточки
    if (catalogBtnBlock instanceof HTMLDivElement) {
      catalogBtnBlock.addEventListener('click', () => {
        this.handleShowMode(catalogBtnBlock)
        document.dispatchEvent(new CustomEvent('isRow', {
          detail: {
            isRow: false
          }
        }))
      })
    }

    for (let i = 0; i < 16; i++) {
      catalogBtnBlock.append(super.createBlock('div', this.CLASS_BLOCK_ITEM))
    }
    buttonsBlock.append(catalogBtnRow, catalogBtnBlock)
    contentOptions.append(foundProducts, buttonsBlock)
    const contentCards = super.createBlock('div', this.CLASS_CARDS)
    content.append(contentTitle, contentOptions, contentCards)
    this._wrapper?.append(content)
  }

  renderCardsArray (): void {
    const productsArray = this.productsObj.products
    for (let i = 0; i < this.cardsCounter; i++) {
      const card = new ProductCard(productsArray[i])
      const wrapper = document.querySelector('.' + this.CLASS_CARDS)
      if (wrapper !== null) {
        wrapper.append(card.renderCard())
      }
    }
  }

  handleShowMode (btn: Element): void {
    if (btn instanceof HTMLDivElement) {
      if (btn.classList.contains('active')) {
        btn.classList.remove('active')
      } else {
        btn.classList.add('active')
      }
    }
  }

  init (): void {
    this.getItemsCount()
    this.renderCatalogHeader()
    this.renderCardsArray()
    const buttons = Array.from(document.querySelectorAll('.' + this.CLASS_CATALOG_BTN))
    this.buttons = buttons
    // this.buttons.addEventListener('click', () => this.handleShowMode(btn))
    // this.buttons.forEach((btn) => {
    //   console.log('====================================')
    //   console.log('2', this.buttons)
    //   console.log('====================================')
    //   if (btn instanceof HTMLDivElement) {
    //     btn.addEventListener('click', () => this.handleShowMode(btn))
    //   }
    // })
  }
}
