import Header from '../header/header'
import Footer from '../footer/footer'
import productsData from '../../products'
import Catalog from '../catalog/catalog'
import Cart from '../cart/cart'
import FilterSearch from '../filter/search/filter-search'
import FilterAccumulator from '../filter/filter'
// import { AppTag } from '../../utils/enums/app-tag'
// import { FilterCssClass } from '../../utils/enums/filter-css-class'

export default class App {
  private readonly header
  private readonly footer
  private readonly catalog
  // private readonly cart
  private readonly filterSearch
  private readonly filter
  constructor () {
    this.header = new Header()
    this.footer = new Footer()
    this.catalog = new Catalog(productsData)
    // this.cart = new Cart()
    this.filterSearch = new FilterSearch()
    this.filter = new FilterAccumulator()
  }

  start (): void {
    this.header.renderHeader()
    this.footer.renderFooter()
    this.catalog.init()
    // this.catalog.renderCardsArray()
    this.filterSearch.getElement()
    this.filter.renderFilters()
  }
}
