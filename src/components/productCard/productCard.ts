import { CartEvents } from '../../utils/enums/cartEvents'
import ProductCardType from '../../utils/types/productCard.type'
import Render from '../abstracts/render'
// import { AppEvents } from '../../utils/enums/app-events'
import './productCard'

export default class ProductCard extends Render {
  private readonly dataObj
  private readonly CLASS_PRODUCT_CARD = 'product-card'
  private readonly CLASS_SLIDER_OUTER = 'product-card__slider'
  private readonly CLASS_SLIDER = 'slider__inner'
  private readonly CLASS_SLIDER_ITEM = 'slider__item'
  private readonly CLASS_CARD_IMAGE_BLOCK = 'card__image-block'
  private readonly CLASS_SLIDER_DOTS = 'slider__dots'
  private readonly CLASS_SLIDER_DOT = 'slider__dot'
  private readonly CLASS_PRICES = 'product-card__price-block'
  private readonly CLASS_PRICEFLEX = 'product-card__price'
  private readonly CLASS_DISCOUNT = 'product-card__price_discounted'
  private readonly CLASS_FULLPRICE = 'product-card__price_full'
  private readonly CLASS_RATING_BLOCK = 'product-card__rating-block'
  private readonly CLASS_RATING = 'product-card__rating'
  private readonly CLASS_RATING_AREA = 'product-card__rating-area'
  private readonly CLASS_RATING_INPUT = 'rating__input'
  private readonly CLASS_RATING_LABEL = 'rating__label'
  private readonly CLASS_TITLE = 'product__title'
  private readonly CLASS_STOCK_BLOCK = 'product__purchase-block'
  private readonly SUBCLASS_STOCK_BLOCK = 'purchase-block'
  private readonly CLASS_STOCK_VALUE = 'purchase-block__stock-value'
  private readonly CLASS_STOCK_TEXT = 'purchase-block__stock'
  private readonly CLASS_CART_BTN = 'purchase-block__add-to-cart-btn'
  private readonly SUBCLASS_CART_BTN = 'cart-btn'
  private readonly CLASS_CART_BTN_TEXT = 'cart-btn__text'
  private readonly CLASS_CART_BTN_TEXT_SMALL = 'cart-btn__text_small'
  private readonly CLASS_STOCK_MORE = 'purchase-block__more'
  private readonly CLASS_INFO_BLOCK = 'card__info-block'
  private readonly CLASS_ACTIVE = 'active'
  private _isInCart = false
  private _cart_counter = 0
  private readonly isColumn = true
  private sliderSize: Element
  private slider: Element
  private readonly dots: Element[]
  // private _isShow = true
  constructor (dataObj: ProductCardType) {
    super()
    this.dataObj = dataObj
    this.dots = []
    this.renderCard()
    // document.addEventListener(AppEvents.EVENT_FILTER, (event) => this.changeFilters.call(this, <CustomEvent>event))
  }

  renderCard (): Element {
    const card = super.createBlock('div', this.CLASS_PRODUCT_CARD)
    const sliderOuter = super.createBlock('div', this.CLASS_SLIDER_OUTER)
    this.sliderSize = sliderOuter
    const sliderInner = super.createBlock('div', this.CLASS_SLIDER)
    this.slider = sliderInner
    sliderOuter.append(sliderInner)

    const sliderDotBlock = super.createBlock('div', this.CLASS_SLIDER_DOTS)

    for (let i = 0; i < this.dataObj?.images?.length; i += 1) {
      const sliderItem = super.createBlock('div', this.CLASS_SLIDER_ITEM)
      if (sliderItem instanceof HTMLDivElement) {
        // sliderItem.style.backgroundImage = `url(${this.dataObj?.images[i]})`
      }
      sliderInner.append(sliderItem)
      if (this.dataObj?.images?.length > 1) {
        const sliderDot = super.createBlock('div', this.CLASS_SLIDER_DOT)
        sliderDot.classList.add(this.CLASS_SLIDER_DOT)
        sliderDot.addEventListener('click', (event) => {
          this.setImages(i)
          this.setActiveDot(event.target)
        })
        if (i === 0) {
          sliderDot.classList.add(this.CLASS_ACTIVE)
        }
        this.dots.push(sliderDot)
        sliderDotBlock.append(sliderDot)
      }
    }
    const cardImageBlock = super.createBlock('div', this.CLASS_CARD_IMAGE_BLOCK)
    cardImageBlock.append(sliderOuter, sliderDotBlock)
    const priceBlock = super.createBlock('div', this.CLASS_PRICES)
    const pricesFlex = super.createBlock('div', this.CLASS_PRICEFLEX)
    priceBlock.append(pricesFlex)

    const fullPrice = super.createBlock('span', this.CLASS_FULLPRICE)
    fullPrice.innerHTML = `${this.dataObj.price}$`
    const discount = super.createBlock('span', this.CLASS_DISCOUNT)
    discount.innerHTML = `-${this.dataObj.discountPercentage}%`
    pricesFlex.append(fullPrice, discount)

    const ratingBlock = super.createBlock('div', this.CLASS_RATING_BLOCK)
    const rating = super.createBlock('span', this.CLASS_RATING)
    rating.innerHTML = this.dataObj.rating.toString()

    const ratingArea = super.createBlock('div', this.CLASS_RATING_AREA)
    for (let i = 5; i > 0; i--) {
      const ratingInput = super.createBlock('input', this.CLASS_RATING_INPUT)
      ratingInput.id = i.toString()
      const checkedStar = Math.floor(this.dataObj.rating)
      if (ratingInput instanceof HTMLInputElement) {
        ratingInput.type = 'radio'
        ratingInput.value = `${i}`
        if (i === checkedStar) {
          ratingInput.checked = true
        }
      }
      const ratinglabel = super.createBlock('label', this.CLASS_RATING_LABEL)
      if (ratinglabel instanceof HTMLLabelElement) {
        ratinglabel.htmlFor = `${i}`
        // TODO - подумать, как красить дробные звезды
      }
      ratingArea.append(ratingInput, ratinglabel)
    }
    ratingBlock.append(rating, ratingArea)

    const cardTitle = super.createBlock('h3', this.CLASS_TITLE)
    cardTitle.innerHTML = this.dataObj.title

    const purchaseBlock = super.createBlock('div', this.CLASS_STOCK_BLOCK)
    purchaseBlock.classList.add(this.SUBCLASS_STOCK_BLOCK)

    const stockBlock = super.createBlock('p', this.CLASS_STOCK_TEXT)
    stockBlock.innerHTML = `На складе ${this.dataObj.stock} шт.`
    const addToCartBtn = super.createBlock('button', this.CLASS_CART_BTN)
    addToCartBtn.classList.add(this.SUBCLASS_CART_BTN)

    if (addToCartBtn instanceof HTMLButtonElement) {
      addToCartBtn.type = 'button'
      const btnText = super.createBlock('span', this.CLASS_CART_BTN_TEXT)
      btnText.innerHTML = 'В корзину'
      const btnTextSmall = super.createBlock('span', this.CLASS_CART_BTN_TEXT_SMALL)
      btnTextSmall.innerHTML = `${this._cart_counter} шт. в корзине`
      addToCartBtn.append(btnText, btnTextSmall)
      if ((btnTextSmall != null) && btnTextSmall instanceof HTMLSpanElement &&
      btnText != null && btnText instanceof HTMLSpanElement) {
        addToCartBtn.addEventListener('click', this.clickButtonHandler.bind(this, btnTextSmall, btnText))
      }
    }
    purchaseBlock.append(stockBlock, addToCartBtn)

    const stockMore = super.createBlock('p', this.CLASS_STOCK_MORE)
    stockMore.innerHTML = 'Подробнее ->'

    const infoBlock = super.createBlock('div', this.CLASS_INFO_BLOCK)
    infoBlock.append(cardTitle, priceBlock, ratingBlock, purchaseBlock, stockMore)
    if (card instanceof HTMLDivElement) {
      card.append(cardImageBlock)
      card.append(infoBlock)
      document.addEventListener('isRow', (event) => this.changeCardsMode(event as CustomEvent, card))
    }
    return card
  }

  private changeCardsMode (event: CustomEvent, card: HTMLDivElement): void {
    if (event.detail.isRow === true) {
      card.classList.add('row')
    } else {
      card.classList.remove('row')
    }
  }

  private clickButtonHandler (itemsInCart: HTMLSpanElement, mainText: HTMLSpanElement): void {
    if (this._isInCart) {
      this._isInCart = false
      mainText.innerHTML = 'В корзину'
      this._cart_counter--
    } else {
      this._isInCart = true
      mainText.innerHTML = 'Удалить'
      this._cart_counter++
    }

    itemsInCart.innerHTML = `${this._cart_counter} шт. в корзине`
    document.dispatchEvent(new CustomEvent(CartEvents.ADD_TO_CART, {
      detail: {
        item: this.dataObj,
        isInCart: this._isInCart,
        cartCounter: this._cart_counter
      }
    }))
  }

  setImages (i: number): void {
    const slideSize = this.sliderSize?.clientWidth
    if (this.slider !== null && this.slider instanceof HTMLDivElement) {
      this.slider.style.left = `-${i * slideSize}px`
      console.log(slideSize, i, this.slider)
    }
  }

  setActiveDot (dot: EventTarget | null): void {
    this.dots.forEach((item) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active')
      }

      if (dot !== null && dot instanceof HTMLDivElement) {
        dot.classList.add('active')
      }
    })
  }

  // changeFilters (event: CustomEvent): void {
  //   const eventTitle = event.detail?.title.toString().toLowerCase()
  //   const resultTitle = this.dataObj.title.toLowerCase().includes(eventTitle)

  //   if (this._isShow) {
  //     if (!resultTitle) {
  //       card.style.display = 'none'
  //       this._isShow = false
  //     }
  //   } else {
  //     if (resultTitle) {
  //       card.style.display = 'flex'
  //       this._isShow = true
  //     }
  //   }
  // }
}
