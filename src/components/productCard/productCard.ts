import ProductCardType from '../../utils/types/productCard.type'
import Render from '../abstracts/render'
import './productCard'

export default class ProductCard extends Render {
  private readonly dataObj
  private readonly CLASS_PRODUCT_CARD = 'product-card'
  private readonly CLASS_SLIDER_OUTER = 'product-card__slider'
  private readonly CLASS_SLIDER = 'slider__inner'
  private readonly CLASS_SLIDER_ITEM = 'slider__item'
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
  private readonly CLASS_ACTIVE = 'active'

  constructor (dataObj: ProductCardType) {
    super()
    this.dataObj = dataObj
  }

  renderCard (): Element {
    const card = super.createBlock('div', this.CLASS_PRODUCT_CARD)
    const sliderOuter = super.createBlock('div', this.CLASS_SLIDER_OUTER)
    const sliderInner = super.createBlock('div', this.CLASS_SLIDER)

    sliderOuter.append(sliderInner)

    const sliderDotBlock = super.createBlock('div', this.CLASS_SLIDER_DOTS)

    for (let i = 0; i < this.dataObj.images.length; i += 1) {
      // const sliderItem = super.createBlock('div', this.CLASS_SLIDER_ITEM)
      // if (sliderItem instanceof HTMLDivElement) {
      //   sliderItem.style.backgroundImage = `url(${this.dataObj.images[i]})`
      // }
      // sliderInner.append(sliderItem)

      const sliderDot = super.createBlock('div', this.CLASS_SLIDER_DOT)
      sliderDot.classList.add(this.CLASS_SLIDER_DOT)
      if (i === 0) {
        sliderDot.classList.add(this.CLASS_ACTIVE)
      }
      sliderDotBlock.append(sliderDot)
    }

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
        // const percentsToColor = (this.dataObj.rating - Math.floor(this.dataObj.rating)) * 100
        // if (i === 5) {
        //   ratinglabel.style.backgroundImage = `linear-gradient(to right, #ffd700 0%, #ffd700 ${percentsToColor}%, #d3d3d3 ${percentsToColor}%, #d3d3d3 100%)`
        // }
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
      btnTextSmall.innerHTML = `${0} шт. в корзине`
      addToCartBtn.append(btnText, btnTextSmall)
    }
    purchaseBlock.append(stockBlock, addToCartBtn)

    const stockMore = super.createBlock('p', this.CLASS_STOCK_MORE)
    stockMore.innerHTML = 'Подробнее ->'
    if (card instanceof HTMLDivElement) {
      card.append(sliderOuter)
      card.append(sliderDotBlock)
      card.append(priceBlock)
      card.append(ratingBlock)
      card.append(cardTitle)
      card.append(purchaseBlock)
      card.append(stockMore)
      addToCartBtn.addEventListener('click', this.bla.bind(this))
    }
    return card
  }

  bla (): void {
    console.log(this.dataObj)
  }
}
